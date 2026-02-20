import { useState, useEffect, useRef, useCallback } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const SECTION_IDS = ["lessen", "prive", "contact"];

function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function Navigation() {
  const { lang, setLang, t } = useLanguage();
  const [scrolled, setScrolled]     = useState(false);
  const [menuOpen, setMenuOpen]     = useState(false);
  const [activeSection, setSection] = useState<string>("");
  const location = useLocation();
  const navigate = useNavigate();
  const isHome   = location.pathname === "/";

  /* Sliding underline state */
  const navRef   = useRef<HTMLElement>(null);
  const itemRefs = useRef<(HTMLElement | null)[]>([]);
  const [indicator, setIndicator] = useState({ left: 0, width: 0, opacity: 0 });

  /* Scroll → solid header */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Close drawer on route change */
  useEffect(() => { setMenuOpen(false); }, [location]);

  /* Lock body scroll when drawer is open */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  /* Track which section is in view */
  useEffect(() => {
    if (!isHome) { setSection(""); return; }
    const observers: IntersectionObserver[] = [];
    SECTION_IDS.forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setSection(id); },
        { rootMargin: "-30% 0px -60% 0px" }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach(o => o.disconnect());
  }, [isHome]);

  /* Nav items — 5 items as requested */
  const navItems = [
    { label: t.nav.home,    type: "route",   href: "/" },
    { label: t.nav.over,    type: "route",   href: "/over" },
    { label: t.nav.lessen,  type: "section", id: "lessen" },
    { label: lang === "nl" ? "Sessies" : "Sessions", type: "section", id: "prive" },
    { label: t.nav.contact, type: "section", id: "contact" },
  ] as const;

  const isActive = (item: typeof navItems[number]) => {
    if (item.type === "route") {
      return item.href === "/" ? (isHome && activeSection === "") : location.pathname.startsWith(item.href);
    }
    return isHome && activeSection === item.id;
  };

  /* Update sliding indicator position */
  const updateIndicator = useCallback(() => {
    const nav = navRef.current;
    if (!nav) return;
    const activeIdx = navItems.findIndex((item) => isActive(item));
    if (activeIdx === -1) {
      setIndicator(prev => ({ ...prev, opacity: 0 }));
      return;
    }
    const el = itemRefs.current[activeIdx];
    if (!el) return;
    const navRect = nav.getBoundingClientRect();
    const elRect  = el.getBoundingClientRect();
    setIndicator({
      left:    elRect.left - navRect.left,
      width:   elRect.width,
      opacity: 1,
    });
  }, [activeSection, location.pathname, isHome]);

  useEffect(() => {
    // Small delay lets layout settle after route changes
    const id = requestAnimationFrame(updateIndicator);
    return () => cancelAnimationFrame(id);
  }, [updateIndicator]);

  const heroMode = isHome && !scrolled && !menuOpen;

  const linkCls = (active: boolean) =>
    `font-sans text-sm transition-colors duration-200 py-1 ${
      heroMode
        ? active ? "text-white font-medium" : "text-white/80 hover:text-white"
        : active ? "text-primary font-medium" : "text-foreground/70 hover:text-foreground"
    }`;

  const mobileLinkCls = (active: boolean) =>
    `py-3 px-4 rounded-lg font-sans text-base transition-colors duration-150 min-h-[48px] flex items-center cursor-pointer ${
      active ? "bg-sage-light text-primary font-medium" : "text-foreground/80 hover:bg-muted hover:text-foreground"
    }`;

  const handleSectionClick = (e: React.MouseEvent, sectionId: string) => {
    e.preventDefault();
    setMenuOpen(false);
    if (isHome) {
      scrollToSection(sectionId);
    } else {
      navigate("/", { state: { scrollTo: sectionId } });
    }
  };

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled || menuOpen ? "glass-nav shadow-sm" : "bg-transparent"}`}>
        <div className="container-wide px-6 md:px-10">
          <div className="flex items-center justify-between h-18 py-4">

            {/* Logo */}
            <Link to="/" className="flex flex-col leading-tight shrink-0">
              <span className={`font-serif text-xl font-semibold tracking-wide transition-colors duration-300 ${heroMode ? "text-white" : "text-foreground"}`}>Spessirits</span>
              <span className={`font-sans text-xs tracking-[0.15em] uppercase transition-colors duration-300 ${heroMode ? "text-white/70" : "text-muted-foreground"}`}>Pilates</span>
            </Link>

            {/* Desktop nav with sliding underline */}
            <nav ref={navRef} className="hidden md:flex items-center gap-6 relative">
            {navItems.map((item, i) => (
                <span key={item.type === "route" ? item.href : item.id} ref={el => { itemRefs.current[i] = el; }}>
                  {item.type === "route" ? (
                    <Link to={item.href} className={linkCls(isActive(item))}>
                      {item.label}
                    </Link>
                  ) : (
                    <a
                      href={`#${item.id}`}
                      onClick={e => handleSectionClick(e, item.id)}
                      className={linkCls(isActive(item))}
                    >
                      {item.label}
                    </a>
                  )}
                </span>
              ))}

              {/* Sliding underline indicator */}
              <span
                aria-hidden
                className="pointer-events-none absolute bottom-0 h-[1.5px] rounded-full transition-all duration-300 ease-in-out"
                style={{
                  left:    indicator.left,
                  width:   indicator.width,
                  opacity: indicator.opacity,
                  backgroundColor: heroMode ? "white" : "hsl(var(--primary))",
                }}
              />
            </nav>

            {/* Right: lang toggle + CTA + hamburger */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => setLang(lang === "nl" ? "en" : "nl")}
                aria-label="Switch language"
                className={`hidden md:flex items-center gap-1 px-3 py-1.5 rounded-full border transition-colors ${heroMode ? "border-white/40 bg-white/10 hover:bg-white/20" : "border-border bg-background/70 hover:bg-muted"}`}
              >
                <span className={`font-sans text-xs font-semibold transition-colors ${heroMode ? (lang === "nl" ? "text-white" : "text-white/50") : (lang === "nl" ? "text-primary" : "text-muted-foreground")}`}>NL</span>
                <span className={`font-sans text-xs transition-colors ${heroMode ? "text-white/30" : "text-muted-foreground/40"}`}>/</span>
                <span className={`font-sans text-xs font-semibold transition-colors ${heroMode ? (lang === "en" ? "text-white" : "text-white/50") : (lang === "en" ? "text-primary" : "text-muted-foreground")}`}>EN</span>
              </button>

              <Link
                to="/boeken"
                className={`hidden md:inline-flex items-center px-5 py-2.5 rounded-lg font-sans text-sm font-medium hover:opacity-90 transition-opacity min-h-[44px] ${heroMode ? "bg-white/20 text-white border border-white/40 hover:bg-white/30" : "bg-accent text-accent-foreground"}`}
              >
                {t.nav.bookNow}
              </Link>

              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className={`md:hidden p-2.5 rounded-lg transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center ${heroMode ? "hover:bg-white/20" : "hover:bg-muted"}`}
                aria-label={menuOpen ? t.nav.menuClose : t.nav.menu}
              >
                {menuOpen
                  ? <X   className={`h-5 w-5 ${heroMode ? "text-white" : "text-foreground"}`} />
                  : <Menu className={`h-5 w-5 ${heroMode ? "text-white" : "text-foreground"}`} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Overlay */}
      {menuOpen && <div className="fixed inset-0 z-40 bg-slate-warm/30 backdrop-blur-sm md:hidden" onClick={() => setMenuOpen(false)} />}

      {/* Mobile drawer */}
      <div className={`fixed top-0 right-0 z-50 h-full w-72 bg-card shadow-2xl md:hidden transition-transform duration-350 ease-out ${menuOpen ? "translate-x-0 animate-slide-in-right" : "translate-x-full"}`}>
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-6 border-b border-border">
            <span className="font-serif text-lg font-semibold text-foreground">Menu</span>
            <button onClick={() => setMenuOpen(false)} className="p-2 rounded-lg hover:bg-muted transition-colors" aria-label={t.nav.menuClose}>
              <X className="h-5 w-5 text-foreground" />
            </button>
          </div>

          <nav className="flex flex-col p-6 gap-1 flex-1">
            {navItems.map(item => (
              item.type === "route" ? (
                <Link key={item.href} to={item.href} className={mobileLinkCls(isActive(item))}>
                  {item.label}
                </Link>
              ) : (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={e => handleSectionClick(e, item.id)}
                  className={mobileLinkCls(isActive(item))}
                >
                  {item.label}
                </a>
              )
            ))}

            <div className="mt-4 px-4">
              <button onClick={() => setLang(lang === "nl" ? "en" : "nl")} className="flex items-center gap-2 w-full py-3">
                <span className={`font-sans text-sm font-semibold ${lang === "nl" ? "text-primary" : "text-muted-foreground"}`}>NL</span>
                <span className="text-muted-foreground/40 text-sm">/</span>
                <span className={`font-sans text-sm font-semibold ${lang === "en" ? "text-primary" : "text-muted-foreground"}`}>EN</span>
              </button>
            </div>
          </nav>

          <div className="p-6 border-t border-border">
            <Link
              to="/boeken"
              className="flex items-center justify-center w-full px-5 py-3 rounded-lg bg-accent text-accent-foreground font-sans text-sm font-medium hover:opacity-90 transition-opacity min-h-[48px]"
            >
              {t.nav.bookNow}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
