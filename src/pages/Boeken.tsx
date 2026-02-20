import { useState, useEffect } from "react";
import { Send, CalendarClock } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useLocation } from "react-router-dom";

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
}

export default function Boeken() {
  const { lang } = useLanguage();
  const location = useLocation();

  /* Scroll to form if navigated with #reservatie hash */
  useEffect(() => {
    if (location.hash === "#reservatie") {
      let attempts = 0;
      const tryScroll = () => {
        const el = document.getElementById("reservatie");
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        } else if (attempts++ < 10) {
          setTimeout(tryScroll, 80);
        }
      };
      setTimeout(tryScroll, 100);
    }
  }, [location.hash]);

  const isNl = lang === "nl";

  const copy = {
    tag: isNl ? "Reservatie" : "Booking Request",
    heroTitle: isNl ? "Boek een Sessie" : "Book a Session",
    heroSub: isNl
      ? "Vul het formulier in en Cintia neemt contact met je op om een datum en tijdstip vast te leggen."
      : "Fill in the form and Cintia will get back to you to fix a date and time.",
    notice: isNl
      ? "Cintia neemt zo snel mogelijk contact met je op om samen een datum en tijdstip te bevestigen."
      : "Cintia will get back to you as soon as possible to confirm a date and time that works for you.",
    formTitle: isNl ? "Jouw Reservatieaanvraag" : "Your Booking Request",
    fieldNaam: isNl ? "Naam" : "Name",
    fieldNaamPlaceholder: isNl ? "Jouw naam" : "Your name",
    fieldEmail: isNl ? "E-mail" : "Email",
    fieldEmailPlaceholder: "jouw@email.com",
    fieldTelefoon: isNl ? "Telefoon" : "Phone",
    fieldTelefoonPlaceholder: "+32 ...",
    fieldSessie: isNl ? "Type Sessie" : "Session Type",
    fieldSessiePlaceholder: isNl ? "Kies een sessie..." : "Choose a session...",
    fieldFormat: isNl ? "Formaat" : "Format",
    fieldFormatPlaceholder: isNl ? "Kies een formaat..." : "Choose a format...",
    fieldOpmerking: isNl ? "Extra opmerkingen" : "Additional notes",
    fieldOpmerkingPlaceholder: isNl
      ? "Bijv. specifieke klachten, voorkeursdagen, vragen..."
      : "E.g. specific complaints, preferred days, questions...",
    submit: isNl ? "Stuur Aanvraag" : "Send Request",
    submitting: isNl ? "Versturen..." : "Sending...",
    toastTitle: isNl ? "Aanvraag verzonden! 🌿" : "Request sent! 🌿",
    toastDesc: isNl
      ? "Cintia neemt zo snel mogelijk contact met je op om een datum te bevestigen."
      : "Cintia will get back to you as soon as possible to confirm a date.",
    errNaam: isNl ? "Naam is verplicht." : "Name is required.",
    errEmail: isNl ? "E-mailadres is verplicht." : "Email is required.",
    errEmailInvalid: isNl ? "Geldig e-mailadres vereist." : "A valid email address is required.",
    errTelefoon: isNl ? "Telefoonnummer is verplicht." : "Phone number is required.",
    errSessie: isNl ? "Kies een sessie." : "Please choose a session type.",
    errFormat: isNl ? "Kies een formaat." : "Please choose a format.",
    sessieOptions: isNl
      ? [
          "Beginners Pilates",
          "Sporters & Prestatie",
          "Pijnbeheer & Klachten",
          "Revalidatie",
          "Pre-Nataal",
          "Post-Nataal",
          "Gevorderd Pilates",
        ]
      : [
          "Beginner Pilates",
          "Athletes & Performance",
          "Pain Management & Complaints",
          "Rehabilitation",
          "Pre-Natal",
          "Post-Natal",
          "Advanced Pilates",
        ],
    formatOptions: isNl
      ? ["Individueel (1-op-1 met Cintia)", "Duo (2 personen)"]
      : ["Individual (1-on-1 with Cintia)", "Duo (2 people)"],
  };

  const [form, setForm] = useState<BookingForm>({
    naam: "",
    email: "",
    telefoon: "",
    sessieType: "",
    format: "",
    opmerking: "",
  });
  const [errors, setErrors] = useState<BookingErrors>({});

  const validate = (): boolean => {
    const e: BookingErrors = {};
    if (!form.naam.trim()) e.naam = copy.errNaam;
    if (!form.email.trim()) {
      e.email = copy.errEmail;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      e.email = copy.errEmailInvalid;
    }
    if (!form.telefoon.trim()) e.telefoon = copy.errTelefoon;
    if (!form.sessieType) e.sessieType = copy.errSessie;
    if (!form.format) e.format = copy.errFormat;
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    const subject = encodeURIComponent(`Reservatieaanvraag – ${form.naam}`);
    const body = encodeURIComponent(
      `Naam: ${form.naam}\nE-mail: ${form.email}\nTelefoon: ${form.telefoon}\nSessie: ${form.sessieType}\nFormaat: ${form.format}${form.opmerking ? `\n\nOpmerkingen:\n${form.opmerking}` : ""}`
    );
    window.location.href = `mailto:spessiritskine@icloud.com?subject=${subject}&body=${body}`;
    setForm({ naam: "", email: "", telefoon: "", sessieType: "", format: "", opmerking: "" });
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
      {/* Header */}
      <section className="bg-muted">
        <div className="container-wide section-padding py-20 text-center">
          <p className="font-sans text-xs uppercase tracking-widest text-primary mb-4">{copy.tag}</p>
          <h1 className="font-serif text-5xl md:text-6xl font-semibold text-foreground mb-5">{copy.heroTitle}</h1>
          <p className="font-sans text-lg text-muted-foreground max-w-lg mx-auto leading-relaxed">{copy.heroSub}</p>
        </div>
      </section>

      {/* Form section */}
      <section id="reservatie" className="bg-card">
        <div className="container-wide section-padding">
          <div className="max-w-xl mx-auto">

            {/* Notice banner */}
            <div className="flex items-start gap-3 bg-sage-light border border-primary/20 rounded-xl px-5 py-4 mb-8">
              <CalendarClock className="h-5 w-5 text-primary shrink-0 mt-0.5" />
              <p className="font-sans text-sm text-foreground/80 leading-relaxed">{copy.notice}</p>
            </div>

            <h2 className="font-serif text-3xl font-semibold text-foreground mb-8">{copy.formTitle}</h2>

            <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">

              {/* Naam */}
              <div>
                <label className="block font-sans text-sm font-medium text-foreground mb-1.5">
                  {copy.fieldNaam} <span className="text-destructive">*</span>
                </label>
                <input
                  type="text"
                  value={form.naam}
                  onChange={(e) => set("naam", e.target.value)}
                  placeholder={copy.fieldNaamPlaceholder}
                  className={inputCls(errors.naam)}
                />
                {errors.naam && <p className="mt-1.5 font-sans text-xs text-destructive">{errors.naam}</p>}
              </div>

              {/* Email + Telefoon */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-sans text-sm font-medium text-foreground mb-1.5">
                    {copy.fieldEmail} <span className="text-destructive">*</span>
                  </label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => set("email", e.target.value)}
                    placeholder={copy.fieldEmailPlaceholder}
                    className={inputCls(errors.email)}
                  />
                  {errors.email && <p className="mt-1.5 font-sans text-xs text-destructive">{errors.email}</p>}
                </div>
                <div>
                  <label className="block font-sans text-sm font-medium text-foreground mb-1.5">
                    {copy.fieldTelefoon} <span className="text-destructive">*</span>
                  </label>
                  <input
                    type="tel"
                    value={form.telefoon}
                    onChange={(e) => set("telefoon", e.target.value)}
                    placeholder={copy.fieldTelefoonPlaceholder}
                    className={inputCls(errors.telefoon)}
                  />
                  {errors.telefoon && <p className="mt-1.5 font-sans text-xs text-destructive">{errors.telefoon}</p>}
                </div>
              </div>

              {/* Sessie type dropdown */}
              <div>
                <label className="block font-sans text-sm font-medium text-foreground mb-1.5">
                  {copy.fieldSessie} <span className="text-destructive">*</span>
                </label>
                <div className="relative">
                  <select
                    value={form.sessieType}
                    onChange={(e) => set("sessieType", e.target.value)}
                    className={selectCls(errors.sessieType)}
                  >
                    <option value="" disabled>{copy.fieldSessiePlaceholder}</option>
                    {copy.sessieOptions.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                    <svg className="h-4 w-4 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
                {errors.sessieType && <p className="mt-1.5 font-sans text-xs text-destructive">{errors.sessieType}</p>}
              </div>

              {/* Format dropdown */}
              <div>
                <label className="block font-sans text-sm font-medium text-foreground mb-1.5">
                  {copy.fieldFormat} <span className="text-destructive">*</span>
                </label>
                <div className="relative">
                  <select
                    value={form.format}
                    onChange={(e) => set("format", e.target.value)}
                    className={selectCls(errors.format)}
                  >
                    <option value="" disabled>{copy.fieldFormatPlaceholder}</option>
                    {copy.formatOptions.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                    <svg className="h-4 w-4 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
                {errors.format && <p className="mt-1.5 font-sans text-xs text-destructive">{errors.format}</p>}
              </div>

              {/* Opmerking */}
              <div>
                <label className="block font-sans text-sm font-medium text-foreground mb-1.5">
                  {copy.fieldOpmerking}{" "}
                  <span className="font-normal text-muted-foreground">({isNl ? "optioneel" : "optional"})</span>
                </label>
                <textarea
                  rows={4}
                  value={form.opmerking}
                  onChange={(e) => set("opmerking", e.target.value)}
                  placeholder={copy.fieldOpmerkingPlaceholder}
                  className={inputCls()}
                />
              </div>

              <button
                type="submit"
                className="flex items-center justify-center gap-2.5 w-full py-4 rounded-xl bg-accent text-accent-foreground font-sans font-medium text-sm hover:opacity-90 transition-opacity min-h-[52px] mt-2"
              >
                <Send className="h-4 w-4" />
                {copy.submit}
              </button>

              <p className="text-center font-sans text-xs text-muted-foreground">
                <span className="text-destructive">*</span> {isNl ? "Verplichte velden" : "Required fields"}
              </p>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
