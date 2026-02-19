import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export function Navigation() {
  const { lang, setLang, t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { label: t.nav.home, href: "/" },
    { label: t.nav.over, href: "/over" },
    { label: t.nav.lessen, href: "/lessen" },
    { label: t.nav.prive, href: "/prive" },
    { label: t.nav.tarieven, href: "/tarieven" },
    { label: t.nav.contact, href: "/contact" },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const isActive = (href: string) =>
    href === "/" ? location.pathname === "/" : location.pathname.startsWith(href);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled || menuOpen ? "glass-nav shadow-sm" : "bg-transparent"
        }`}
      >
        <div className="container-wide px-6 md:px-10">
          <div className="flex items-center justify-between h-18 py-4">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="flex flex-col leading-tight">
                <span className="font-serif text-xl font-semibold text-foreground tracking-wide">
                  Spessirits
                </span>
                <span className="font-sans text-xs text-muted-foreground tracking-[0.15em] uppercase">
                  Pilates
                </span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`font-sans text-sm transition-colors duration-200 relative after:absolute after:bottom-0 after:left-0 after:h-[1.5px] after:bg-primary after:transition-all after:duration-200 ${
                    isActive(link.href)
                      ? "text-primary font-medium after:w-full"
                      : "text-foreground/70 hover:text-foreground after:w-0 hover:after:w-full"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Right side: Lang toggle + CTA + Mobile toggle */}
            <div className="flex items-center gap-2">
              {/* Language Toggle */}
              <button
                onClick={() => setLang(lang === "nl" ? "en" : "nl")}
                aria-label="Switch language"
                className="hidden md:flex items-center gap-1 px-3 py-1.5 rounded-full border border-border bg-background/70 hover:bg-muted transition-colors"
              >
                <span
                  className={`font-sans text-xs font-semibold transition-colors ${
                    lang === "nl" ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  NL
                </span>
                <span className="text-muted-foreground/40 font-sans text-xs">/</span>
                <span
                  className={`font-sans text-xs font-semibold transition-colors ${
                    lang === "en" ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  EN
                </span>
              </button>

              <Link
                to="/contact"
                className="hidden md:inline-flex items-center px-5 py-2.5 rounded-lg bg-accent text-accent-foreground font-sans text-sm font-medium hover:opacity-90 transition-opacity min-h-[44px]"
              >
                {t.nav.bookNow}
              </Link>

              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="lg:hidden p-2.5 rounded-lg hover:bg-muted transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                aria-label={menuOpen ? t.nav.menuClose : t.nav.menu}
              >
                {menuOpen ? (
                  <X className="h-5 w-5 text-foreground" />
                ) : (
                  <Menu className="h-5 w-5 text-foreground" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-warm/30 backdrop-blur-sm lg:hidden"
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* Mobile Drawer */}
      <div
        className={`fixed top-0 right-0 z-50 h-full w-72 bg-card shadow-2xl lg:hidden transition-transform duration-350 ease-out ${
          menuOpen ? "translate-x-0 animate-slide-in-right" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-6 border-b border-border">
            <span className="font-serif text-lg font-semibold text-foreground">Menu</span>
            <button
              onClick={() => setMenuOpen(false)}
              className="p-2 rounded-lg hover:bg-muted transition-colors"
              aria-label={t.nav.menuClose}
            >
              <X className="h-5 w-5 text-foreground" />
            </button>
          </div>

          <nav className="flex flex-col p-6 gap-1 flex-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`py-3 px-4 rounded-lg font-sans text-base transition-colors duration-150 min-h-[48px] flex items-center ${
                  isActive(link.href)
                    ? "bg-sage-light text-primary font-medium"
                    : "text-foreground/80 hover:bg-muted hover:text-foreground"
                }`}
              >
                {link.label}
              </Link>
            ))}

            {/* Mobile language toggle */}
            <div className="mt-4 px-4">
              <button
                onClick={() => setLang(lang === "nl" ? "en" : "nl")}
                className="flex items-center gap-2 w-full py-3 px-0"
              >
                <span
                  className={`font-sans text-sm font-semibold transition-colors ${
                    lang === "nl" ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  NL
                </span>
                <span className="text-muted-foreground/40 font-sans text-sm">/</span>
                <span
                  className={`font-sans text-sm font-semibold transition-colors ${
                    lang === "en" ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  EN
                </span>
              </button>
            </div>
          </nav>

          <div className="p-6 border-t border-border">
            <Link
              to="/contact"
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
