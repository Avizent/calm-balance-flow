import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const audiences = [
  {
    icon: "🌿",
    title: "Beginners",
    desc: "Beginners die hun lichaam beter willen leren kennen. We starten rustig en bouwen op in je eigen tempo, met volle aandacht voor correcte uitvoering.",
  },
  {
    icon: "🏃",
    title: "Sporters",
    desc: "Sporters die hun prestaties willen ondersteunen. Pilates versterkt de kern, verbetert mobiliteit en helpt blessures voorkomen.",
  },
  {
    icon: "🌸",
    title: "Ouderen",
    desc: "Ouderen die mobiel, sterk en zelfstandig willen blijven. Beweging op maat die jouw lichaam respecteert en versterkt.",
  },
  {
    icon: "👶",
    title: "Pre- & Post-Nataal",
    desc: "Veilige en doeltreffende oefeningen die je helpen bewegen, voorbereiden en herstellen tijdens en na de zwangerschap.",
  },
];

const equipment = [
  { name: "Allegro Nextgen Reformer™ with Tower and Mat", role: "Kernapparaat voor weerstandstraining en kernkracht" },
  { name: "Ladder Barrel", role: "Rugverlenging, flexibiliteit en laterale bewegingen" },
  { name: "Chair", role: "Evenwicht, stabiliteit en functionele kracht" },
  { name: "Spine Corrector", role: "Rugcorrectie, thoracale mobiliteit en houding" },
  { name: "Arc", role: "Rugondersteuning en diepere rugstretch" },
  { name: "Oov", role: "Diepe kernactivatie en proprioceptie" },
  { name: "Konnections® Band", role: "Functionele weerstand en bewegingsvrijheid" },
  { name: "Spinefitter® by SISSEL®", role: "Wervelkolombeweeglijkheid en ontspanning" },
  { name: "Magic Roller®", role: "Myofasciale release en spierregeneratie" },
  { name: "Inflatable Ball", role: "Stabiliteit, evenwicht en zachte ondersteuning" },
];

export default function Lessen() {
  return (
    <main className="pt-24">
      {/* Hero */}
      <section className="bg-muted">
        <div className="container-wide section-padding py-20 text-center">
          <p className="font-sans text-xs uppercase tracking-widest text-primary mb-4">Lessen</p>
          <h1 className="font-serif text-5xl md:text-6xl font-semibold text-foreground mb-6 max-w-2xl mx-auto leading-tight">
            Individueel afgestemde <em>Pilates</em>
          </h1>
          <p className="font-sans text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Verwacht geen standaardles, wel aandacht en respect voor het lichaam en beweging die dient — niet eist.
          </p>
        </div>
      </section>

      {/* Audience Cards */}
      <section className="bg-card">
        <div className="container-wide section-padding">
          <div className="text-center mb-14">
            <h2 className="font-serif text-4xl font-semibold text-foreground mb-3">Pilates voor iedereen</h2>
            <p className="font-sans text-muted-foreground max-w-md mx-auto">
              Dit is "verantwoord Pilates" — wat letsels op korte en lange termijn vermijdt.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {audiences.map((a) => (
              <div key={a.title} className="bg-muted rounded-xl p-7 hover-lift border border-border flex flex-col">
                <span className="text-4xl mb-4">{a.icon}</span>
                <h3 className="font-serif text-xl font-semibold text-foreground mb-3">{a.title}</h3>
                <p className="font-sans text-sm text-muted-foreground leading-relaxed flex-1">{a.desc}</p>
                <Link
                  to="/contact"
                  className="mt-5 inline-flex items-center gap-1.5 text-primary font-sans text-sm font-medium hover:gap-2.5 transition-all"
                >
                  Boek Nu <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Equipment Grid */}
      <section className="bg-muted">
        <div className="container-wide section-padding">
          <div className="text-center mb-14">
            <p className="font-sans text-xs uppercase tracking-widest text-primary mb-4">Studio Uitrusting</p>
            <h2 className="font-serif text-4xl font-semibold text-foreground mb-3">
              Pilates op maat — Individueel en Duo
            </h2>
            <p className="font-sans text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Door Pilates in al haar vormen te gebruiken ontstaat er een rijkere, intelligentere manier van bewegen. Elk toestel voegt een eigen dimensie toe: ondersteuning waar nodig, uitdaging waar mogelijk en precisie tot in de kleinste details.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {equipment.map((item, i) => (
              <div
                key={item.name}
                className="bg-card rounded-xl p-6 border border-border hover-lift flex flex-col gap-3"
              >
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-sage-light text-primary flex items-center justify-center text-sm font-serif font-semibold shrink-0">
                    {i + 1}
                  </span>
                  <h3 className="font-serif text-base font-semibold text-foreground">{item.name}</h3>
                </div>
                <p className="font-sans text-sm text-muted-foreground leading-relaxed">{item.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-sage">
        <div className="container-wide section-padding py-16 text-center">
          <h2 className="font-serif text-3xl font-semibold text-primary-foreground mb-4">
            Nieuwsgierig geworden?
          </h2>
          <p className="font-sans text-primary-foreground/70 mb-8 max-w-md mx-auto">
            Neem contact op met Cintia voor een gepersonaliseerde sessie.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-7 py-4 rounded-lg bg-card text-foreground font-sans font-medium text-sm hover:bg-card/90 transition-colors min-h-[48px]"
          >
            Neem contact op <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}
