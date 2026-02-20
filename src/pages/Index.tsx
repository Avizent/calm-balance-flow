import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import {
  ArrowRight, CheckCircle, Clock, Ban, CreditCard, Calendar, Gift,
  Phone, Mail, MapPin, MessageCircle, Send,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/hooks/use-toast";

/* ─── Images ─────────────────────────────────────────────────── */
const heroImage = "https://static.wixstatic.com/media/f76b6d_739a2569d5054e4fa82dfe477b6a5492~mv2.jpeg/v1/fill/w_1013,h_1033,al_t,q_85,enc_avif,quality_auto/f76b6d_739a2569d5054e4fa82dfe477b6a5492~mv2.jpeg";
const heroBg   = "https://static.wixstatic.com/media/f76b6d_b20d70f0cd8c423bad5e52f8629d5825~mv2.jpg/v1/fill/w_491,h_795,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/f76b6d_b20d70f0cd8c423bad5e52f8629d5825~mv2.jpg";
const priveImg = "https://static.wixstatic.com/media/f76b6d_cfe6e12cc64048e4b43a09851d0906d0~mv2.jpg/v1/fill/w_501,h_640,al_c,q_80,enc_avif,quality_auto/f76b6d_cfe6e12cc64048e4b43a09851d0906d0~mv2.jpg";

/* ─── Pricing data (numbers don't translate) ──────────────────── */
const pricingData = [
  { exclBTW: { ind: "€77",  duo: "€90"  }, inclBTW: { ind: "€93,17",  duo: "€108,90" }, popular: false },
  { exclBTW: { ind: "€370", duo: "€440" }, inclBTW: { ind: "€447,70", duo: "€532,40" }, popular: true  },
  { exclBTW: { ind: "€670", duo: "€790" }, inclBTW: { ind: "€810,70", duo: "€955,90" }, popular: false },
];
const policyIcons = [Clock, Ban, CreditCard, Calendar];
const contactIcons  = [Phone, MessageCircle, Mail, MapPin];
const contactHrefs  = [
  "tel:+32472240581",
  "https://wa.me/32472913917",
  "mailto:spessiritskine@icloud.com",
  "https://maps.google.com/?q=Cirkellaan+12,+2970+Schilde",
];
const contactValues = ["+32 472 240 581", "+32 472 913 917", "spessiritskine@icloud.com", "Cirkellaan 12, 2970 Schilde"];

/* ─── Form types ─────────────────────────────────────────────── */
interface FormData   { naam: string; email: string; telefoon: string; bericht: string }
interface FormErrors { naam?: string; email?: string; bericht?: string }

/* ═══════════════════════════════════════════════════════════════ */
export default function Index() {
  const { t, lang } = useLanguage();
  const { toast }   = useToast();
  const location    = useLocation();
  const navigate    = useNavigate();

  /* Scroll to section if navigated here with state */
  useEffect(() => {
    const state = location.state as { scrollTo?: string } | null;
    if (!state?.scrollTo) return;
    const id = state.scrollTo;
    // Clear state so this doesn't re-fire; use window.history directly to avoid re-render race
    window.history.replaceState(null, "", "/");
    let attempts = 0;
    const tryScroll = () => {
      const el = document.getElementById(id);
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: "smooth", block: "start" }), 50);
      } else if (attempts++ < 20) {
        setTimeout(tryScroll, 100);
      }
    };
    // Wait for homepage to fully render before first attempt
    setTimeout(tryScroll, 300);
  }, [location.state]); // eslint-disable-line react-hooks/exhaustive-deps

  /* Contact form state */
  const [form, setForm]         = useState<FormData>({ naam: "", email: "", telefoon: "", bericht: "" });
  const [errors, setErrors]     = useState<FormErrors>({});
  const [submitting, setSubmit] = useState(false);

  const validate = (): boolean => {
    const e: FormErrors = {};
    if (!form.naam.trim())  e.naam  = t.contact.errNaam;
    if (!form.email.trim()) e.email = t.contact.errEmail;
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = t.contact.errEmailInvalid;
    if (!form.bericht.trim()) e.bericht = t.contact.errBericht;
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmit(true);
    await new Promise(r => setTimeout(r, 1200));
    setSubmit(false);
    setForm({ naam: "", email: "", telefoon: "", bericht: "" });
    setErrors({});
    toast({ title: t.contact.toastTitle, description: t.contact.toastDesc });
  };

  const handleChange = (field: keyof FormData, value: string) => {
    setForm(p => ({ ...p, [field]: value }));
    if (errors[field as keyof FormErrors]) setErrors(p => ({ ...p, [field]: undefined }));
  };

  const inputCls = (err?: string) =>
    `w-full rounded-lg border px-4 py-3 font-sans text-sm bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-shadow ${
      err ? "border-destructive focus:ring-destructive" : "border-border"
    }`;

  const h  = t.home;
  const o  = t.over;
  const l  = t.lessen;
  const p  = t.prive;
  const tr = t.tarieven;
  const c  = t.contact;

  return (
    <main>

      {/* ══════════ HERO ══════════ */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={heroBg} alt="Pilates movement" className="w-full h-full object-cover object-center" loading="eager" />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 via-foreground/50 to-foreground/10" />
        </div>
        <div className="relative z-10 container-wide section-padding py-40 flex flex-col justify-center max-w-3xl">
          <p className="font-sans text-sm uppercase tracking-[0.2em] text-primary-foreground/70 mb-5 animate-fade-in">{h.heroTag}</p>
          <h1 className="font-serif text-5xl md:text-7xl font-semibold text-primary-foreground mb-6 leading-tight animate-fade-in [animation-delay:0.1s]">
            {h.heroTitle}<br /><em>{h.heroTitleEm}</em>
          </h1>
          <p className="font-sans text-lg text-primary-foreground/80 mb-10 max-w-lg leading-relaxed animate-fade-in [animation-delay:0.2s]">
            {h.heroSub}
          </p>
          <div className="flex flex-wrap gap-4 animate-fade-in [animation-delay:0.3s]">
            <Link to="/boeken" className="inline-flex items-center gap-2 px-7 py-4 rounded-lg bg-accent text-accent-foreground font-sans font-medium text-sm hover:opacity-90 transition-opacity min-h-[48px]">
              {h.heroCta} <ArrowRight className="h-4 w-4" />
            </Link>
            <a href="#lessen" className="inline-flex items-center gap-2 px-7 py-4 rounded-lg border border-primary-foreground/30 text-primary-foreground font-sans text-sm hover:bg-primary-foreground/10 transition-colors min-h-[48px]">
              {lang === "en" ? "Classes" : "Lessen"} <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      {/* ══════════ ABOUT TEASER (not a full section — just the strip) ══════════ */}
      <section className="bg-card">
        <div className="container-wide section-padding">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="relative">
              <img src={heroImage} alt="Cintia, Pilatesdocent" className="w-full max-w-md mx-auto lg:mx-0 rounded-2xl object-cover shadow-xl aspect-[3/4]" loading="lazy" />
              <div className="absolute -bottom-5 -right-5 bg-sage text-primary-foreground rounded-xl px-5 py-4 shadow-lg hidden md:block">
                <p className="font-serif text-2xl font-semibold">20+</p>
                <p className="font-sans text-xs text-primary-foreground/80">{lang === "en" ? "years experience" : "jaar ervaring"}</p>
              </div>
            </div>
            <div>
              <p className="font-sans text-xs uppercase tracking-widest text-primary mb-3">{h.aboutTag}</p>
              <h2 className="font-serif text-4xl md:text-5xl font-semibold text-foreground mb-6">{h.aboutTitle}</h2>
              <p className="font-sans text-base text-muted-foreground mb-4 leading-relaxed">{h.aboutP1}</p>
              <p className="font-sans text-base text-muted-foreground mb-8 leading-relaxed">{h.aboutP2}</p>
              <Link to="/over" className="inline-flex items-center gap-2 text-primary font-sans font-medium text-sm hover:gap-3 transition-all">
                {h.aboutLink} <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ LESSEN ══════════ */}
      <section id="lessen" className="bg-muted scroll-mt-20">
        <div className="container-wide section-padding">
          <div className="text-center mb-14">
            <p className="font-sans text-xs uppercase tracking-widest text-primary mb-4">{l.tag}</p>
            <h2 className="font-serif text-4xl md:text-5xl font-semibold text-foreground mb-4 max-w-xl mx-auto leading-tight">
              {l.heroTitle} <em>{l.heroTitleEm}</em>
            </h2>
            <p className="font-sans text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">{l.heroSub}</p>
          </div>

          {/* Audience cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {l.audiences.map((a) => (
              <div key={a.title} className="bg-card rounded-xl p-7 hover-lift border border-border flex flex-col">
                <span className="text-4xl mb-4">{a.icon}</span>
                <h3 className="font-serif text-xl font-semibold text-foreground mb-3">{a.title}</h3>
                <p className="font-sans text-sm text-muted-foreground leading-relaxed flex-1">{a.desc}</p>
                <Link to="/boeken" className="mt-5 inline-flex items-center gap-1.5 text-primary font-sans text-sm font-medium hover:gap-2.5 transition-all">
                  {l.bookNow} <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            ))}
          </div>

          {/* Equipment */}
          <div className="text-center mb-10">
            <p className="font-sans text-xs uppercase tracking-widest text-primary mb-4">{l.equipmentTag}</p>
            <h3 className="font-serif text-3xl font-semibold text-foreground mb-3">{l.equipmentTitle}</h3>
            <p className="font-sans text-muted-foreground max-w-2xl mx-auto leading-relaxed">{l.equipmentSub}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {l.equipment.map((item, i) => (
              <div key={item.name} className="bg-card rounded-xl p-6 border border-border panel-hover flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-sage-light text-primary flex items-center justify-center text-sm font-serif font-semibold shrink-0">{i + 1}</span>
                  <h4 className="font-serif text-base font-semibold text-foreground">{item.name}</h4>
                </div>
                <p className="font-sans text-sm text-muted-foreground leading-relaxed">{item.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ PRIVÉ SESSIES ══════════ */}
      <section id="prive" className="scroll-mt-20">
        {/* Full-width cinematic banner */}
        <div className="relative h-72 md:h-96 overflow-hidden">
          <img src={priveImg} alt="Pilates sessie" className="w-full h-full object-cover object-center" loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/85 to-foreground/30 flex items-center">
            <div className="container-wide section-padding py-0">
              <p className="font-sans text-xs uppercase tracking-widest text-primary-foreground/70 mb-3">{p.tag}</p>
              <h2 className="font-serif text-4xl md:text-5xl font-semibold text-primary-foreground leading-tight">
                {p.heroTitle}<br /><em>{p.heroTitleEm}</em>
              </h2>
            </div>
          </div>
        </div>

        <div className="bg-card">
          <div className="container-wide section-padding">
            {/* Intro */}
            <div className="max-w-3xl mx-auto text-center mb-14">
              <p className="font-sans text-xs uppercase tracking-widest text-primary mb-4">{p.approachTag}</p>
              <p className="font-sans text-base text-muted-foreground leading-relaxed mb-4">{p.approachP1}</p>
              <p className="font-sans text-base text-muted-foreground leading-relaxed">{p.approachP2}</p>
            </div>

            {/* Format cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* Individual */}
              <div className="bg-muted rounded-2xl p-8 border border-border hover-lift">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-sage-light flex items-center justify-center text-2xl">👤</div>
                  <div>
                    <h3 className="font-serif text-2xl font-semibold text-foreground">{p.individualTitle}</h3>
                    <p className="font-sans text-sm text-muted-foreground">{p.individualSub}</p>
                  </div>
                </div>
                <ul className="space-y-3">
                  {p.individualBenefits.map(b => (
                    <li key={b} className="flex items-start gap-3">
                      <CheckCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                      <span className="font-sans text-sm text-muted-foreground">{b}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Duo */}
              <div className="bg-sage rounded-2xl p-8 hover-lift">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-primary-foreground/20 flex items-center justify-center text-2xl">👥</div>
                  <div>
                    <h3 className="font-serif text-2xl font-semibold text-primary-foreground">{p.duoTitle}</h3>
                    <p className="font-sans text-sm text-primary-foreground/70">{p.duoSub}</p>
                  </div>
                </div>
                <ul className="space-y-3">
                  {p.duoBenefits.map(b => (
                    <li key={b} className="flex items-start gap-3">
                      <CheckCircle className="h-4 w-4 text-primary-foreground/70 shrink-0 mt-0.5" />
                      <span className="font-sans text-sm text-primary-foreground/80">{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ TARIEVEN ══════════ */}
      <section id="tarieven" className="bg-muted scroll-mt-20">
        <div className="container-wide section-padding">
          <div className="text-center mb-14">
            <p className="font-sans text-xs uppercase tracking-widest text-primary mb-4">{tr.tag}</p>
            <h2 className="font-serif text-4xl md:text-5xl font-semibold text-foreground mb-4">{tr.heroTitle}</h2>
            <p className="font-sans text-lg text-muted-foreground max-w-md mx-auto">{tr.heroSub}</p>
          </div>

          {/* Pricing cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-6">
            {pricingData.map((data, i) => (
              <div
                key={i}
                className={`rounded-2xl border p-8 flex flex-col hover-lift relative ${
                  data.popular ? "bg-sage border-transparent shadow-xl" : "bg-card border-border shadow-sm"
                }`}
              >
                {data.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span className="bg-terracotta text-accent-foreground font-sans text-xs font-semibold px-4 py-1.5 rounded-full uppercase tracking-wide">
                      {tr.popular}
                    </span>
                  </div>
                )}
                <h3 className={`font-serif text-2xl font-semibold mb-8 ${data.popular ? "text-primary-foreground" : "text-foreground"}`}>
                  {tr.tiers[i].label}
                </h3>
                <div className={`mb-5 pb-5 border-b ${data.popular ? "border-primary-foreground/20" : "border-border"}`}>
                  <p className={`font-sans text-xs uppercase tracking-wider mb-2 ${data.popular ? "text-primary-foreground/60" : "text-muted-foreground"}`}>
                    👤 {tr.individueel}
                  </p>
                  <p className={`font-serif text-3xl font-semibold ${data.popular ? "text-primary-foreground" : "text-foreground"}`}>{data.exclBTW.ind}</p>
                  <p className={`font-sans text-sm mt-1 ${data.popular ? "text-primary-foreground/60" : "text-muted-foreground"}`}>
                    {tr.exclLabel} · {data.inclBTW.ind} incl.
                  </p>
                </div>
                <div className="mb-8">
                  <p className={`font-sans text-xs uppercase tracking-wider mb-2 ${data.popular ? "text-primary-foreground/60" : "text-muted-foreground"}`}>
                    👥 {tr.duo}
                  </p>
                  <p className={`font-serif text-3xl font-semibold ${data.popular ? "text-primary-foreground" : "text-foreground"}`}>{data.exclBTW.duo}</p>
                  <p className={`font-sans text-sm mt-1 ${data.popular ? "text-primary-foreground/60" : "text-muted-foreground"}`}>
                    {tr.exclLabel} · {data.inclBTW.duo} incl.
                  </p>
                </div>
                <div className="mt-auto">
                  <Link
                    to="/boeken"
                    className={`flex items-center justify-center gap-2 w-full py-3.5 rounded-xl font-sans text-sm font-medium min-h-[48px] transition-all ${
                      data.popular
                        ? "bg-primary-foreground text-foreground hover:bg-primary-foreground/90"
                        : "bg-muted text-foreground hover:bg-secondary border border-border"
                    }`}
                  >
                    {tr.bookNow} <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <p className="text-center font-sans text-xs text-muted-foreground mb-14">{tr.pricingNote}</p>

          {/* Policies */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {tr.policies.map((pol, i) => {
              const Icon = policyIcons[i];
              return (
                <div key={pol.title} className="bg-card rounded-xl p-6 border border-border hover-lift text-center flex flex-col items-center">
                  <div className="w-12 h-12 rounded-xl bg-sage-light flex items-center justify-center mb-4">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <h4 className="font-serif text-lg font-semibold text-foreground mb-2">{pol.title}</h4>
                  <p className="font-sans text-sm text-muted-foreground leading-relaxed">{pol.desc}</p>
                </div>
              );
            })}
          </div>

          {/* Gift voucher */}
          <div className="bg-terracotta-light rounded-2xl p-8 max-w-3xl mx-auto flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
            <div className="w-14 h-14 rounded-2xl bg-terracotta/20 flex items-center justify-center shrink-0">
              <Gift className="h-7 w-7 text-terracotta" />
            </div>
            <div className="flex-1">
              <h4 className="font-serif text-xl font-semibold text-foreground mb-2">{tr.giftTitle}</h4>
              <p className="font-sans text-sm text-muted-foreground">{tr.giftDesc}</p>
            </div>
            <Link to="/boeken" className="shrink-0 inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-terracotta text-accent-foreground font-sans text-sm font-medium hover:opacity-90 transition-opacity min-h-[48px]">
              {tr.giftBtn} <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════ CONTACT ══════════ */}
      <section id="contact" className="bg-card scroll-mt-20">
        <div className="container-wide section-padding">
          <div className="text-center mb-14">
            <p className="font-sans text-xs uppercase tracking-widest text-primary mb-4">{c.tag}</p>
            <h2 className="font-serif text-4xl md:text-5xl font-semibold text-foreground mb-4">{c.heroTitle}</h2>
            <p className="font-sans text-lg text-muted-foreground max-w-md mx-auto">{c.heroSub}</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20">
            {/* Contact info */}
            <div>
              <h3 className="font-serif text-2xl font-semibold text-foreground mb-8">{c.infoTitle}</h3>
              <div className="flex flex-col gap-5 mb-10">
                {c.contactItems.map((item, i) => {
                  const Icon = contactIcons[i];
                  return (
                    <a key={item.label} href={contactHrefs[i]} target={i >= 1 ? "_blank" : undefined} rel="noopener noreferrer" className="flex items-start gap-4 group">
                      <div className="w-11 h-11 rounded-xl bg-sage-light flex items-center justify-center shrink-0 group-hover:bg-sage transition-colors">
                        <Icon className="h-5 w-5 text-primary group-hover:text-primary-foreground transition-colors" />
                      </div>
                      <div>
                        <p className="font-sans text-xs uppercase tracking-wider text-muted-foreground mb-0.5">{item.label}</p>
                        <p className="font-sans text-base text-foreground group-hover:text-primary transition-colors">{contactValues[i]}</p>
                      </div>
                    </a>
                  );
                })}
              </div>

              {/* Map card */}
              <div className="rounded-2xl border border-border bg-muted h-52 flex flex-col items-center justify-center gap-3">
                <MapPin className="h-8 w-8 text-primary" />
                <div className="text-center">
                  <p className="font-serif text-lg font-semibold text-foreground">Spessirits Pilates</p>
                  <p className="font-sans text-sm text-muted-foreground">Cirkellaan 12, 2970 Schilde</p>
                  <a href="https://maps.google.com/?q=Cirkellaan+12,+2970+Schilde" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 mt-2 text-primary font-sans text-sm font-medium hover:underline">
                    {c.mapOpen}
                  </a>
                </div>
              </div>
            </div>

            {/* Contact form */}
            <div>
              <h3 className="font-serif text-2xl font-semibold text-foreground mb-8">{c.formTitle}</h3>
              <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
                <div>
                  <label className="block font-sans text-sm font-medium text-foreground mb-1.5">
                    {c.fieldNaam} <span className="text-destructive">*</span>
                  </label>
                  <input type="text" value={form.naam} onChange={e => handleChange("naam", e.target.value)} placeholder={c.fieldNaamPlaceholder} className={inputCls(errors.naam)} />
                  {errors.naam && <p className="mt-1.5 font-sans text-xs text-destructive">{errors.naam}</p>}
                </div>
                <div>
                  <label className="block font-sans text-sm font-medium text-foreground mb-1.5">
                    {c.fieldEmail} <span className="text-destructive">*</span>
                  </label>
                  <input type="email" value={form.email} onChange={e => handleChange("email", e.target.value)} placeholder={c.fieldEmailPlaceholder} className={inputCls(errors.email)} />
                  {errors.email && <p className="mt-1.5 font-sans text-xs text-destructive">{errors.email}</p>}
                </div>
                <div>
                  <label className="block font-sans text-sm font-medium text-foreground mb-1.5">
                    {c.fieldTelefoon} <span className="font-normal text-muted-foreground">{c.fieldTelefoonOpt}</span>
                  </label>
                  <input type="tel" value={form.telefoon} onChange={e => handleChange("telefoon", e.target.value)} placeholder={c.fieldTelefoonPlaceholder} className={inputCls()} />
                </div>
                <div>
                  <label className="block font-sans text-sm font-medium text-foreground mb-1.5">
                    {c.fieldBericht} <span className="text-destructive">*</span>
                  </label>
                  <textarea rows={5} value={form.bericht} onChange={e => handleChange("bericht", e.target.value)} placeholder={c.fieldBerichtPlaceholder} className={inputCls(errors.bericht)} />
                  {errors.bericht && <p className="mt-1.5 font-sans text-xs text-destructive">{errors.bericht}</p>}
                </div>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex items-center justify-center gap-2.5 w-full py-4 rounded-xl bg-accent text-accent-foreground font-sans font-medium text-sm hover:opacity-90 transition-opacity disabled:opacity-60 min-h-[52px] mt-2"
                >
                  {submitting ? (
                    <><span className="animate-spin inline-block w-4 h-4 border-2 border-accent-foreground border-t-transparent rounded-full" />{c.submitting}</>
                  ) : (
                    <><Send className="h-4 w-4" />{c.submit}</>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
