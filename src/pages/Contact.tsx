import { useState } from "react";
import { Phone, Mail, MapPin, MessageCircle, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface FormData {
  naam: string;
  email: string;
  telefoon: string;
  bericht: string;
}

interface FormErrors {
  naam?: string;
  email?: string;
  bericht?: string;
}

const contactInfo = [
  {
    icon: Phone,
    label: "Telefoon",
    value: "+32 472 240 581",
    href: "tel:+32472240581",
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: "+32 472 913 917",
    href: "https://wa.me/32472913917",
  },
  {
    icon: Mail,
    label: "E-mail",
    value: "spessiritskine@icloud.com",
    href: "mailto:spessiritskine@icloud.com",
  },
  {
    icon: MapPin,
    label: "Adres",
    value: "Cirkellaan 12, 2970 Schilde",
    href: "https://maps.google.com/?q=Cirkellaan+12,+2970+Schilde",
  },
];

export default function Contact() {
  const { toast } = useToast();
  const [form, setForm] = useState<FormData>({ naam: "", email: "", telefoon: "", bericht: "" });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!form.naam.trim()) newErrors.naam = "Naam is verplicht.";
    if (!form.email.trim()) {
      newErrors.email = "E-mailadres is verplicht.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Geldig e-mailadres vereist.";
    }
    if (!form.bericht.trim()) newErrors.bericht = "Bericht is verplicht.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    // Simulate network delay
    await new Promise((r) => setTimeout(r, 1200));
    setSubmitting(false);
    setForm({ naam: "", email: "", telefoon: "", bericht: "" });
    setErrors({});
    toast({
      title: "Bericht verzonden! 🌿",
      description: "Cintia neemt zo snel mogelijk contact met je op.",
    });
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
      {/* Header */}
      <section className="bg-muted">
        <div className="container-wide section-padding py-20 text-center">
          <p className="font-sans text-xs uppercase tracking-widest text-primary mb-4">Contact</p>
          <h1 className="font-serif text-5xl md:text-6xl font-semibold text-foreground mb-5">
            Neem contact op
          </h1>
          <p className="font-sans text-lg text-muted-foreground max-w-md mx-auto">
            Voor reservaties, vragen over lessen of tarieven — Cintia helpt je graag verder.
          </p>
        </div>
      </section>

      {/* Split Layout */}
      <section className="bg-card">
        <div className="container-wide section-padding">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20">
            {/* Contact Info */}
            <div>
              <h2 className="font-serif text-3xl font-semibold text-foreground mb-8">
                Contactgegevens
              </h2>

              <div className="flex flex-col gap-5 mb-10">
                {contactInfo.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    target={item.label === "Adres" || item.label === "WhatsApp" ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    className="flex items-start gap-4 group"
                  >
                    <div className="w-11 h-11 rounded-xl bg-sage-light flex items-center justify-center shrink-0 group-hover:bg-sage transition-colors">
                      <item.icon className="h-5 w-5 text-primary group-hover:text-primary-foreground transition-colors" />
                    </div>
                    <div>
                      <p className="font-sans text-xs uppercase tracking-wider text-muted-foreground mb-0.5">
                        {item.label}
                      </p>
                      <p className="font-sans text-base text-foreground group-hover:text-primary transition-colors">
                        {item.value}
                      </p>
                    </div>
                  </a>
                ))}
              </div>

              {/* Map Placeholder */}
              <div className="rounded-2xl overflow-hidden border border-border bg-muted h-52 flex flex-col items-center justify-center gap-3">
                <MapPin className="h-8 w-8 text-primary" />
                <div className="text-center">
                  <p className="font-serif text-lg font-semibold text-foreground">Spessirits Pilates</p>
                  <p className="font-sans text-sm text-muted-foreground">Cirkellaan 12, 2970 Schilde</p>
                  <a
                    href="https://maps.google.com/?q=Cirkellaan+12,+2970+Schilde"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 mt-2 text-primary font-sans text-sm font-medium hover:underline"
                  >
                    Open in Google Maps →
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <h2 className="font-serif text-3xl font-semibold text-foreground mb-8">
                Stuur een bericht
              </h2>

              <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
                {/* Naam */}
                <div>
                  <label className="block font-sans text-sm font-medium text-foreground mb-1.5">
                    Naam <span className="text-destructive">*</span>
                  </label>
                  <input
                    type="text"
                    value={form.naam}
                    onChange={(e) => handleChange("naam", e.target.value)}
                    placeholder="Jouw naam"
                    className={inputClass(errors.naam)}
                  />
                  {errors.naam && (
                    <p className="mt-1.5 font-sans text-xs text-destructive">{errors.naam}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="block font-sans text-sm font-medium text-foreground mb-1.5">
                    E-mail <span className="text-destructive">*</span>
                  </label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    placeholder="jouw@email.com"
                    className={inputClass(errors.email)}
                  />
                  {errors.email && (
                    <p className="mt-1.5 font-sans text-xs text-destructive">{errors.email}</p>
                  )}
                </div>

                {/* Telefoon */}
                <div>
                  <label className="block font-sans text-sm font-medium text-foreground mb-1.5">
                    Telefoon <span className="font-normal text-muted-foreground">(optioneel)</span>
                  </label>
                  <input
                    type="tel"
                    value={form.telefoon}
                    onChange={(e) => handleChange("telefoon", e.target.value)}
                    placeholder="+32 ..."
                    className={inputClass()}
                  />
                </div>

                {/* Bericht */}
                <div>
                  <label className="block font-sans text-sm font-medium text-foreground mb-1.5">
                    Bericht <span className="text-destructive">*</span>
                  </label>
                  <textarea
                    rows={5}
                    value={form.bericht}
                    onChange={(e) => handleChange("bericht", e.target.value)}
                    placeholder="Stel hier jouw vraag of vertel wat je zoekt..."
                    className={inputClass(errors.bericht)}
                  />
                  {errors.bericht && (
                    <p className="mt-1.5 font-sans text-xs text-destructive">{errors.bericht}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="flex items-center justify-center gap-2.5 w-full py-4 rounded-xl bg-accent text-accent-foreground font-sans font-medium text-sm hover:opacity-90 transition-opacity disabled:opacity-60 min-h-[52px] mt-2"
                >
                  {submitting ? (
                    <>
                      <span className="animate-spin inline-block w-4 h-4 border-2 border-accent-foreground border-t-transparent rounded-full" />
                      Versturen...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      Verstuur bericht
                    </>
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
