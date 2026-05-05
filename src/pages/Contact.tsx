import { useState } from "react";
import { Phone, Mail, MapPin, MessageCircle, Send } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { SEO, SITE_URL } from "@/components/SEO";
import { ConsentCheckbox } from "@/components/ConsentCheckbox";
import { FIELD_LIMITS, validateField, type Lang } from "@/lib/form-validation";

interface FormData { naam: string; email: string; telefoon: string; bericht: string }
interface FormErrors { naam?: string; email?: string; telefoon?: string; bericht?: string; consent?: string }


const contactHrefs = [
  "tel:+32472240581",
  "https://wa.me/32472913917",
  "mailto:spessiritskine@icloud.com",
  "https://maps.google.com/?q=Cirkellaan+12,+2970+Schilde",
];
const contactValues = ["+32 472 240 581", "+32 472 913 917", "spessiritskine@icloud.com", "Cirkellaan 12, 2970 Schilde"];
const contactIcons = [Phone, MessageCircle, Mail, MapPin];

// Descriptions emphasise the contact CTA so social-shared previews mirror
// what the user is being asked to do on the page.
const seoMeta: Record<string, { title: string; desc: string; breadcrumb: string }> = {
  nl: { title: "Contact — Spessirits Pilates Schilde", desc: "Neem contact op met Spessirits Pilates in Schilde. Bel, WhatsApp of stuur een bericht — wij plannen graag jouw sessie of beantwoorden je vragen.", breadcrumb: "Contact" },
  en: { title: "Contact — Spessirits Pilates Schilde", desc: "Get in touch with Spessirits Pilates in Schilde. Call, WhatsApp or send a message — we'll happily book your session or answer your questions.", breadcrumb: "Contact" },
  fr: { title: "Contact — Spessirits Pilates Schilde", desc: "Contactez Spessirits Pilates à Schilde. Appelez, écrivez sur WhatsApp ou envoyez un message — nous réservons votre séance avec plaisir.", breadcrumb: "Contact" },
  pt: { title: "Contato — Spessirits Pilates Schilde", desc: "Entre em contato com a Spessirits Pilates em Schilde. Ligue, envie WhatsApp ou mensagem — agendamos sua sessão com prazer.", breadcrumb: "Contato" },
};

const OG_IMAGE_ALT: Record<string, string> = {
  nl: "Welkom bij Spessirits Pilates in Schilde — neem contact op",
  en: "Welcome to Spessirits Pilates in Schilde — get in touch",
  fr: "Bienvenue chez Spessirits Pilates à Schilde — contactez-nous",
  pt: "Bem-vindo à Spessirits Pilates em Schilde — entre em contato",
};

const consentErrors: Record<string, string> = {
  nl: "Je moet akkoord gaan met het privacybeleid.",
  en: "You must agree to the privacy policy.",
  fr: "Vous devez accepter la politique de confidentialité.",
  pt: "Você deve concordar com a política de privacidade.",
};

export default function Contact() {
  const { t, lang } = useLanguage();
  const c = t.contact;
  const seo = seoMeta[lang] || seoMeta.nl;

  const [form, setForm] = useState<FormData>({ naam: "", email: "", telefoon: "", bericht: "" });
  const [errors, setErrors] = useState<FormErrors>({});
  const [consent, setConsent] = useState(false);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!form.naam.trim()) newErrors.naam = c.errNaam;
    if (!form.email.trim()) {
      newErrors.email = c.errEmail;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = c.errEmailInvalid;
    }
    if (!form.bericht.trim()) newErrors.bericht = c.errBericht;
    if (!consent) newErrors.consent = consentErrors[lang] || consentErrors.nl;
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    const subject = encodeURIComponent(`Contactformulier – ${form.naam}`);
    const body = encodeURIComponent(
      `Naam: ${form.naam}\nE-mail: ${form.email}${form.telefoon ? `\nTelefoon: ${form.telefoon}` : ""}\n\nBericht:\n${form.bericht}`
    );
    window.location.href = `mailto:spessiritskine@icloud.com?subject=${subject}&body=${body}`;
    setForm({ naam: "", email: "", telefoon: "", bericht: "" });
    setConsent(false);
    setErrors({});
  };

  const handleChange = (field: keyof FormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const inputClass = (error?: string) =>
    `w-full rounded-lg border px-4 py-3 font-sans text-sm bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-shadow ${
      error ? "border-destructive focus:ring-destructive" : "border-border focus:border-primary"
    }`;

  return (
    <main className="pt-24">
      <SEO
        title={seo.title}
        description={seo.desc}
        path="/contact"
        lang={lang}
        image="/og-contact.jpg"
        imageAlt={OG_IMAGE_ALT[lang] || OG_IMAGE_ALT.nl}
        breadcrumbs={[
          { name: "Home", url: SITE_URL },
          { name: seo.breadcrumb, url: `${SITE_URL}/contact` },
        ]}
      />
      {/* Header */}
      <section className="bg-muted">
        <div className="container-wide section-padding py-20 text-center">
          <p className="font-sans text-xs uppercase tracking-widest text-primary mb-4">{c.tag}</p>
          <h1 className="font-serif text-5xl md:text-6xl font-semibold text-foreground mb-5">{c.heroTitle}</h1>
          <p className="font-sans text-lg text-muted-foreground max-w-md mx-auto">{c.heroSub}</p>
        </div>
      </section>

      {/* Split Layout */}
      <section className="bg-card">
        <div className="container-wide section-padding">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20">
            {/* Contact Info */}
            <div>
              <h2 className="font-serif text-3xl font-semibold text-foreground mb-8">{c.infoTitle}</h2>
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

              <div className="rounded-2xl overflow-hidden border border-border bg-muted h-52 flex flex-col items-center justify-center gap-3">
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

            {/* Contact Form */}
            <div>
              <h2 className="font-serif text-3xl font-semibold text-foreground mb-8">{c.formTitle}</h2>
              <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
                <div>
                  <label className="block font-sans text-sm font-medium text-foreground mb-1.5">
                    {c.fieldNaam} <span className="text-destructive">*</span>
                  </label>
                  <input type="text" value={form.naam} onChange={(e) => handleChange("naam", e.target.value)} placeholder={c.fieldNaamPlaceholder} className={inputClass(errors.naam)} />
                  {errors.naam && <p className="mt-1.5 font-sans text-xs text-destructive">{errors.naam}</p>}
                </div>
                <div>
                  <label className="block font-sans text-sm font-medium text-foreground mb-1.5">
                    {c.fieldEmail} <span className="text-destructive">*</span>
                  </label>
                  <input type="email" value={form.email} onChange={(e) => handleChange("email", e.target.value)} placeholder={c.fieldEmailPlaceholder} className={inputClass(errors.email)} />
                  {errors.email && <p className="mt-1.5 font-sans text-xs text-destructive">{errors.email}</p>}
                </div>
                <div>
                  <label className="block font-sans text-sm font-medium text-foreground mb-1.5">
                    {c.fieldTelefoon} <span className="font-normal text-muted-foreground">{c.fieldTelefoonOpt}</span>
                  </label>
                  <input type="tel" value={form.telefoon} onChange={(e) => handleChange("telefoon", e.target.value)} placeholder={c.fieldTelefoonPlaceholder} className={inputClass()} />
                </div>
                <div>
                  <label className="block font-sans text-sm font-medium text-foreground mb-1.5">
                    {c.fieldBericht} <span className="text-destructive">*</span>
                  </label>
                  <textarea rows={5} value={form.bericht} onChange={(e) => handleChange("bericht", e.target.value)} placeholder={c.fieldBerichtPlaceholder} className={inputClass(errors.bericht)} />
                  {errors.bericht && <p className="mt-1.5 font-sans text-xs text-destructive">{errors.bericht}</p>}
                </div>
                <ConsentCheckbox checked={consent} onCheckedChange={(v) => { setConsent(v); if (errors.consent) setErrors(p => ({ ...p, consent: undefined })); }} error={errors.consent} />
                <button type="submit" className="flex items-center justify-center gap-2.5 w-full py-4 rounded-xl bg-accent text-accent-foreground font-sans font-medium text-sm hover:opacity-90 transition-opacity min-h-[52px] mt-2">
                  <Send className="h-4 w-4" />
                  {c.submit}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
