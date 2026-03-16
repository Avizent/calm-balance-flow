import { useState } from "react";
import { CheckCircle, Phone, MessageCircle, Mail, MapPin, Send } from "lucide-react";
import { SEO, SITE_URL } from "@/components/SEO";
import { ConsentCheckbox } from "@/components/ConsentCheckbox";
import { useLanguage } from "@/contexts/LanguageContext";

function scrollToContact(e: React.MouseEvent) {
  e.preventDefault();
  const el = document.getElementById("medical-contact");
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

const contactIcons = [Phone, MessageCircle, Mail, MapPin];
const contactHrefs = [
  "tel:+32472240581",
  "https://wa.me/32472913917",
  "mailto:info@spessirits.com",
  "https://maps.google.com/?q=Cirkellaan+12,+2970+Schilde",
];
const contactValues = [
  "+32 472 240 581",
  "+32 472 913 917",
  "info@spessirits.com",
  "Cirkellaan 12, 2970 Schilde",
];

interface FormData {
  name: string;
  role: string;
  practice: string;
  email: string;
  phone: string;
  message: string;
}
interface FormErrors {
  name?: string;
  role?: string;
  email?: string;
  message?: string;
  consent?: string;
}

export default function MedicalProfessionals() {
  const { t, lang } = useLanguage();
  const mp = t.medicalProfessionals;

  const [form, setForm] = useState<FormData>({ name: "", role: "", practice: "", email: "", phone: "", message: "" });
  const [errors, setErrors] = useState<FormErrors>({});
  const [consent, setConsent] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submittedRoleIndex, setSubmittedRoleIndex] = useState(-1);

  const handleChange = (field: keyof FormData, value: string) => {
    setForm((p) => ({ ...p, [field]: value }));
    if (errors[field as keyof FormErrors]) setErrors((p) => ({ ...p, [field]: undefined }));
  };

  const validate = (): boolean => {
    const e: FormErrors = {};
    if (!form.name.trim()) e.name = mp.errName;
    if (!form.role) e.role = mp.errRole;
    if (!form.email.trim()) e.email = mp.errEmail;
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = mp.errEmailInvalid;
    if (!form.message.trim()) e.message = mp.errMessage;
    if (!consent) e.consent = mp.errConsent;
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    const subject = encodeURIComponent(`Medical Professional Enquiry — ${form.name}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nRole: ${form.role}${form.practice ? `\nPractice: ${form.practice}` : ""}\nEmail: ${form.email}${form.phone ? `\nPhone: ${form.phone}` : ""}\n\nMessage:\n${form.message}`
    );
    window.location.href = `mailto:info@spessirits.com?subject=${subject}&body=${body}`;
    const roleIdx = mp.roleOptions.indexOf(form.role);
    setSubmittedRoleIndex(roleIdx);
    setSubmitted(true);
    setForm({ name: "", role: "", practice: "", email: "", phone: "", message: "" });
    setConsent(false);
    setErrors({});
  };

  const isMedicalRole = submittedRoleIndex >= 0 && submittedRoleIndex <= 3;

  const inputClass = (error?: string) =>
    `w-full rounded-lg border px-4 py-3 font-sans text-sm bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-shadow ${error ? "border-destructive focus:ring-destructive" : "border-border focus:border-primary"}`;

  return (
    <main className="pt-0">
      <SEO
        title={mp.seoTitle}
        description={mp.seoDesc}
        path="/medical-professionals"
        lang={lang}
        breadcrumbs={[
          { name: "Home", url: SITE_URL },
          { name: mp.seoBreadcrumb, url: `${SITE_URL}/medical-professionals` },
        ]}
      />

      {/* ── Section 1: Hero ── */}
      <section className="bg-foreground">
        <div className="container-wide section-padding py-32 md:py-40 text-center">
          <p className="font-sans text-xs uppercase tracking-widest text-primary-foreground/60 mb-5">
            {mp.heroTag}
          </p>
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-semibold text-primary-foreground mb-6 max-w-3xl mx-auto leading-tight">
            {mp.heroTitle}<br />
            <em>{mp.heroTitleEm}</em>
          </h1>
          <div className="max-w-2xl mx-auto space-y-4 mb-10">
            <p className="font-sans text-lg text-primary-foreground/70 leading-relaxed">{mp.heroP1}</p>
            <p className="font-sans text-lg text-primary-foreground/70 leading-relaxed">{mp.heroP2}</p>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="#medical-contact" onClick={scrollToContact} className="inline-flex items-center px-7 py-4 rounded-lg bg-accent text-accent-foreground font-sans font-medium text-sm hover:opacity-90 transition-opacity min-h-[48px]">
              {mp.ctaInfo}
            </a>
            <a href="#medical-contact" onClick={scrollToContact} className="inline-flex items-center px-7 py-4 rounded-lg border border-primary-foreground/40 text-primary-foreground font-sans font-medium text-sm hover:bg-primary-foreground/10 transition-colors min-h-[48px]">
              {mp.ctaContact}
            </a>
          </div>
        </div>
      </section>

      {/* ── Section 2: Who This Is For ── */}
      <section className="bg-muted">
        <div className="container-wide section-padding">
          <div className="max-w-3xl mx-auto text-center">
            <p className="font-sans text-xs uppercase tracking-widest text-primary mb-4">{mp.whoTag}</p>
            <h2 className="font-serif text-4xl md:text-5xl font-semibold text-foreground mb-8 leading-tight">
              {mp.whoTitle}<br /><em>{mp.whoTitleEm}</em>
            </h2>
            <div className="space-y-5 font-sans text-base text-muted-foreground leading-relaxed text-center">
              <p>{mp.whoP1}</p>
              <p>{mp.whoP2}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 3: The Clinical Difference ── */}
      <section className="bg-card">
        <div className="container-wide section-padding">
          <div className="max-w-3xl mx-auto text-center mb-14">
            <p className="font-sans text-xs uppercase tracking-widest text-primary mb-4">{mp.clinicalTag}</p>
            <h2 className="font-serif text-4xl md:text-5xl font-semibold text-foreground mb-6 leading-tight">
              {mp.clinicalTitle}<br /><em>{mp.clinicalTitleEm}</em>
            </h2>
            <p className="font-sans text-base text-muted-foreground leading-relaxed max-w-2xl mx-auto">{mp.clinicalIntro}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-muted rounded-2xl p-8 border border-border">
              <h3 className="font-serif text-2xl font-semibold text-foreground mb-6">{mp.leftTitle}</h3>
              <ul className="space-y-3">
                {mp.leftChecks.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                    <span className="font-sans text-sm text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-foreground rounded-2xl p-8">
              <h3 className="font-serif text-2xl font-semibold text-primary-foreground mb-6">{mp.rightTitle}</h3>
              <ul className="space-y-3">
                {mp.rightChecks.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle className="h-4 w-4 text-primary-foreground/60 shrink-0 mt-0.5" />
                    <span className="font-sans text-sm text-primary-foreground/80">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 4: Conditions ── */}
      <section className="bg-muted">
        <div className="container-wide section-padding">
          <div className="max-w-3xl mx-auto text-center mb-14">
            <p className="font-sans text-xs uppercase tracking-widest text-primary mb-4">{mp.conditionsTag}</p>
            <h2 className="font-serif text-4xl md:text-5xl font-semibold text-foreground mb-6 leading-tight">
              {mp.conditionsTitle}<br /><em>{mp.conditionsTitleEm}</em>
            </h2>
            <p className="font-sans text-base text-muted-foreground leading-relaxed max-w-2xl mx-auto">{mp.conditionsIntro}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {mp.conditionsList.map((c, i) => (
              <div key={i} className="bg-card rounded-xl px-5 py-4 border border-border text-center font-sans text-sm text-foreground">{c}</div>
            ))}
          </div>
          <p className="font-sans text-base text-muted-foreground text-center mt-10 italic max-w-xl mx-auto">{mp.conditionsNote}</p>
        </div>
      </section>

      {/* ── Section 5: The Referral Process ── */}
      <section className="bg-card">
        <div className="container-wide section-padding">
          <div className="max-w-3xl mx-auto text-center mb-14">
            <p className="font-sans text-xs uppercase tracking-widest text-primary mb-4">{mp.referralTag}</p>
            <h2 className="font-serif text-4xl md:text-5xl font-semibold text-foreground mb-6 leading-tight">
              {mp.referralTitle}<br /><em>{mp.referralTitleEm}</em>
            </h2>
            <p className="font-sans text-base text-muted-foreground leading-relaxed max-w-2xl mx-auto">{mp.referralIntro}</p>
          </div>
          <div className="max-w-3xl mx-auto flex flex-col gap-10">
            {mp.steps.map((step, i) => (
              <div key={i} className="flex items-start gap-5">
                <div className="w-8 h-8 rounded-full bg-sage-light flex items-center justify-center shrink-0 mt-0.5">
                  <span className="font-sans text-sm font-semibold text-primary">{i + 1}</span>
                </div>
                <div>
                  <h3 className="font-sans text-base font-semibold text-foreground mb-1">{step.heading}</h3>
                  <p className="font-sans text-sm text-muted-foreground leading-relaxed">{step.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 6: Pull Quote ── */}
      <section style={{ backgroundColor: "#2C4A3E" }}>
        <div className="container-wide section-padding py-24 md:py-32 text-center">
          <blockquote className="font-serif text-2xl md:text-3xl lg:text-4xl italic text-white/90 max-w-4xl mx-auto leading-snug mb-8">
            "{mp.quote}"
          </blockquote>
          <p className="font-sans text-xs uppercase tracking-widest text-white/60">
            {mp.quoteAttribution}
          </p>
        </div>
      </section>

      {/* ── Section 7: Contact Form ── */}
      <section id="medical-contact" className="bg-muted">
        <div className="container-wide section-padding">
          <div className="max-w-3xl mx-auto text-center mb-14">
            <p className="font-sans text-xs uppercase tracking-widest text-primary mb-4">{mp.contactTag}</p>
            <h2 className="font-serif text-4xl md:text-5xl font-semibold text-foreground mb-6 leading-tight">
              {mp.contactTitle}<br /><em>{mp.contactTitleEm}</em>
            </h2>
            <p className="font-sans text-base text-muted-foreground leading-relaxed max-w-2xl mx-auto">{mp.contactIntro}</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 max-w-5xl mx-auto">
            {/* Left — Contact details */}
            <div>
              <h3 className="font-serif text-3xl font-semibold text-foreground mb-8">{mp.contactDetailsTitle}</h3>
              <div className="flex flex-col gap-5">
                {mp.contactLabels.map((label, i) => {
                  const Icon = contactIcons[i];
                  return (
                    <a key={label} href={contactHrefs[i]} target={i !== 0 ? "_blank" : undefined} rel="noopener noreferrer" className="flex items-start gap-4 group">
                      <div className="w-11 h-11 rounded-xl bg-sage-light flex items-center justify-center shrink-0 group-hover:bg-sage transition-colors">
                        <Icon className="h-5 w-5 text-primary group-hover:text-primary-foreground transition-colors" />
                      </div>
                      <div>
                        <p className="font-sans text-xs uppercase tracking-wider text-muted-foreground mb-0.5">{label}</p>
                        <p className="font-sans text-base text-foreground group-hover:text-primary transition-colors">{contactValues[i]}</p>
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Right — Form */}
            <div>
              {submitted ? (
                <div className="bg-card rounded-2xl border border-border p-10 text-center">
                  <CheckCircle className="h-10 w-10 text-primary mx-auto mb-4" />
                  <p className="font-sans text-base text-foreground leading-relaxed">
                    {isMedicalRole ? mp.successMedical : mp.successPatient}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
                  {/* Name */}
                  <div>
                    <label className="block font-sans text-sm font-medium text-foreground mb-1.5">{mp.formName} <span className="text-destructive">*</span></label>
                    <input type="text" value={form.name} onChange={(e) => handleChange("name", e.target.value)} placeholder={mp.formNamePlaceholder} className={inputClass(errors.name)} />
                    {errors.name && <p className="mt-1.5 font-sans text-xs text-destructive">{errors.name}</p>}
                  </div>
                  {/* Role */}
                  <div>
                    <label className="block font-sans text-sm font-medium text-foreground mb-1.5">{mp.formRole} <span className="text-destructive">*</span></label>
                    <select value={form.role} onChange={(e) => handleChange("role", e.target.value)} className={inputClass(errors.role)}>
                      <option value="" disabled>{mp.formRolePlaceholder}</option>
                      {mp.roleOptions.map((r) => <option key={r} value={r}>{r}</option>)}
                    </select>
                    {errors.role && <p className="mt-1.5 font-sans text-xs text-destructive">{errors.role}</p>}
                  </div>
                  {/* Practice */}
                  <div>
                    <label className="block font-sans text-sm font-medium text-foreground mb-1.5">{mp.formPractice}</label>
                    <input type="text" value={form.practice} onChange={(e) => handleChange("practice", e.target.value)} placeholder={mp.formPracticePlaceholder} className={inputClass()} />
                  </div>
                  {/* Email */}
                  <div>
                    <label className="block font-sans text-sm font-medium text-foreground mb-1.5">{mp.formEmail} <span className="text-destructive">*</span></label>
                    <input type="email" value={form.email} onChange={(e) => handleChange("email", e.target.value)} placeholder={mp.formEmailPlaceholder} className={inputClass(errors.email)} />
                    {errors.email && <p className="mt-1.5 font-sans text-xs text-destructive">{errors.email}</p>}
                  </div>
                  {/* Phone */}
                  <div>
                    <label className="block font-sans text-sm font-medium text-foreground mb-1.5">{mp.formPhone}</label>
                    <input type="tel" value={form.phone} onChange={(e) => handleChange("phone", e.target.value)} placeholder={mp.formPhonePlaceholder} className={inputClass()} />
                  </div>
                  {/* Message */}
                  <div>
                    <label className="block font-sans text-sm font-medium text-foreground mb-1.5">{mp.formMessage} <span className="text-destructive">*</span></label>
                    <textarea rows={5} value={form.message} onChange={(e) => handleChange("message", e.target.value)} placeholder={mp.formMessagePlaceholder} className={inputClass(errors.message)} />
                    {errors.message && <p className="mt-1.5 font-sans text-xs text-destructive">{errors.message}</p>}
                  </div>
                  {/* Consent */}
                  <ConsentCheckbox checked={consent} onCheckedChange={(v) => { setConsent(v); if (errors.consent) setErrors((p) => ({ ...p, consent: undefined })); }} error={errors.consent} />
                  {/* Submit */}
                  <button type="submit" className="flex items-center justify-center gap-2.5 w-full py-4 rounded-xl bg-accent text-accent-foreground font-sans font-medium text-sm hover:opacity-90 transition-opacity min-h-[52px] mt-2">
                    <Send className="h-4 w-4" />
                    {mp.formSubmit}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 8: Footer Note ── */}
      <section className="bg-card">
        <div className="container-wide px-6 py-12 md:px-16 lg:px-24 text-center">
          <p className="font-sans text-sm text-muted-foreground leading-relaxed mb-2">
            {mp.footerNote1}<br />
            {mp.footerNote2}
          </p>
          <p className="font-sans text-xs text-muted-foreground/70">
            {mp.footerCredits}
          </p>
        </div>
      </section>
    </main>
  );
}
