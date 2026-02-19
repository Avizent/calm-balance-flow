import { Link } from "react-router-dom";
import { Phone, Mail, MapPin } from "lucide-react";

export function Footer() {
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
              Verantwoord Pilates — beweging die dient, niet eist. Onder begeleiding van Licentiate Kinesitherapiste Cintia.
            </p>
          </div>

          {/* Links */}
          <div>
            <p className="font-sans text-xs uppercase tracking-widest text-primary-foreground/50 mb-4">Navigatie</p>
            <nav className="flex flex-col gap-2">
              {[
                { label: "Home", href: "/" },
                { label: "Over Cintia", href: "/over" },
                { label: "Lessen", href: "/lessen" },
                { label: "Privé Sessies", href: "/prive" },
                { label: "Tarieven", href: "/tarieven" },
                { label: "Contact", href: "/contact" },
              ].map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="font-sans text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <p className="font-sans text-xs uppercase tracking-widest text-primary-foreground/50 mb-4">Contact</p>
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
              <div className="flex items-start gap-2.5 font-sans text-sm text-primary-foreground/70">
                <MapPin className="h-4 w-4 shrink-0 mt-0.5" />
                Cirkellaan 12, 2970 Schilde
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-sans text-xs text-primary-foreground/40">
            © {new Date().getFullYear()} Spessirits Pilates. Alle rechten voorbehouden.
          </p>
          <p className="font-sans text-xs text-primary-foreground/40">
            Cirkellaan 12 · 2970 Schilde · België
          </p>
        </div>
      </div>
    </footer>
  );
}
