import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { SEO, SITE_URL } from "@/components/SEO";

const sessionImage = "https://static.wixstatic.com/media/f76b6d_cfe6e12cc64048e4b43a09851d0906d0~mv2.jpg/v1/fill/w_501,h_640,al_c,q_80,enc_avif,quality_auto/f76b6d_cfe6e12cc64048e4b43a09851d0906d0~mv2.jpg";

export default function Prive() {
  const { t } = useLanguage();
  const p = t.prive;

  return (
    <main className="pt-24">
      <SEO
        title="Privé Sessies — Individueel en Duo Pilates"
        description="Boek een privé Pilates sessie bij Spessirits: individueel of als duo. Op maat gemaakt door kinesitherapiste Cintia in Schilde."
        path="/prive"
        breadcrumbs={[
          { name: "Home", url: SITE_URL },
          { name: "Privé Sessies", url: `${SITE_URL}/prive` },
        ]}
      />
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
          <p className="font-sans text-xs uppercase tracking-widest text-primary-foreground/70 mb-5">{p.tag}</p>
          <h1 className="font-serif text-5xl md:text-6xl font-semibold text-primary-foreground mb-6 max-w-2xl leading-tight">
            {p.heroTitle}<br />
            <em>{p.heroTitleEm}</em>
          </h1>
          <p className="font-sans text-lg text-primary-foreground/80 max-w-lg leading-relaxed">{p.heroSub}</p>
        </div>
      </section>

      {/* Approach */}
      <section className="bg-card">
        <div className="container-wide section-padding">
          <div className="max-w-3xl mx-auto text-center">
            <p className="font-sans text-xs uppercase tracking-widest text-primary mb-4">{p.approachTag}</p>
            <h2 className="font-serif text-4xl font-semibold text-foreground mb-8">{p.approachTitle}</h2>
            <div className="space-y-5 font-sans text-base text-muted-foreground leading-relaxed text-left">
              <p>{p.approachP1}</p>
              <p>{p.approachP2}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Session Formats */}
      <section className="bg-muted">
        <div className="container-wide section-padding">
          <div className="text-center mb-14">
            <h2 className="font-serif text-4xl font-semibold text-foreground">{p.formatsTitle}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Individual */}
            <div className="bg-card rounded-2xl p-8 border border-border shadow-sm hover-lift">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-sage-light flex items-center justify-center text-2xl">👤</div>
                <div>
                  <h3 className="font-serif text-2xl font-semibold text-foreground">{p.individualTitle}</h3>
                  <p className="font-sans text-sm text-muted-foreground">{p.individualSub}</p>
                </div>
              </div>
              <ul className="space-y-3 mb-8">
                {p.individualBenefits.map((b) => (
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
                {p.viewPricing} <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            {/* Duo */}
            <div className="bg-sage rounded-2xl p-8 shadow-sm hover-lift">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-primary-foreground/20 flex items-center justify-center text-2xl">👥</div>
                <div>
                  <h3 className="font-serif text-2xl font-semibold text-primary-foreground">{p.duoTitle}</h3>
                  <p className="font-sans text-sm text-primary-foreground/70">{p.duoSub}</p>
                </div>
              </div>
              <ul className="space-y-3 mb-8">
                {p.duoBenefits.map((b) => (
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
                {p.viewPricing} <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-card">
        <div className="container-wide section-padding py-16 text-center">
          <h2 className="font-serif text-3xl font-semibold text-foreground mb-4">{p.ctaTitle}</h2>
          <p className="font-sans text-muted-foreground mb-8 max-w-sm mx-auto">{p.ctaSub}</p>
          <Link
            to="/boeken#reservatie"
            className="inline-flex items-center gap-2 px-7 py-4 rounded-lg bg-accent text-accent-foreground font-sans font-medium text-sm hover:opacity-90 transition-opacity min-h-[48px]"
          >
            {p.ctaBtn} <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}
