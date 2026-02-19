import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle } from "lucide-react";

const sessionImage = "https://static.wixstatic.com/media/f76b6d_cfe6e12cc64048e4b43a09851d0906d0~mv2.jpg/v1/fill/w_501,h_640,al_c,q_80,enc_avif,quality_auto/f76b6d_cfe6e12cc64048e4b43a09851d0906d0~mv2.jpg";

const individualBenefits = [
  "Volledig op jouw lichaam en doelen afgestemde sessie",
  "Diepgaande begeleiding van Licentiate Kinesitherapiste",
  "Werkt aan specifieke klachten, blessures of revalidatie",
  "Flexibele planning op jouw ritme",
  "Gebruik van alle studiouitrusting",
];

const duoBenefits = [
  "Samen met een partner of vriend(in) trainen",
  "Kostenbesparing ten opzichte van twee individuele sessies",
  "Gemotiveerd en sociaal bewegen",
  "Elk duo-paar krijgt een aangepast programma",
  "Gebruik van alle studiouitrusting",
];

export default function Prive() {
  return (
    <main className="pt-24">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={sessionImage}
            alt="Pilates sessie"
            className="w-full h-full object-cover object-center"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/85 to-foreground/30" />
        </div>
        <div className="relative z-10 container-wide section-padding py-36">
          <p className="font-sans text-xs uppercase tracking-widest text-primary-foreground/70 mb-5">Privé Sessies</p>
          <h1 className="font-serif text-5xl md:text-6xl font-semibold text-primary-foreground mb-6 max-w-2xl leading-tight">
            Pilates op maat —<br />
            <em>Individueel en Duo</em>
          </h1>
          <p className="font-sans text-lg text-primary-foreground/80 max-w-lg leading-relaxed">
            Door Pilates in al haar vormen te gebruiken ontstaat er een rijkere, intelligentere manier van bewegen.
          </p>
        </div>
      </section>

      {/* Approach */}
      <section className="bg-card">
        <div className="container-wide section-padding">
          <div className="max-w-3xl mx-auto text-center">
            <p className="font-sans text-xs uppercase tracking-widest text-primary mb-4">Onze aanpak</p>
            <h2 className="font-serif text-4xl font-semibold text-foreground mb-8">
              Elke sessie is uniek
            </h2>
            <div className="space-y-5 font-sans text-base text-muted-foreground leading-relaxed text-left">
              <p>
                Elk toestel voegt een eigen dimensie toe: ondersteuning waar nodig, uitdaging waar mogelijk en precisie tot in de kleinste details. Dit is "verantwoord Pilates", wat letsels op korte en lange termijn vermijdt.
              </p>
              <p>
                Verwacht geen standaardles, wel aandacht en respect voor het lichaam en beweging die dient — niet eist. Als Licentiate Kinesitherapiste zet Cintia haar uitgebreide kennis van anatomie en biomechanica in om veilige, doordachte en effectieve sessies aan te bieden.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Session Formats */}
      <section className="bg-muted">
        <div className="container-wide section-padding">
          <div className="text-center mb-14">
            <h2 className="font-serif text-4xl font-semibold text-foreground">Sessieformaten</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Individual */}
            <div className="bg-card rounded-2xl p-8 border border-border shadow-sm hover-lift">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-sage-light flex items-center justify-center text-2xl">
                  👤
                </div>
                <div>
                  <h3 className="font-serif text-2xl font-semibold text-foreground">Individueel</h3>
                  <p className="font-sans text-sm text-muted-foreground">Eén op één met Cintia</p>
                </div>
              </div>
              <ul className="space-y-3 mb-8">
                {individualBenefits.map((b) => (
                  <li key={b} className="flex items-start gap-3">
                    <CheckCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                    <span className="font-sans text-sm text-muted-foreground">{b}</span>
                  </li>
                ))}
              </ul>
              <Link
                to="/tarieven"
                className="inline-flex items-center gap-2 text-primary font-sans text-sm font-medium hover:gap-3 transition-all"
              >
                Bekijk tarieven <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            {/* Duo */}
            <div className="bg-sage rounded-2xl p-8 shadow-sm hover-lift">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-primary-foreground/20 flex items-center justify-center text-2xl">
                  👥
                </div>
                <div>
                  <h3 className="font-serif text-2xl font-semibold text-primary-foreground">Duo</h3>
                  <p className="font-sans text-sm text-primary-foreground/70">Samen trainen met een partner</p>
                </div>
              </div>
              <ul className="space-y-3 mb-8">
                {duoBenefits.map((b) => (
                  <li key={b} className="flex items-start gap-3">
                    <CheckCircle className="h-4 w-4 text-primary-foreground/70 shrink-0 mt-0.5" />
                    <span className="font-sans text-sm text-primary-foreground/80">{b}</span>
                  </li>
                ))}
              </ul>
              <Link
                to="/tarieven"
                className="inline-flex items-center gap-2 text-primary-foreground font-sans text-sm font-medium hover:gap-3 transition-all"
              >
                Bekijk tarieven <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-card">
        <div className="container-wide section-padding py-16 text-center">
          <h2 className="font-serif text-3xl font-semibold text-foreground mb-4">
            Plan jouw privé sessie
          </h2>
          <p className="font-sans text-muted-foreground mb-8 max-w-sm mx-auto">
            Contacteer Cintia en start jouw persoonlijk Pilatestraject.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-7 py-4 rounded-lg bg-accent text-accent-foreground font-sans font-medium text-sm hover:opacity-90 transition-opacity min-h-[48px]"
          >
            Neem contact op <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}
