import { Link } from "react-router-dom";
import { ArrowRight, Clock, Ban, CreditCard, Calendar, Gift, MessageCircle, Mail } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { SEO, SITE_URL } from "@/components/SEO";
import { SHOW_PRICING } from "@/config/features";

const pricingData = [
  { exclBTW: { individueel: "€77", duo: "€90" }, inclBTW: { individueel: "€93,17", duo: "€108,90" }, popular: false },
  { exclBTW: { individueel: "€370", duo: "€440" }, inclBTW: { individueel: "€447,70", duo: "€532,40" }, popular: true },
  { exclBTW: { individueel: "€670", duo: "€790" }, inclBTW: { individueel: "€810,70", duo: "€955,90" }, popular: false },
];
const policyIcons = [Clock, Ban, CreditCard, Calendar];

// SEO copy for POA mode. To revert when SHOW_PRICING is re-enabled, restore
// the previous "Transparent pricing… packages of 1, 5 or 10 sessions" wording.
const seoMeta: Record<string, { title: string; desc: string; breadcrumb: string }> = SHOW_PRICING
  ? {
      nl: { title: "Tarieven — Pilates Prijzen Schilde 2026", desc: "Transparante prijzen voor individuele en duo Pilates sessies bij Spessirits in Schilde. Pakketten van 1, 5 of 10 sessies.", breadcrumb: "Tarieven" },
      en: { title: "Pricing — Pilates Prices Schilde 2026", desc: "Transparent pricing for individual and duo Pilates sessions at Spessirits in Schilde. Packages of 1, 5 or 10 sessions.", breadcrumb: "Pricing" },
      fr: { title: "Tarifs — Prix Pilates Schilde 2026", desc: "Tarifs transparents pour les séances de Pilates individuelles et duo chez Spessirits à Schilde. Forfaits de 1, 5 ou 10 séances.", breadcrumb: "Tarifs" },
      pt: { title: "Preços — Pilates em Schilde 2026", desc: "Preços transparentes para sessões de Pilates individuais e duo na Spessirits em Schilde. Pacotes de 1, 5 ou 10 sessões.", breadcrumb: "Preços" },
    }
  : {
      nl: { title: "Tarieven op aanvraag — Spessirits Pilates Schilde", desc: "Persoonlijke Pilates begeleiding door een kinesitherapeut in Schilde. Tarieven op aanvraag — neem contact op voor een offerte op maat.", breadcrumb: "Tarieven" },
      en: { title: "Pricing on application — Spessirits Pilates Schilde", desc: "Personal Pilates coaching by a physiotherapist in Schilde. Pricing on application — get in touch for a tailored quote.", breadcrumb: "Pricing" },
      fr: { title: "Tarifs sur demande — Spessirits Pilates Schilde", desc: "Coaching Pilates personnel par une kinésithérapeute à Schilde. Tarifs sur demande — contactez-nous pour un devis sur mesure.", breadcrumb: "Tarifs" },
      pt: { title: "Preços sob consulta — Spessirits Pilates Schilde", desc: "Coaching Pilates pessoal por uma fisioterapeuta em Schilde. Preços sob consulta — entre em contato para um orçamento personalizado.", breadcrumb: "Preços" },
    };

export default function Tarieven() {
  const { t, lang } = useLanguage();
  const tr = t.tarieven;
  const seo = seoMeta[lang] || seoMeta.nl;

  return (
    <main className="pt-24">
      <SEO
        title={seo.title}
        description={seo.desc}
        path="/tarieven"
        lang={lang}
        breadcrumbs={[
          { name: "Home", url: SITE_URL },
          { name: seo.breadcrumb, url: `${SITE_URL}/tarieven` },
        ]}
      />
      {/* Header */}
      <section className="bg-muted">
        <div className="container-wide section-padding py-20 text-center">
          <p className="font-sans text-xs uppercase tracking-widest text-primary mb-4">{tr.tag}</p>
          <h1 className="font-serif text-5xl md:text-6xl font-semibold text-foreground mb-5">{tr.heroTitle}</h1>
          <p className="font-sans text-lg text-muted-foreground max-w-md mx-auto">{tr.heroSub}</p>
        </div>
      </section>

      {/* Pricing Table — gated by SHOW_PRICING (see src/config/features.ts) */}
      {SHOW_PRICING ? (
      <section className="bg-card">
        <div className="container-wide section-padding">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {pricingData.map((data, i) => {
              const tier = tr.tiers[i];
              return (
                <div key={i} className={`rounded-2xl border p-8 flex flex-col hover-lift relative ${data.popular ? "bg-sage border-transparent shadow-xl" : "bg-card border-border shadow-sm"}`}>
                  {data.popular && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                      <span className="bg-terracotta text-accent-foreground font-sans text-xs font-semibold px-4 py-1.5 rounded-full uppercase tracking-wide">{tr.popular}</span>
                    </div>
                  )}
                  <h2 className={`font-serif text-2xl font-semibold mb-8 ${data.popular ? "text-primary-foreground" : "text-foreground"}`}>{tier.label}</h2>
                  <div className={`mb-5 pb-5 border-b ${data.popular ? "border-primary-foreground/20" : "border-border"}`}>
                    <p className={`font-sans text-xs uppercase tracking-wider mb-2 ${data.popular ? "text-primary-foreground/60" : "text-muted-foreground"}`}>👤 {tr.individueel}</p>
                    <p className={`font-serif text-3xl font-semibold ${data.popular ? "text-primary-foreground" : "text-foreground"}`}>{data.exclBTW.individueel}</p>
                    <p className={`font-sans text-sm mt-1 ${data.popular ? "text-primary-foreground/60" : "text-muted-foreground"}`}>{tr.exclLabel} · {data.inclBTW.individueel} incl.</p>
                  </div>
                  <div className="mb-8">
                    <p className={`font-sans text-xs uppercase tracking-wider mb-2 ${data.popular ? "text-primary-foreground/60" : "text-muted-foreground"}`}>👥 {tr.duo}</p>
                    <p className={`font-serif text-3xl font-semibold ${data.popular ? "text-primary-foreground" : "text-foreground"}`}>{data.exclBTW.duo}</p>
                    <p className={`font-sans text-sm mt-1 ${data.popular ? "text-primary-foreground/60" : "text-muted-foreground"}`}>{tr.exclLabel} · {data.inclBTW.duo} incl.</p>
                  </div>
                  <div className="mt-auto">
                    <Link to="/boeken#reservatie" className={`flex items-center justify-center gap-2 w-full py-3.5 rounded-xl font-sans text-sm font-medium transition-all min-h-[48px] ${data.popular ? "bg-primary-foreground text-foreground hover:bg-primary-foreground/90" : "bg-muted text-foreground hover:bg-secondary border border-border"}`}>
                      {tr.bookNow} <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
          <p className="text-center font-sans text-xs text-muted-foreground mt-8">{tr.pricingNote}</p>
        </div>
      </section>
      ) : (
      <section className="bg-card">
        <div className="container-wide section-padding">
          <div className="max-w-2xl mx-auto rounded-2xl border border-border bg-card shadow-sm p-10 md:p-14 text-center">
            <h2 className="font-serif text-3xl md:text-4xl font-semibold text-foreground mb-4">
              {tr.poaTitle}
            </h2>
            <p className="font-sans text-base text-muted-foreground leading-relaxed mb-8 max-w-md mx-auto">
              {tr.poaBody}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-primary text-primary-foreground font-sans text-sm font-medium hover:opacity-90 transition-opacity min-h-[48px]"
              >
                <Mail className="h-4 w-4" /> {tr.poaContactBtn}
              </Link>
              <a
                href="https://wa.me/32472913917"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl border border-border bg-muted text-foreground font-sans text-sm font-medium hover:bg-secondary transition-colors min-h-[48px]"
              >
                <MessageCircle className="h-4 w-4" /> {tr.poaWhatsappBtn}
              </a>
            </div>
          </div>
        </div>
      </section>
      )}

      {/* Policies */}
      <section className="bg-muted">
        <div className="container-wide section-padding">
          <div className="text-center mb-14">
            <h2 className="font-serif text-4xl font-semibold text-foreground">{tr.policiesTitle}</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {tr.policies.map((p, i) => {
              const Icon = policyIcons[i];
              return (
                <div key={p.title} className="bg-card rounded-xl p-6 border border-border hover-lift text-center flex flex-col items-center">
                  <div className="w-12 h-12 rounded-xl bg-sage-light flex items-center justify-center mb-4">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-serif text-lg font-semibold text-foreground mb-2">{p.title}</h3>
                  <p className="font-sans text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Gift Voucher */}
      <section className="bg-terracotta-light">
        <div className="container-wide section-padding py-14">
          <div className="max-w-2xl mx-auto flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
            <div className="w-16 h-16 rounded-2xl bg-terracotta/20 flex items-center justify-center shrink-0">
              <Gift className="h-8 w-8 text-terracotta" />
            </div>
            <div>
              <h2 className="font-serif text-2xl font-semibold text-foreground mb-2">{tr.giftTitle}</h2>
              <p className="font-sans text-sm text-muted-foreground">{tr.giftDesc}</p>
            </div>
            <Link to="/boeken#reservatie" className="shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-terracotta text-accent-foreground font-sans text-sm font-medium hover:opacity-90 transition-opacity min-h-[48px]">
              {tr.giftBtn} <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
