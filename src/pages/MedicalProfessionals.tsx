import { useState } from "react";
import { CheckCircle, Phone, MessageCircle, Mail, MapPin, Send } from "lucide-react";
import { SEO, SITE_URL } from "@/components/SEO";
import { ConsentCheckbox } from "@/components/ConsentCheckbox";

function scrollToContact(e: React.MouseEvent) {
  e.preventDefault();
  const el = document.getElementById("medical-contact");
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

const conditions = [
  "Chronic lower back pain",
  "Neck and cervical tension",
  "Post-surgical rehabilitation",
  "Osteoarthritis (hip, knee, spine)",
  "Scoliosis and postural imbalance",
  "Hypermobility and joint instability",
  "Pelvic floor dysfunction",
  "Pre- & post-natal recovery",
  "Balance and fall prevention",
  "Sedentary lifestyle conditions",
  "Stress-related musculoskeletal tension",
  "Neurological rehabilitation (mild)",
];

const leftChecks = [
  "A full initial assessment tailored to their condition and goals",
  "A programme built around their body — not a standard class plan",
  "One-to-one attention throughout every session",
  "Gradual, evidence-informed progression",
  "Access to a fully equipped private studio",
  "A summary report available to you on request",
];

const rightChecks = [
  "Licensed physiotherapist — not a fitness instructor",
  "20+ years of clinical and movement experience",
  "Deep knowledge of anatomy, biomechanics, and injury patterns",
  "Preventive and rehabilitative — not performance-led",
  "Maximum two clients at any one time",
  "Works with the referring practitioner, not around them",
];

const steps = [
  {
    heading: "Introduce Spessirits to your patient.",
    body: "Let them know that Cintia is a licensed physiotherapist offering individual Pilates sessions from a private studio in Schilde. The website has everything they need to understand the approach and feel comfortable making contact.",
  },
  {
    heading: "Your patient makes contact directly.",
    body: "They can reach Cintia by phone, WhatsApp, or the enquiry form on this page. She will arrange an initial conversation to understand their history, condition, and goals — and confirm that physio-led Pilates is the right fit for them.",
  },
  {
    heading: "Stay in the loop, if you'd like.",
    body: "After an initial assessment, Cintia is happy to provide a brief summary to the referring practitioner — with the patient's consent. She sees herself as part of a wider care team, not an alternative to it.",
  },
];

const roleOptions = [
  "GP / General practitioner",
  "Physiotherapist",
  "Orthopaedic or sports specialist",
  "Other medical professional",
  "Patient or prospective client",
];

const medicalRoles = new Set([
  "GP / General practitioner",
  "Physiotherapist",
  "Orthopaedic or sports specialist",
  "Other medical professional",
]);

const contactDetails = [
  { label: "PHONE", value: "+32 472 240 581", href: "tel:+32472240581", Icon: Phone },
  { label: "WHATSAPP", value: "+32 472 913 917", href: "https://wa.me/32472913917", Icon: MessageCircle },
  { label: "EMAIL", value: "info@spessirits.com", href: "mailto:info@spessirits.com", Icon: Mail },
  { label: "STUDIO", value: "Cirkellaan 12, 2970 Schilde", href: "https://maps.google.com/?q=Cirkellaan+12,+2970+Schilde", Icon: MapPin },
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
  const [form, setForm] = useState<FormData>({ name: "", role: "", practice: "", email: "", phone: "", message: "" });
  const [errors, setErrors] = useState<FormErrors>({});
  const [consent, setConsent] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submittedRole, setSubmittedRole] = useState("");

  const handleChange = (field: keyof FormData, value: string) => {
    setForm((p) => ({ ...p, [field]: value }));
    if (errors[field as keyof FormErrors]) setErrors((p) => ({ ...p, [field]: undefined }));
  };

  const validate = (): boolean => {
    const e: FormErrors = {};
    if (!form.name.trim()) e.name = "Name is required.";
    if (!form.role) e.role = "Please select a role.";
    if (!form.email.trim()) e.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Please enter a valid email.";
    if (!form.message.trim()) e.message = "Message is required.";
    if (!consent) e.consent = "You must agree to the privacy policy.";
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
    setSubmittedRole(form.role);
    setSubmitted(true);
    setForm({ name: "", role: "", practice: "", email: "", phone: "", message: "" });
    setConsent(false);
    setErrors({});
  };

  const inputClass = (error?: string) =>
    `w-full rounded-lg border px-4 py-3 font-sans text-sm bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-shadow ${error ? "border-destructive focus:ring-destructive" : "border-border focus:border-primary"}`;

  return (
    <main className="pt-0">
      <SEO
        title="For Medical Professionals — Spessirits Pilates"
        description="Refer your patients to physio-led Pilates. Cintia is a licensed physiotherapist with 20+ years of clinical experience offering one-to-one rehabilitative movement therapy."
        path="/medical-professionals"
        lang="en"
        breadcrumbs={[
          { name: "Home", url: SITE_URL },
          { name: "For Medical Professionals", url: `${SITE_URL}/medical-professionals` },
        ]}
      />

      {/* ── Section 1: Hero ── */}
      <section className="bg-foreground">
        <div className="container-wide section-padding py-32 md:py-40 text-center">
          <p className="font-sans text-xs uppercase tracking-widest text-primary-foreground/60 mb-5">
            For Medical Professionals
          </p>
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-semibold text-primary-foreground mb-6 max-w-3xl mx-auto leading-tight">
            Movement as medicine —<br />
            <em>prescribed with precision.</em>
          </h1>
          <div className="max-w-2xl mx-auto space-y-4 mb-10">
            <p className="font-sans text-lg text-primary-foreground/70 leading-relaxed">
              Cintia is a licensed physiotherapist with over 20 years of clinical experience.
            </p>
            <p className="font-sans text-lg text-primary-foreground/70 leading-relaxed">
              If you are looking for a trusted partner to support your patients' preventive and rehabilitative movement — you are in the right place.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="#medical-contact" onClick={scrollToContact} className="inline-flex items-center px-7 py-4 rounded-lg bg-accent text-accent-foreground font-sans font-medium text-sm hover:opacity-90 transition-opacity min-h-[48px]">
              Request Information Pack →
            </a>
            <a href="#medical-contact" onClick={scrollToContact} className="inline-flex items-center px-7 py-4 rounded-lg border border-primary-foreground/40 text-primary-foreground font-sans font-medium text-sm hover:bg-primary-foreground/10 transition-colors min-h-[48px]">
              Get in Touch →
            </a>
          </div>
        </div>
      </section>

      {/* ── Section 2: Who This Is For ── */}
      <section className="bg-muted">
        <div className="container-wide section-padding">
          <div className="max-w-3xl mx-auto text-center">
            <p className="font-sans text-xs uppercase tracking-widest text-primary mb-4">Who This Is For</p>
            <h2 className="font-serif text-4xl md:text-5xl font-semibold text-foreground mb-8 leading-tight">
              Referring patients to<br /><em>physio-led Pilates.</em>
            </h2>
            <div className="space-y-5 font-sans text-base text-muted-foreground leading-relaxed text-center">
              <p>This page is written for GPs, physiotherapists, orthopaedic specialists, rheumatologists, sports medicine practitioners, and rehabilitation teams.</p>
              <p>If you have patients who would benefit from structured, individually tailored movement therapy — grounded in physiotherapy and delivered in a private, clinical setting — Cintia's practice may be exactly what they need.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 3: The Clinical Difference ── */}
      <section className="bg-card">
        <div className="container-wide section-padding">
          <div className="max-w-3xl mx-auto text-center mb-14">
            <p className="font-sans text-xs uppercase tracking-widest text-primary mb-4">Not a Class. Not a Gym.</p>
            <h2 className="font-serif text-4xl md:text-5xl font-semibold text-foreground mb-6 leading-tight">
              Responsible Pilates —<br /><em>guided by clinical expertise.</em>
            </h2>
            <p className="font-sans text-base text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              Spessirits is not a studio. There are no classes of ten, no shared reformers, no generic programmes. Every session is one-to-one, or occasionally one-to-two by arrangement.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-muted rounded-2xl p-8 border border-border">
              <h3 className="font-serif text-2xl font-semibold text-foreground mb-6">What your patient receives</h3>
              <ul className="space-y-3">
                {leftChecks.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                    <span className="font-sans text-sm text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-foreground rounded-2xl p-8">
              <h3 className="font-serif text-2xl font-semibold text-primary-foreground mb-6">What sets Cintia apart</h3>
              <ul className="space-y-3">
                {rightChecks.map((item) => (
                  <li key={item} className="flex items-start gap-3">
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
            <p className="font-sans text-xs uppercase tracking-widest text-primary mb-4">Conditions That Respond Well</p>
            <h2 className="font-serif text-4xl md:text-5xl font-semibold text-foreground mb-6 leading-tight">
              Movement therapy for<br /><em>the patients who need it most.</em>
            </h2>
            <p className="font-sans text-base text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              Cintia works with patients whose conditions are well served by guided, low-impact, physiotherapy-informed movement. Common referral profiles include:
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {conditions.map((c) => (
              <div key={c} className="bg-card rounded-xl px-5 py-4 border border-border text-center font-sans text-sm text-foreground">{c}</div>
            ))}
          </div>
          <p className="font-sans text-base text-muted-foreground text-center mt-10 italic max-w-xl mx-auto">
            Not sure if Pilates is right for your patient? Get in touch — Cintia is happy to discuss.
          </p>
        </div>
      </section>

      {/* ── Section 5: The Referral Process ── */}
      <section className="bg-card">
        <div className="container-wide section-padding">
          <div className="max-w-3xl mx-auto text-center mb-14">
            <p className="font-sans text-xs uppercase tracking-widest text-primary mb-4">Simple to Refer</p>
            <h2 className="font-serif text-4xl md:text-5xl font-semibold text-foreground mb-6 leading-tight">
              Three steps.<br /><em>That's all it takes.</em>
            </h2>
            <p className="font-sans text-base text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              Referring a patient to Spessirits is straightforward. No referral forms, no waiting lists, no complexity.
            </p>
          </div>
          <div className="max-w-3xl mx-auto flex flex-col gap-10">
            {steps.map((step, i) => (
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
            "Pilates, when led by someone who understands the body clinically, is one of the most powerful preventive tools we have. I want to be the person your patients trust to do it properly."
          </blockquote>
          <p className="font-sans text-xs uppercase tracking-widest text-white/60">
            Cintia Spessirits &nbsp;—&nbsp; Licensed Physiotherapist &amp; Pilates Teacher
          </p>
        </div>
      </section>

      {/* ── Section 7: Contact Form ── */}
      <section id="medical-contact" className="bg-muted">
        <div className="container-wide section-padding">
          <div className="max-w-3xl mx-auto text-center mb-14">
            <p className="font-sans text-xs uppercase tracking-widest text-primary mb-4">Get in Touch</p>
            <h2 className="font-serif text-4xl md:text-5xl font-semibold text-foreground mb-6 leading-tight">
              Request the professional<br /><em>information pack.</em>
            </h2>
            <p className="font-sans text-base text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              Whether you'd like to refer a patient, request our clinical information pack, or simply ask a question — Cintia is happy to help.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 max-w-5xl mx-auto">
            {/* Left — Contact details */}
            <div>
              <h3 className="font-serif text-3xl font-semibold text-foreground mb-8">Contact details</h3>
              <div className="flex flex-col gap-5">
                {contactDetails.map(({ label, value, href, Icon }) => (
                  <a key={label} href={href} target={label !== "PHONE" ? "_blank" : undefined} rel="noopener noreferrer" className="flex items-start gap-4 group">
                    <div className="w-11 h-11 rounded-xl bg-sage-light flex items-center justify-center shrink-0 group-hover:bg-sage transition-colors">
                      <Icon className="h-5 w-5 text-primary group-hover:text-primary-foreground transition-colors" />
                    </div>
                    <div>
                      <p className="font-sans text-xs uppercase tracking-wider text-muted-foreground mb-0.5">{label}</p>
                      <p className="font-sans text-base text-foreground group-hover:text-primary transition-colors">{value}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Right — Form */}
            <div>
              {submitted ? (
                <div className="bg-card rounded-2xl border border-border p-10 text-center">
                  <CheckCircle className="h-10 w-10 text-primary mx-auto mb-4" />
                  <p className="font-sans text-base text-foreground leading-relaxed">
                    {medicalRoles.has(submittedRole)
                      ? "Thank you. Our professional information pack is on its way to your inbox. Cintia will be in touch shortly."
                      : "Thank you for getting in touch. Cintia will be in contact with you directly very soon."}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
                  {/* Name */}
                  <div>
                    <label className="block font-sans text-sm font-medium text-foreground mb-1.5">Your name <span className="text-destructive">*</span></label>
                    <input type="text" value={form.name} onChange={(e) => handleChange("name", e.target.value)} placeholder="Dr. / Mr. / Ms. ..." className={inputClass(errors.name)} />
                    {errors.name && <p className="mt-1.5 font-sans text-xs text-destructive">{errors.name}</p>}
                  </div>
                  {/* Role */}
                  <div>
                    <label className="block font-sans text-sm font-medium text-foreground mb-1.5">I am a... <span className="text-destructive">*</span></label>
                    <select value={form.role} onChange={(e) => handleChange("role", e.target.value)} className={inputClass(errors.role)}>
                      <option value="" disabled>Select your role...</option>
                      {roleOptions.map((r) => <option key={r} value={r}>{r}</option>)}
                    </select>
                    {errors.role && <p className="mt-1.5 font-sans text-xs text-destructive">{errors.role}</p>}
                  </div>
                  {/* Practice */}
                  <div>
                    <label className="block font-sans text-sm font-medium text-foreground mb-1.5">Practice or clinic name</label>
                    <input type="text" value={form.practice} onChange={(e) => handleChange("practice", e.target.value)} placeholder="Optional" className={inputClass()} />
                  </div>
                  {/* Email */}
                  <div>
                    <label className="block font-sans text-sm font-medium text-foreground mb-1.5">Email <span className="text-destructive">*</span></label>
                    <input type="email" value={form.email} onChange={(e) => handleChange("email", e.target.value)} placeholder="your@email.com" className={inputClass(errors.email)} />
                    {errors.email && <p className="mt-1.5 font-sans text-xs text-destructive">{errors.email}</p>}
                  </div>
                  {/* Phone */}
                  <div>
                    <label className="block font-sans text-sm font-medium text-foreground mb-1.5">Phone</label>
                    <input type="tel" value={form.phone} onChange={(e) => handleChange("phone", e.target.value)} placeholder="+32 ..." className={inputClass()} />
                  </div>
                  {/* Message */}
                  <div>
                    <label className="block font-sans text-sm font-medium text-foreground mb-1.5">Message <span className="text-destructive">*</span></label>
                    <textarea rows={5} value={form.message} onChange={(e) => handleChange("message", e.target.value)} placeholder="Tell us about your patient, or ask a question..." className={inputClass(errors.message)} />
                    {errors.message && <p className="mt-1.5 font-sans text-xs text-destructive">{errors.message}</p>}
                  </div>
                  {/* Consent */}
                  <ConsentCheckbox checked={consent} onCheckedChange={(v) => { setConsent(v); if (errors.consent) setErrors((p) => ({ ...p, consent: undefined })); }} error={errors.consent} />
                  {/* Submit */}
                  <button type="submit" className="flex items-center justify-center gap-2.5 w-full py-4 rounded-xl bg-accent text-accent-foreground font-sans font-medium text-sm hover:opacity-90 transition-opacity min-h-[52px] mt-2">
                    <Send className="h-4 w-4" />
                    Send message →
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
            Your enquiry is treated with complete discretion.<br />
            Patient information is never shared without consent.
          </p>
          <p className="font-sans text-xs text-muted-foreground/70">
            Cintia Spessirits &nbsp;·&nbsp; Licensed Physiotherapist &nbsp;·&nbsp; Cirkellaan 12, 2970 Schilde &nbsp;·&nbsp; info@spessirits.com
          </p>
        </div>
      </section>
    </main>
  );
}
