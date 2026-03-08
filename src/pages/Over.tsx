import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { SEO, SITE_URL } from "@/components/SEO";
import cintiaImage from "@/assets/cintia-portrait.jpg";

const seoMeta: Record<string, { title: string; desc: string; breadcrumb: string }> = {
  nl: { title: "Over Cintia — Kinesitherapiste & Pilatesdocent", desc: "Leer Cintia kennen: kinesitherapiste met 20+ jaar ervaring in Brazilië, de VS en België. Ontdek haar filosofie van verantwoord Pilates.", breadcrumb: "Over Cintia" },
  en: { title: "About Cintia — Physiotherapist & Pilates Teacher", desc: "Meet Cintia: physiotherapist with 20+ years of experience in Brazil, the US and Belgium. Discover her responsible Pilates philosophy.", breadcrumb: "About Cintia" },
  fr: { title: "À propos de Cintia — Kinésithérapeute & Pilates", desc: "Découvrez Cintia : kinésithérapeute avec plus de 20 ans d'expérience au Brésil, aux USA et en Belgique. Son Pilates responsable.", breadcrumb: "À propos de Cintia" },
  pt: { title: "Sobre a Cintia — Fisioterapeuta & Professora de Pilates", desc: "Conheça a Cintia: fisioterapeuta com mais de 20 anos de experiência no Brasil, EUA e Bélgica. Pilates responsável.", breadcrumb: "Sobre a Cintia" },
};

export default function Over() {
  const { t, lang } = useLanguage();
  const o = t.over;
  const seo = seoMeta[lang] || seoMeta.nl;

  return (
    <main className="pt-24">
      <SEO
        title={seo.title}
        description={seo.desc}
        path="/over"
        lang={lang}
        breadcrumbs={[
          { name: "Home", url: SITE_URL },
          { name: seo.breadcrumb, url: `${SITE_URL}/over` },
        ]}
      />
      {/* Hero */}
      <section className="bg-muted">
        <div className="container-wide section-padding">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-24 items-center">
            <div className="animate-fade-in-left">
              <p className="font-sans text-xs uppercase tracking-widest text-primary mb-4">{o.tag}</p>
              <h1 className="font-serif text-5xl md:text-6xl font-semibold text-foreground mb-8 leading-tight">
                {o.heroTitle}<br /><em>{o.heroTitleEm}</em>
              </h1>
              <div className="space-y-5 font-sans text-base text-muted-foreground leading-relaxed">
                <p>{o.p1}</p>
                <p>{o.p2}</p>
                <p>{o.p3}</p>
              </div>
              <div className="mt-9">
                <Link to="/boeken#reservatie" className="inline-flex items-center gap-2 px-7 py-4 rounded-lg bg-accent text-accent-foreground font-sans font-medium text-sm hover:opacity-90 transition-opacity min-h-[48px]">
                  {o.heroCta} <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
            <div className="relative animate-fade-in">
              <img src={cintiaImage} alt="Cintia, Licentiate Kinesitherapie en Pilatesdocent" className="w-full max-w-md mx-auto lg:mr-0 rounded-2xl object-cover shadow-xl aspect-[3/4]" width={1013} height={1033} loading="eager" />
            </div>
          </div>
        </div>
      </section>

      {/* Credentials */}
      <section className="bg-card">
        <div className="container-wide section-padding">
          <div className="text-center mb-14">
            <h2 className="font-serif text-4xl font-semibold text-foreground">{o.expertiseTitle}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {o.credentials.map((c) => (
              <div key={c.title} className="bg-muted rounded-xl p-8 hover-lift border border-border">
                <span className="text-4xl mb-5 block">{c.icon}</span>
                <h3 className="font-serif text-xl font-semibold text-foreground mb-3">{c.title}</h3>
                <p className="font-sans text-sm text-muted-foreground leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy Quote */}
      <section className="bg-sage">
        <div className="container-wide section-padding py-20 text-center">
          <p className="font-sans text-xs uppercase tracking-widest text-primary-foreground/60 mb-8">{o.quoteTag}</p>
          <blockquote className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold text-primary-foreground leading-tight max-w-3xl mx-auto">
            {o.quote}
          </blockquote>
          <p className="font-sans text-base text-primary-foreground/70 mt-8">{o.quoteAuthor}</p>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-card">
        <div className="container-wide section-padding py-16 text-center">
          <h2 className="font-serif text-3xl font-semibold text-foreground mb-4">{o.ctaTitle}</h2>
          <p className="font-sans text-muted-foreground mb-8">{o.ctaSub}</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/boeken#reservatie" className="inline-flex items-center gap-2 px-7 py-4 rounded-lg bg-accent text-accent-foreground font-sans font-medium text-sm hover:opacity-90 transition-opacity min-h-[48px]">
              {o.ctaBtn} <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/tarieven" className="inline-flex items-center gap-2 px-7 py-4 rounded-lg border border-border text-foreground font-sans text-sm hover:bg-muted transition-colors min-h-[48px]">
              {o.ctaSecondary}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
