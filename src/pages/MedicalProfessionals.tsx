import { CheckCircle } from "lucide-react";
import { SEO, SITE_URL } from "@/components/SEO";

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

export default function MedicalProfessionals() {
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
            <a
              href="#medical-contact"
              onClick={scrollToContact}
              className="inline-flex items-center px-7 py-4 rounded-lg bg-accent text-accent-foreground font-sans font-medium text-sm hover:opacity-90 transition-opacity min-h-[48px]"
            >
              Request Information Pack →
            </a>
            <a
              href="#medical-contact"
              onClick={scrollToContact}
              className="inline-flex items-center px-7 py-4 rounded-lg border border-primary-foreground/40 text-primary-foreground font-sans font-medium text-sm hover:bg-primary-foreground/10 transition-colors min-h-[48px]"
            >
              Get in Touch →
            </a>
          </div>
        </div>
      </section>

      {/* ── Section 2: Who This Is For ── */}
      <section className="bg-muted">
        <div className="container-wide section-padding">
          <div className="max-w-3xl mx-auto text-center">
            <p className="font-sans text-xs uppercase tracking-widest text-primary mb-4">
              Who This Is For
            </p>
            <h2 className="font-serif text-4xl md:text-5xl font-semibold text-foreground mb-8 leading-tight">
              Referring patients to<br />
              <em>physio-led Pilates.</em>
            </h2>
            <div className="space-y-5 font-sans text-base text-muted-foreground leading-relaxed text-center">
              <p>
                This page is written for GPs, physiotherapists, orthopaedic specialists, rheumatologists, sports medicine practitioners, and rehabilitation teams.
              </p>
              <p>
                If you have patients who would benefit from structured, individually tailored movement therapy — grounded in physiotherapy and delivered in a private, clinical setting — Cintia's practice may be exactly what they need.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 3: The Clinical Difference ── */}
      <section className="bg-card">
        <div className="container-wide section-padding">
          <div className="max-w-3xl mx-auto text-center mb-14">
            <p className="font-sans text-xs uppercase tracking-widest text-primary mb-4">
              Not a Class. Not a Gym.
            </p>
            <h2 className="font-serif text-4xl md:text-5xl font-semibold text-foreground mb-6 leading-tight">
              Responsible Pilates —<br />
              <em>guided by clinical expertise.</em>
            </h2>
            <p className="font-sans text-base text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              Spessirits is not a studio. There are no classes of ten, no shared reformers, no generic programmes. Every session is one-to-one, or occasionally one-to-two by arrangement.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Left card */}
            <div className="bg-muted rounded-2xl p-8 border border-border">
              <h3 className="font-serif text-2xl font-semibold text-foreground mb-6">
                What your patient receives
              </h3>
              <ul className="space-y-3">
                {leftChecks.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                    <span className="font-sans text-sm text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right card */}
            <div className="bg-foreground rounded-2xl p-8">
              <h3 className="font-serif text-2xl font-semibold text-primary-foreground mb-6">
                What sets Cintia apart
              </h3>
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
            <p className="font-sans text-xs uppercase tracking-widest text-primary mb-4">
              Conditions That Respond Well
            </p>
            <h2 className="font-serif text-4xl md:text-5xl font-semibold text-foreground mb-6 leading-tight">
              Movement therapy for<br />
              <em>the patients who need it most.</em>
            </h2>
            <p className="font-sans text-base text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              Cintia works with patients whose conditions are well served by guided, low-impact, physiotherapy-informed movement. Common referral profiles include:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {conditions.map((c) => (
              <div
                key={c}
                className="bg-card rounded-xl px-5 py-4 border border-border text-center font-sans text-sm text-foreground"
              >
                {c}
              </div>
            ))}
          </div>

          <p className="font-sans text-base text-muted-foreground text-center mt-10 italic max-w-xl mx-auto">
            Not sure if Pilates is right for your patient? Get in touch — Cintia is happy to discuss.
          </p>
        </div>
      </section>

      {/* Anchor for contact scroll target (placeholder for future sections) */}
      <div id="medical-contact" />
    </main>
  );
}
