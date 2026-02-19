import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle } from "lucide-react";

const heroImage = "https://static.wixstatic.com/media/f76b6d_739a2569d5054e4fa82dfe477b6a5492~mv2.jpeg/v1/fill/w_1013,h_1033,al_t,q_85,enc_avif,quality_auto/f76b6d_739a2569d5054e4fa82dfe477b6a5492~mv2.jpeg";
const secondaryImage = "https://static.wixstatic.com/media/f76b6d_b20d70f0cd8c423bad5e52f8629d5825~mv2.jpg/v1/fill/w_491,h_795,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/f76b6d_b20d70f0cd8c423bad5e52f8629d5825~mv2.jpg";

const audiences = [
  {
    title: "Beheer van Pijn & Klachten",
    desc: "Meer kracht, mobiliteit en betere bewegingskwaliteit, zonder rug- en gewrichtspijn.",
    icon: "🌿",
  },
  {
    title: "Revalidatie",
    desc: "Physio-led Pilates als onderdeel van je herstel naar dagelijkse beweging en sport na blessure of operatie.",
    icon: "🔄",
  },
  {
    title: "Beginners & Gevorderden",
    desc: "Beginners die hun lichaam beter willen leren kennen en sporters die hun prestaties willen ondersteunen.",
    icon: "⭐",
  },
  {
    title: "Pre- & Post-Nataal",
    desc: "Veilige en doeltreffende oefeningen die je helpen bewegen, voorbereiden en herstellen.",
    icon: "🌸",
  },
];

const benefits = [
  "Lichaamshouding",
  "Spierkracht & Kern",
  "Flexibiliteit",
  "Mobiliteit",
  "Coördinatie",
  "Stressreductie",
  "Mindfulness",
  "Ademhaling",
];

export default function Index() {
  return (
    <main>
      {/* Hero */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0 z-0">
          <img
            src={secondaryImage}
            alt="Cintia demonstreert Pilates"
            className="w-full h-full object-cover object-center"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 via-foreground/50 to-foreground/10" />
        </div>

        {/* Content */}
        <div className="relative z-10 container-wide section-padding py-40 flex flex-col justify-center max-w-3xl">
          <p className="font-sans text-sm uppercase tracking-[0.2em] text-primary-foreground/70 mb-5 animate-fade-in">
            Physio-led Pilates · Schilde, België
          </p>
          <h1 className="font-serif text-5xl md:text-7xl font-semibold text-primary-foreground mb-6 leading-tight animate-fade-in [animation-delay:0.1s]">
            Pilates als<br />
            <em>levensstijl</em>
          </h1>
          <p className="font-sans text-lg text-primary-foreground/80 mb-10 max-w-lg leading-relaxed animate-fade-in [animation-delay:0.2s]">
            Verwacht geen standaardles, wel aandacht en respect voor het lichaam en beweging die dient — niet eist.
          </p>
          <div className="flex flex-wrap gap-4 animate-fade-in [animation-delay:0.3s]">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-7 py-4 rounded-lg bg-accent text-accent-foreground font-sans font-medium text-sm hover:opacity-90 transition-opacity min-h-[48px]"
            >
              Boek een Sessie <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/over"
              className="inline-flex items-center gap-2 px-7 py-4 rounded-lg border border-primary-foreground/30 text-primary-foreground font-sans text-sm hover:bg-primary-foreground/10 transition-colors min-h-[48px]"
            >
              Over Cintia
            </Link>
          </div>
        </div>
      </section>

      {/* About Teaser */}
      <section className="bg-card">
        <div className="container-wide section-padding">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="relative">
              <img
                src={heroImage}
                alt="Cintia, Pilatesdocent"
                className="w-full max-w-md mx-auto lg:mx-0 rounded-2xl object-cover shadow-xl aspect-[3/4]"
                loading="lazy"
              />
              <div className="absolute -bottom-5 -right-5 bg-sage text-primary-foreground rounded-xl px-5 py-4 shadow-lg hidden md:block">
                <p className="font-serif text-2xl font-semibold">20+</p>
                <p className="font-sans text-xs text-primary-foreground/80">jaar ervaring</p>
              </div>
            </div>

            <div>
              <p className="font-sans text-xs uppercase tracking-widest text-primary mb-3">Over Cintia</p>
              <h2 className="font-serif text-4xl md:text-5xl font-semibold text-foreground mb-6">
                Licentiate Kinesitherapie & Pilatesdocent
              </h2>
              <p className="font-sans text-base text-muted-foreground mb-4 leading-relaxed">
                Ik ben Licentiate Kinesitherapie en Pilatesdocent met meer dan 20 jaar ervaring in Brazilië, de Verenigde Staten en België.
              </p>
              <p className="font-sans text-base text-muted-foreground mb-8 leading-relaxed">
                Pilates is altijd mijn grote passie geweest, met een sterke focus op preventief en bewust bewegen. Recent heb ik de overstap gemaakt naar fulltime Pilates lesgeven.
              </p>
              <Link
                to="/over"
                className="inline-flex items-center gap-2 text-primary font-sans font-medium text-sm hover:gap-3 transition-all"
              >
                Lees meer <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Pilates voor iedereen */}
      <section className="bg-muted">
        <div className="container-wide section-padding">
          <div className="text-center mb-14">
            <p className="font-sans text-xs uppercase tracking-widest text-primary mb-3">Pilates voor iedereen</p>
            <h2 className="font-serif text-4xl md:text-5xl font-semibold text-foreground max-w-xl mx-auto">
              Verantwoord Pilates op maat
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {audiences.map((item) => (
              <div
                key={item.title}
                className="bg-card rounded-xl p-7 hover-lift shadow-sm border border-border flex flex-col"
              >
                <span className="text-3xl mb-4">{item.icon}</span>
                <h3 className="font-serif text-xl font-semibold text-foreground mb-3">{item.title}</h3>
                <p className="font-sans text-sm text-muted-foreground leading-relaxed flex-1">{item.desc}</p>
                <Link
                  to="/lessen"
                  className="mt-5 inline-flex items-center gap-1.5 text-primary font-sans text-sm font-medium hover:gap-2.5 transition-all"
                >
                  Meer info <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Strip */}
      <section className="bg-sage">
        <div className="container-wide px-6 md:px-16 py-14">
          <p className="font-sans text-xs uppercase tracking-widest text-primary-foreground/60 text-center mb-8">
            Voordelen van de Pilatesmethode
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {benefits.map((benefit) => (
              <div
                key={benefit}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary-foreground/15 border border-primary-foreground/20"
              >
                <CheckCircle className="h-3.5 w-3.5 text-primary-foreground/70 shrink-0" />
                <span className="font-sans text-sm text-primary-foreground font-medium">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-card">
        <div className="container-wide section-padding py-20 text-center">
          <h2 className="font-serif text-4xl md:text-5xl font-semibold text-foreground mb-5">
            Klaar om te beginnen?
          </h2>
          <p className="font-sans text-lg text-muted-foreground mb-10 max-w-md mx-auto">
            Neem contact op en plan je eerste sessie met Cintia.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-accent text-accent-foreground font-sans font-medium hover:opacity-90 transition-opacity min-h-[48px]"
          >
            Boek een sessie <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}
