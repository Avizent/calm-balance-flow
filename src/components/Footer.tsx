import { Link, useLocation, useNavigate } from "react-router-dom";
import { Phone, Mail, MapPin } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function Footer() {
  const { t, lang } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === "/";

  const handleHomeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isHome) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      navigate("/");
      setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 100);
    }
  };

  const handleRouteClick = (e: React.MouseEvent, href: string) => {
    const onSamePage = location.pathname === href;
    if (onSamePage) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    // Otherwise let the Link navigate normally
  };

  const handleSectionClick = (e: React.MouseEvent, sectionId: string) => {
    e.preventDefault();
    if (isHome) {
      scrollToSection(sectionId);
    } else {
      // Navigate to homepage then scroll — same pattern as top nav
      navigate("/", { state: { scrollTo: sectionId } });
    }
  };

  const navItems = [
    { label: t.nav.home,    type: "home"    as const },
    { label: t.nav.over,    type: "route"   as const, href: "/over" },
    { label: t.nav.lessen,  type: "section" as const, id: "lessen" },
    { label: lang === "nl" ? "Sessies" : "Sessions", type: "section" as const, id: "prive" },
    { label: t.nav.contact, type: "section" as const, id: "contact" },
  ];

  return (
    <footer className="bg-foreground text-primary-foreground">
      <div className="container-wide section-padding py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <div>
              <p className="font-serif text-2xl font-semibold">Spessirits</p>
              <p className="font-sans text-xs tracking-[0.15em] uppercase text-primary-foreground/60 mt-0.5">Pilates</p>
            </div>
            <p className="font-sans text-sm text-primary-foreground/70 leading-relaxed max-w-xs">
              {t.footer.tagline}
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p className="font-sans text-xs uppercase tracking-widest text-primary-foreground/50 mb-4">
              {t.footer.navigation}
            </p>
            <nav className="flex flex-col gap-2">
              {navItems.map((item) => {
                const cls = "font-sans text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors cursor-pointer";

                if (item.type === "home") {
                  return (
                    <a key="home" href="/" onClick={handleHomeClick} className={cls}>
                      {item.label}
                    </a>
                  );
                }
                if (item.type === "route") {
                  return (
                    <Link
                      key={item.href}
                      to={item.href!}
                      onClick={(e) => handleRouteClick(e, item.href!)}
                      className={cls}
                    >
                      {item.label}
                    </Link>
                  );
                }
                // section
                return (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={(e) => handleSectionClick(e, item.id!)}
                    className={cls}
                  >
                    {item.label}
                  </a>
                );
              })}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <p className="font-sans text-xs uppercase tracking-widest text-primary-foreground/50 mb-4">
              {t.footer.contact}
            </p>
            <div className="flex flex-col gap-3">
              <a
                href="tel:+32472913917"
                className="flex items-center gap-2.5 font-sans text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
              >
                <Phone className="h-4 w-4 shrink-0" />
                +32 472 913 917
              </a>
              <a
                href="mailto:spessiritskine@icloud.com"
                className="flex items-center gap-2.5 font-sans text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
              >
                <Mail className="h-4 w-4 shrink-0" />
                spessiritskine@icloud.com
              </a>
              <a
                href="https://maps.google.com/?q=Cirkellaan+12,+2970+Schilde"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-2.5 font-sans text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
              >
                <MapPin className="h-4 w-4 shrink-0 mt-0.5" />
                Cirkellaan 12, 2970 Schilde
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-sans text-xs text-primary-foreground/40">
            © {new Date().getFullYear()} Spessirits Pilates. {t.footer.rights}
          </p>
          <p className="font-sans text-xs text-primary-foreground/40">
            Cirkellaan 12 · 2970 Schilde · België
          </p>
        </div>
      </div>
    </footer>
  );
}
