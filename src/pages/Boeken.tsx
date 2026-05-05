import { useState, useEffect } from "react";
import { Send, CalendarClock } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useLocation } from "react-router-dom";
import { SEO, SITE_URL } from "@/components/SEO";
import { ConsentCheckbox } from "@/components/ConsentCheckbox";
import { FIELD_LIMITS, validateField, type Lang } from "@/lib/form-validation";

interface BookingForm {
  naam: string;
  email: string;
  telefoon: string;
  sessieType: string;
  format: string;
  opmerking: string;
}

interface BookingErrors {
  naam?: string;
  email?: string;
  telefoon?: string;
  sessieType?: string;
  format?: string;
  consent?: string;
}

const seoMeta: Record<string, { title: string; desc: string; breadcrumb: string }> = {
  nl: { title: "Boek een Sessie — Spessirits Pilates", desc: "Plan je Pilates sessie bij Spessirits in Schilde. Vul het reservatieformulier in en Cintia neemt snel contact met je op.", breadcrumb: "Boeken" },
  en: { title: "Book a Session — Spessirits Pilates", desc: "Plan your Pilates session at Spessirits in Schilde. Fill in the booking form and Cintia will get back to you.", breadcrumb: "Book" },
  fr: { title: "Réserver une Séance — Spessirits Pilates", desc: "Planifiez votre séance de Pilates chez Spessirits à Schilde. Remplissez le formulaire et Cintia vous recontactera.", breadcrumb: "Réserver" },
  pt: { title: "Agendar uma Sessão — Spessirits Pilates", desc: "Agende a sua sessão de Pilates na Spessirits em Schilde. Preencha o formulário e a Cintia entrará em contato.", breadcrumb: "Agendar" },
};

const consentErrors: Record<string, string> = {
  nl: "Je moet akkoord gaan met het privacybeleid.",
  en: "You must agree to the privacy policy.",
  fr: "Vous devez accepter la politique de confidentialité.",
  pt: "Você deve concordar com a política de privacidade.",
};

export default function Boeken() {
  const { lang } = useLanguage();
  const location = useLocation();
  const seo = seoMeta[lang] || seoMeta.nl;

  // Smooth-scroll to #reservatie whenever the hash changes (or on initial
  // mount with that hash). Polls briefly because the section may not be in
  // the DOM yet on first render after route change.
  useEffect(() => {
    if (location.hash !== "#reservatie") return;
    let attempts = 0;
    let timer: number | undefined;
    const tryScroll = () => {
      const el = document.getElementById("reservatie");
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      } else if (attempts++ < 15) {
        timer = window.setTimeout(tryScroll, 100);
      }
    };
    timer = window.setTimeout(tryScroll, 250);
    return () => { if (timer !== undefined) window.clearTimeout(timer); };
  }, [location.hash]);


  const isNl = lang === "nl";
  const isFr = lang === "fr";
  const isPt = lang === "pt";

  const copy = {
    tag: isPt ? "Agendamento" : isFr ? "Réservation" : isNl ? "Reservatie" : "Booking Request",
    heroTitle: isPt ? "Agendar uma Sessão" : isFr ? "Réserver une séance" : isNl ? "Boek een Sessie" : "Book a Session",
    heroSub: isPt
      ? "Preencha o formulário abaixo e a Cintia entrará em contato para definir uma data e horário."
      : isFr ? "Veuillez remplir le formulaire ci-dessous et Cintia vous contactera pour convenir d'une date et d'un horaire."
      : isNl ? "Vul het formulier in en Cintia neemt contact met je op om een datum en tijdstip vast te leggen."
      : "Fill in the form and Cintia will get back to you to fix a date and time.",
    notice: isPt
      ? "A Cintia entrará em contato o mais breve possível para confirmar uma data e horário que sejam convenientes para você."
      : isFr ? "Cintia vous contactera dans les plus brefs délais pour confirmer ensemble une date et un horaire qui vous conviennent."
      : isNl ? "Cintia neemt zo snel mogelijk contact met je op om samen een datum en tijdstip te bevestigen."
      : "Cintia will get back to you as soon as possible to confirm a date and time that works for you.",
    formTitle: isPt ? "A sua solicitação de agendamento" : isFr ? "Votre demande de réservation" : isNl ? "Jouw Reservatieaanvraag" : "Your Booking Request",
    fieldNaam: isPt ? "Nome" : isFr ? "Nom" : isNl ? "Naam" : "Name",
    fieldNaamPlaceholder: isPt ? "O seu nome" : isFr ? "Votre nom" : isNl ? "Jouw naam" : "Your name",
    fieldEmail: "E-mail",
    fieldEmailPlaceholder: isPt ? "seu@email.com" : isFr ? "votre@email.com" : "jouw@email.com",
    fieldTelefoon: isPt ? "Telefone" : isFr ? "Téléphone" : isNl ? "Telefoon" : "Phone",
    fieldTelefoonPlaceholder: "+32 ...",
    fieldSessie: isPt ? "Tipo de Sessão" : isFr ? "Type de séance" : isNl ? "Type Sessie" : "Session Type",
    fieldSessiePlaceholder: isPt ? "Escolha uma sessão..." : isFr ? "Choisissez une séance..." : isNl ? "Kies een sessie..." : "Choose a session...",
    fieldFormat: isPt ? "Formato" : isFr ? "Format" : isNl ? "Formaat" : "Format",
    fieldFormatPlaceholder: isPt ? "Escolha um formato..." : isFr ? "Choisissez un format..." : isNl ? "Kies een formaat..." : "Choose a format...",
    fieldOpmerking: isPt ? "Observações adicionais" : isFr ? "Remarques supplémentaires" : isNl ? "Extra opmerkingen" : "Additional notes",
    fieldOpmerkingPlaceholder: isPt ? "Ex.: queixas específicas, dias preferidos, dúvidas..."
      : isFr ? "Ex. plaintes spécifiques, jours préférés, questions..."
      : isNl ? "Bijv. specifieke klachten, voorkeursdagen, vragen..."
      : "E.g. specific complaints, preferred days, questions...",
    submit: isPt ? "Enviar Solicitação" : isFr ? "Envoyer la demande" : isNl ? "Stuur Aanvraag" : "Send Request",
    errNaam: isPt ? "O nome é obrigatório." : isFr ? "Le nom est obligatoire." : isNl ? "Naam is verplicht." : "Name is required.",
    errEmail: isPt ? "O e-mail é obrigatório." : isFr ? "L'adresse e-mail est obligatoire." : isNl ? "E-mailadres is verplicht." : "Email is required.",
    errEmailInvalid: isPt ? "É necessário um endereço de e-mail válido." : isFr ? "Une adresse e-mail valide est requise." : isNl ? "Geldig e-mailadres vereist." : "A valid email address is required.",
    errTelefoon: isPt ? "O número de telefone é obrigatório." : isFr ? "Le numéro de téléphone est obligatoire." : isNl ? "Telefoonnummer is verplicht." : "Phone number is required.",
    errSessie: isPt ? "Por favor, escolha um tipo de sessão." : isFr ? "Veuillez choisir un type de séance." : isNl ? "Kies een sessie." : "Please choose a session type.",
    errFormat: isPt ? "Por favor, escolha um formato." : isFr ? "Veuillez choisir un format." : isNl ? "Kies een formaat." : "Please choose a format.",
    sessieOptions: isPt
      ? ["Pilates para Iniciantes", "Atletas & Desempenho", "Gestão da Dor & Queixas", "Reabilitação", "Pré-Natal", "Pós-Natal", "Pilates Avançado"]
      : isFr ? ["Pilates débutants", "Sportifs & Performance", "Gestion de la douleur & plaintes", "Rééducation", "Pré-Natal", "Post-Natal", "Pilates avancé"]
      : isNl ? ["Beginners Pilates", "Sporters & Prestatie", "Pijnbeheer & Klachten", "Revalidatie", "Pre-Nataal", "Post-Nataal", "Gevorderd Pilates"]
      : ["Beginner Pilates", "Athletes & Performance", "Pain Management & Complaints", "Rehabilitation", "Pre-Natal", "Post-Natal", "Advanced Pilates"],
    formatOptions: isPt
      ? ["Individual (um a um com a Cintia)", "Duo (2 pessoas)"]
      : isFr ? ["Individuel (en tête-à-tête avec Cintia)", "Duo (2 personnes)"]
      : isNl ? ["Individueel (1-op-1 met Cintia)", "Duo (2 personen)"]
      : ["Individual (1-on-1 with Cintia)", "Duo (2 people)"],
  };

  const [form, setForm] = useState<BookingForm>({ naam: "", email: "", telefoon: "", sessieType: "", format: "", opmerking: "" });
  const [errors, setErrors] = useState<BookingErrors>({});
  const [consent, setConsent] = useState(false);

  const validate = (): boolean => {
    const e: BookingErrors = {};
    const L = lang as Lang;
    e.naam = validateField({ value: form.naam, max: FIELD_LIMITS.name, lang: L, fieldLabel: copy.fieldNaam, emptyError: copy.errNaam });
    const emailEmpty = !form.email.trim();
    e.email = validateField({ value: form.email, max: FIELD_LIMITS.email, lang: L, fieldLabel: copy.fieldEmail, emptyError: copy.errEmail });
    if (!emailEmpty && !e.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      e.email = copy.errEmailInvalid;
    }
    e.telefoon = validateField({ value: form.telefoon, max: FIELD_LIMITS.phone, lang: L, fieldLabel: copy.fieldTelefoon, emptyError: copy.errTelefoon });
    if (!form.sessieType) e.sessieType = copy.errSessie;
    if (!form.format) e.format = copy.errFormat;
    if (!consent) e.consent = consentErrors[lang] || consentErrors.nl;
    (Object.keys(e) as (keyof BookingErrors)[]).forEach((k) => e[k] === undefined && delete e[k]);
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    const naam = form.naam.trim();
    const email = form.email.trim();
    const telefoon = form.telefoon.trim();
    const opmerking = form.opmerking.trim();
    const subject = encodeURIComponent(`Reservatieaanvraag – ${naam}`);
    const body = encodeURIComponent(
      `Naam: ${naam}\nE-mail: ${email}\nTelefoon: ${telefoon}\nSessie: ${form.sessieType}\nFormaat: ${form.format}${opmerking ? `\n\nOpmerkingen:\n${opmerking}` : ""}`
    );
    window.location.href = `mailto:spessiritskine@icloud.com?subject=${subject}&body=${body}`;

    setForm({ naam: "", email: "", telefoon: "", sessieType: "", format: "", opmerking: "" });
    setConsent(false);
    setErrors({});
  };

  const set = (field: keyof BookingForm, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field as keyof BookingErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const inputCls = (err?: string) =>
    `w-full rounded-lg border px-4 py-3 font-sans text-sm bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-shadow ${
      err ? "border-destructive focus:ring-destructive" : "border-border focus:border-primary"
    }`;

  const selectCls = (err?: string) =>
    `w-full rounded-lg border px-4 py-3 font-sans text-sm bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-shadow appearance-none cursor-pointer ${
      err ? "border-destructive focus:ring-destructive" : "border-border focus:border-primary"
    }`;

  return (
    <main className="pt-24">
      <SEO
        title={seo.title}
        description={seo.desc}
        path="/boeken"
        lang={lang}
        breadcrumbs={[
          { name: "Home", url: SITE_URL },
          { name: seo.breadcrumb, url: `${SITE_URL}/boeken` },
        ]}
      />
      <section className="bg-muted">
        <div className="container-wide section-padding py-20 text-center">
          <p className="font-sans text-xs uppercase tracking-widest text-primary mb-4">{copy.tag}</p>
          <h1 className="font-serif text-5xl md:text-6xl font-semibold text-foreground mb-5">{copy.heroTitle}</h1>
          <p className="font-sans text-lg text-muted-foreground max-w-lg mx-auto leading-relaxed">{copy.heroSub}</p>
        </div>
      </section>

      <section id="reservatie" className="bg-card">
        <div className="container-wide section-padding">
          <div className="max-w-xl mx-auto">
            <div className="flex items-start gap-3 bg-sage-light border border-primary/20 rounded-xl px-5 py-4 mb-8">
              <CalendarClock className="h-5 w-5 text-primary shrink-0 mt-0.5" />
              <p className="font-sans text-sm text-foreground/80 leading-relaxed">{copy.notice}</p>
            </div>

            <h2 className="font-serif text-3xl font-semibold text-foreground mb-8">{copy.formTitle}</h2>

            <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
              <div>
                <label className="block font-sans text-sm font-medium text-foreground mb-1.5">
                  {copy.fieldNaam} <span className="text-destructive">*</span>
                </label>
                <input type="text" value={form.naam} onChange={(e) => set("naam", e.target.value)} placeholder={copy.fieldNaamPlaceholder} maxLength={FIELD_LIMITS.name} autoComplete="name" className={inputCls(errors.naam)} />
                {errors.naam && <p className="mt-1.5 font-sans text-xs text-destructive">{errors.naam}</p>}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-sans text-sm font-medium text-foreground mb-1.5">
                    {copy.fieldEmail} <span className="text-destructive">*</span>
                  </label>
                  <input type="email" value={form.email} onChange={(e) => set("email", e.target.value)} placeholder={copy.fieldEmailPlaceholder} maxLength={FIELD_LIMITS.email} autoComplete="email" className={inputCls(errors.email)} />
                  {errors.email && <p className="mt-1.5 font-sans text-xs text-destructive">{errors.email}</p>}
                </div>
                <div>
                  <label className="block font-sans text-sm font-medium text-foreground mb-1.5">
                    {copy.fieldTelefoon} <span className="text-destructive">*</span>
                  </label>
                  <input type="tel" value={form.telefoon} onChange={(e) => set("telefoon", e.target.value)} placeholder={copy.fieldTelefoonPlaceholder} maxLength={FIELD_LIMITS.phone} autoComplete="tel" className={inputCls(errors.telefoon)} />
                  {errors.telefoon && <p className="mt-1.5 font-sans text-xs text-destructive">{errors.telefoon}</p>}
                </div>
              </div>

              <div>
                <label className="block font-sans text-sm font-medium text-foreground mb-1.5">
                  {copy.fieldSessie} <span className="text-destructive">*</span>
                </label>
                <div className="relative">
                  <select value={form.sessieType} onChange={(e) => set("sessieType", e.target.value)} className={selectCls(errors.sessieType)}>
                    <option value="" disabled>{copy.fieldSessiePlaceholder}</option>
                    {copy.sessieOptions.map((opt) => (<option key={opt} value={opt}>{opt}</option>))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                    <svg className="h-4 w-4 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                  </div>
                </div>
                {errors.sessieType && <p className="mt-1.5 font-sans text-xs text-destructive">{errors.sessieType}</p>}
              </div>

              <div>
                <label className="block font-sans text-sm font-medium text-foreground mb-1.5">
                  {copy.fieldFormat} <span className="text-destructive">*</span>
                </label>
                <div className="relative">
                  <select value={form.format} onChange={(e) => set("format", e.target.value)} className={selectCls(errors.format)}>
                    <option value="" disabled>{copy.fieldFormatPlaceholder}</option>
                    {copy.formatOptions.map((opt) => (<option key={opt} value={opt}>{opt}</option>))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                    <svg className="h-4 w-4 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                  </div>
                </div>
                {errors.format && <p className="mt-1.5 font-sans text-xs text-destructive">{errors.format}</p>}
              </div>

              <div>
                <label className="block font-sans text-sm font-medium text-foreground mb-1.5">
                  {copy.fieldOpmerking}{" "}
                  <span className="font-normal text-muted-foreground">({isPt ? "opcional" : isFr ? "optionnel" : isNl ? "optioneel" : "optional"})</span>
                </label>
                <textarea rows={4} value={form.opmerking} onChange={(e) => set("opmerking", e.target.value)} placeholder={copy.fieldOpmerkingPlaceholder} maxLength={FIELD_LIMITS.notes} className={inputCls()} />
              </div>

              <ConsentCheckbox checked={consent} onCheckedChange={(v) => { setConsent(v); if (errors.consent) setErrors(p => ({ ...p, consent: undefined })); }} error={errors.consent} />

              <button type="submit" className="flex items-center justify-center gap-2.5 w-full py-4 rounded-xl bg-accent text-accent-foreground font-sans font-medium text-sm hover:opacity-90 transition-opacity min-h-[52px] mt-2">
                <Send className="h-4 w-4" />
                {copy.submit}
              </button>

              <p className="text-center font-sans text-xs text-muted-foreground">
                <span className="text-destructive">*</span> {isPt ? "Campos obrigatórios" : isFr ? "Champs obligatoires" : isNl ? "Verplichte velden" : "Required fields"}
              </p>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
