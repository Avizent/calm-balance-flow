import { Link } from "react-router-dom";
import { ArrowRight, Clock, Ban, CreditCard, Calendar, Gift } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const pricingData = [
  {
    exclBTW: { individueel: "€77", duo: "€90" },
    inclBTW: { individueel: "€93,17", duo: "€108,90" },
    popular: false,
  },
  {
    exclBTW: { individueel: "€370", duo: "€440" },
    inclBTW: { individueel: "€447,70", duo: "€532,40" },
    popular: true,
  },
  {
    exclBTW: { individueel: "€670", duo: "€790" },
    inclBTW: { individueel: "€810,70", duo: "€955,90" },
    popular: false,
  },
];

const policyIcons = [Clock, Ban, CreditCard, Calendar];

export default function Tarieven() {
  const { t } = useLanguage();
  const tr = t.tarieven;

  return (
    <main className="pt-24">
      {/* Header */}
      <section className="bg-muted">
        <div className="container-wide section-padding py-20 text-center">
          <p className="font-sans text-xs uppercase tracking-widest text-primary mb-4">{tr.tag}</p>
          <h1 className="font-serif text-5xl md:text-6xl font-semibold text-foreground mb-5">{tr.heroTitle}</h1>
          <p className="font-sans text-lg text-muted-foreground max-w-md mx-auto">{tr.heroSub}</p>
        </div>
      </section>

      {/* Pricing Table */}
      <section className="bg-card">
        <div className="container-wide section-padding">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {pricingData.map((data, i) => {
              const tier = tr.tiers[i];
              return (
                <div
                  key={i}
                  className={`rounded-2xl border p-8 flex flex-col hover-lift relative ${
                    data.popular
                      ? "bg-sage border-transparent shadow-xl"
                      : "bg-card border-border shadow-sm"
                  }`}
                >
                  {data.popular && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                      <span className="bg-terracotta text-accent-foreground font-sans text-xs font-semibold px-4 py-1.5 rounded-full uppercase tracking-wide">
                        {tr.popular}
                      </span>
                    </div>
                  )}

                  <h2
                    className={`font-serif text-2xl font-semibold mb-8 ${
                      data.popular ? "text-primary-foreground" : "text-foreground"
                    }`}
                  >
                    {tier.label}
                  </h2>

                  {/* Individueel */}
                  <div className={`mb-5 pb-5 border-b ${data.popular ? "border-primary-foreground/20" : "border-border"}`}>
                    <p className={`font-sans text-xs uppercase tracking-wider mb-2 ${data.popular ? "text-primary-foreground/60" : "text-muted-foreground"}`}>
                      👤 {tr.individueel}
                    </p>
                    <p className={`font-serif text-3xl font-semibold ${data.popular ? "text-primary-foreground" : "text-foreground"}`}>
                      {data.exclBTW.individueel}
                    </p>
                    <p className={`font-sans text-sm mt-1 ${data.popular ? "text-primary-foreground/60" : "text-muted-foreground"}`}>
                      {tr.exclLabel} · {data.inclBTW.individueel} incl.
                    </p>
                  </div>

                  {/* Duo */}
                  <div className="mb-8">
                    <p className={`font-sans text-xs uppercase tracking-wider mb-2 ${data.popular ? "text-primary-foreground/60" : "text-muted-foreground"}`}>
                      👥 {tr.duo}
                    </p>
                    <p className={`font-serif text-3xl font-semibold ${data.popular ? "text-primary-foreground" : "text-foreground"}`}>
                      {data.exclBTW.duo}
                    </p>
                    <p className={`font-sans text-sm mt-1 ${data.popular ? "text-primary-foreground/60" : "text-muted-foreground"}`}>
                      {tr.exclLabel} · {data.inclBTW.duo} incl.
                    </p>
                  </div>

                  <div className="mt-auto">
                    <Link
                      to="/boeken"
                      className={`flex items-center justify-center gap-2 w-full py-3.5 rounded-xl font-sans text-sm font-medium transition-all min-h-[48px] ${
                        data.popular
                          ? "bg-primary-foreground text-foreground hover:bg-primary-foreground/90"
                          : "bg-muted text-foreground hover:bg-secondary border border-border"
                      }`}
                    >
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
            <Link
              to="/boeken"
              className="shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-terracotta text-accent-foreground font-sans text-sm font-medium hover:opacity-90 transition-opacity min-h-[48px]"
            >
              {tr.giftBtn} <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
