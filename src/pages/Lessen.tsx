import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Lessen() {
  const { t } = useLanguage();
  const l = t.lessen;

  return (
    <main className="pt-24">
      {/* Hero */}
      <section className="bg-muted">
        <div className="container-wide section-padding py-20 text-center">
          <p className="font-sans text-xs uppercase tracking-widest text-primary mb-4">{l.tag}</p>
          <h1 className="font-serif text-5xl md:text-6xl font-semibold text-foreground mb-6 max-w-2xl mx-auto leading-tight">
            {l.heroTitle} <em>{l.heroTitleEm}</em>
          </h1>
          <p className="font-sans text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
            {l.heroSub}
          </p>
        </div>
      </section>

      {/* Audience Cards */}
      <section className="bg-card">
        <div className="container-wide section-padding">
          <div className="text-center mb-14">
            <h2 className="font-serif text-4xl font-semibold text-foreground mb-3">{l.audienceTitle}</h2>
            <p className="font-sans text-muted-foreground max-w-md mx-auto">{l.audienceSub}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {l.audiences.map((a) => (
              <div key={a.title} className="bg-muted rounded-xl p-7 hover-lift border border-border flex flex-col">
                <span className="text-4xl mb-4">{a.icon}</span>
                <h3 className="font-serif text-xl font-semibold text-foreground mb-3">{a.title}</h3>
                <p className="font-sans text-sm text-muted-foreground leading-relaxed flex-1">{a.desc}</p>
                <Link
                  to="/boeken"
                  className="mt-5 inline-flex items-center gap-1.5 text-primary font-sans text-sm font-medium hover:gap-2.5 transition-all"
                >
                  {l.bookNow} <ArrowRight className="h-3.5 w-3.5" />
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
            <p className="font-sans text-xs uppercase tracking-widest text-primary mb-4">{l.equipmentTag}</p>
            <h2 className="font-serif text-4xl font-semibold text-foreground mb-3">{l.equipmentTitle}</h2>
            <p className="font-sans text-muted-foreground max-w-2xl mx-auto leading-relaxed">{l.equipmentSub}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {l.equipment.map((item, i) => (
              <div
                key={item.name}
                className="bg-card rounded-xl p-6 border border-border panel-hover flex flex-col gap-3"
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
          <h2 className="font-serif text-3xl font-semibold text-primary-foreground mb-4">{l.ctaTitle}</h2>
          <p className="font-sans text-primary-foreground/70 mb-8 max-w-md mx-auto">{l.ctaSub}</p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-7 py-4 rounded-lg bg-card text-foreground font-sans font-medium text-sm hover:bg-card/90 transition-colors min-h-[48px]"
          >
            {l.ctaBtn} <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}
