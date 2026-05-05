import { Link } from "react-router-dom";
import { Checkbox } from "@/components/ui/checkbox";
import { useLanguage } from "@/contexts/LanguageContext";

const labels = {
  nl: { agree: "Ik ga akkoord met het", link: "privacybeleid" },
  en: { agree: "I agree to the", link: "privacy policy" },
  fr: { agree: "J'accepte la", link: "politique de confidentialité" },
  pt: { agree: "Eu concordo com a", link: "política de privacidade" },
};

interface ConsentCheckboxProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  error?: string;
}

export function ConsentCheckbox({ checked, onCheckedChange, error }: ConsentCheckboxProps) {
  const { lang } = useLanguage();
  const l = labels[lang] || labels.nl;

  return (
    <div>
      <div className="flex items-start gap-2.5">
        <Checkbox
          id="consent"
          checked={checked}
          onCheckedChange={(v) => onCheckedChange(v === true)}
          className="mt-0.5"
        />
        <label htmlFor="consent" className="font-sans text-sm text-muted-foreground leading-relaxed cursor-pointer">
          {l.agree}{" "}
          <Link to="/legal" className="text-primary underline hover:text-primary/80" target="_blank" rel="noopener noreferrer">
            {l.link}
          </Link>
          . <span className="text-destructive">*</span>
        </label>
      </div>
      {error && <p className="mt-1.5 font-sans text-xs text-destructive">{error}</p>}
    </div>
  );
}
