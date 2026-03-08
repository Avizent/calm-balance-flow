import { useLanguage } from "@/contexts/LanguageContext";
import { SEO, SITE_URL } from "@/components/SEO";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const legalContent = {
  nl: {
    tag: "Juridisch",
    title: "Juridische Informatie",
    privacyTab: "Privacybeleid",
    legalTab: "Wettelijke Vermeldingen",
    seoTitle: "Juridische Informatie — Spessirits Pilates",
    seoDesc: "Privacybeleid en wettelijke vermeldingen van Spessirits Pilates in Schilde, België.",
    privacy: [
      { h: "1. Verantwoordelijke", p: "Spessirits Pilates, Cirkellaan 12, 2970 Schilde, België. E-mail: spessiritskine@icloud.com. Telefoon: +32 472 240 581." },
      { h: "2. Welke gegevens verzamelen wij?", p: "Deze website verzamelt geen persoonsgegevens op een server. De contactformulieren openen uw e-mailclient (mailto:) — uw gegevens worden nooit op onze servers opgeslagen." },
      { h: "3. Cookies", p: "Deze website maakt geen gebruik van tracking-cookies, analytics of advertentiecookies. Er worden geen cookies van derden geplaatst." },
      { h: "4. Uw rechten", p: "Onder de AVG (GDPR) hebt u recht op inzage, correctie en verwijdering van uw persoonsgegevens. Contacteer ons via e-mail voor elk verzoek." },
      { h: "5. Bewaartermijn", p: "Aangezien wij geen persoonsgegevens opslaan op onze servers, is er geen bewaartermijn van toepassing op gegevens die via het contactformulier worden verzonden." },
      { h: "6. Wijzigingen", p: "Dit privacybeleid kan worden bijgewerkt. Laatste update: maart 2026." },
    ],
    legal: [
      { h: "Ondernemingsgegevens", p: "Spessirits Pilates — Cintia Spessirits. Cirkellaan 12, 2970 Schilde, België. E-mail: spessiritskine@icloud.com." },
      { h: "Hosting", p: "Deze website wordt gehost door Netlify, Inc. / Lovable (lovable.dev)." },
      { h: "Intellectueel eigendom", p: "Alle teksten, afbeeldingen en inhoud op deze website zijn eigendom van Spessirits Pilates, tenzij anders vermeld. Reproductie zonder toestemming is verboden." },
      { h: "Aansprakelijkheid", p: "Spessirits Pilates kan niet aansprakelijk worden gesteld voor eventuele fouten of onnauwkeurigheden op deze website. De inhoud is informatief en vormt geen medisch advies." },
      { h: "Toepasselijk recht", p: "Op deze website en haar inhoud is het Belgisch recht van toepassing. Eventuele geschillen vallen onder de bevoegdheid van de rechtbanken van Antwerpen." },
    ],
  },
  en: {
    tag: "Legal",
    title: "Legal Information",
    privacyTab: "Privacy Policy",
    legalTab: "Legal Notice",
    seoTitle: "Legal Information — Spessirits Pilates",
    seoDesc: "Privacy policy and legal notice for Spessirits Pilates in Schilde, Belgium.",
    privacy: [
      { h: "1. Data Controller", p: "Spessirits Pilates, Cirkellaan 12, 2970 Schilde, Belgium. Email: spessiritskine@icloud.com. Phone: +32 472 240 581." },
      { h: "2. What data do we collect?", p: "This website does not collect personal data on a server. The contact forms open your email client (mailto:) — your data is never stored on our servers." },
      { h: "3. Cookies", p: "This website does not use tracking cookies, analytics or advertising cookies. No third-party cookies are placed." },
      { h: "4. Your rights", p: "Under the GDPR you have the right to access, correct and delete your personal data. Contact us by email for any request." },
      { h: "5. Retention period", p: "As we do not store personal data on our servers, no retention period applies to data sent via the contact form." },
      { h: "6. Changes", p: "This privacy policy may be updated. Last update: March 2026." },
    ],
    legal: [
      { h: "Business details", p: "Spessirits Pilates — Cintia Spessirits. Cirkellaan 12, 2970 Schilde, Belgium. Email: spessiritskine@icloud.com." },
      { h: "Hosting", p: "This website is hosted by Netlify, Inc. / Lovable (lovable.dev)." },
      { h: "Intellectual property", p: "All texts, images and content on this website are the property of Spessirits Pilates, unless stated otherwise. Reproduction without permission is prohibited." },
      { h: "Liability", p: "Spessirits Pilates cannot be held liable for any errors or inaccuracies on this website. The content is informational and does not constitute medical advice." },
      { h: "Applicable law", p: "Belgian law applies to this website and its content. Any disputes fall under the jurisdiction of the courts of Antwerp." },
    ],
  },
  fr: {
    tag: "Mentions légales",
    title: "Informations Juridiques",
    privacyTab: "Politique de confidentialité",
    legalTab: "Mentions légales",
    seoTitle: "Informations Juridiques — Spessirits Pilates",
    seoDesc: "Politique de confidentialité et mentions légales de Spessirits Pilates à Schilde, Belgique.",
    privacy: [
      { h: "1. Responsable du traitement", p: "Spessirits Pilates, Cirkellaan 12, 2970 Schilde, Belgique. E-mail : spessiritskine@icloud.com. Téléphone : +32 472 240 581." },
      { h: "2. Quelles données collectons-nous ?", p: "Ce site ne collecte aucune donnée personnelle sur un serveur. Les formulaires de contact ouvrent votre client de messagerie (mailto :) — vos données ne sont jamais stockées sur nos serveurs." },
      { h: "3. Cookies", p: "Ce site n'utilise pas de cookies de suivi, d'analyse ou publicitaires. Aucun cookie tiers n'est placé." },
      { h: "4. Vos droits", p: "Conformément au RGPD, vous avez le droit d'accéder, de corriger et de supprimer vos données personnelles. Contactez-nous par e-mail pour toute demande." },
      { h: "5. Durée de conservation", p: "Comme nous ne stockons pas de données personnelles sur nos serveurs, aucune durée de conservation ne s'applique aux données envoyées via le formulaire de contact." },
      { h: "6. Modifications", p: "Cette politique de confidentialité peut être mise à jour. Dernière mise à jour : mars 2026." },
    ],
    legal: [
      { h: "Données de l'entreprise", p: "Spessirits Pilates — Cintia Spessirits. Cirkellaan 12, 2970 Schilde, Belgique. E-mail : spessiritskine@icloud.com." },
      { h: "Hébergement", p: "Ce site est hébergé par Netlify, Inc. / Lovable (lovable.dev)." },
      { h: "Propriété intellectuelle", p: "Tous les textes, images et contenus de ce site sont la propriété de Spessirits Pilates, sauf indication contraire. Toute reproduction sans autorisation est interdite." },
      { h: "Responsabilité", p: "Spessirits Pilates ne peut être tenu responsable des erreurs ou inexactitudes présentes sur ce site. Le contenu est informatif et ne constitue pas un avis médical." },
      { h: "Droit applicable", p: "Le droit belge s'applique à ce site et à son contenu. Tout litige relève de la compétence des tribunaux d'Anvers." },
    ],
  },
  pt: {
    tag: "Informações Legais",
    title: "Informações Jurídicas",
    privacyTab: "Política de Privacidade",
    legalTab: "Aviso Legal",
    seoTitle: "Informações Jurídicas — Spessirits Pilates",
    seoDesc: "Política de privacidade e aviso legal da Spessirits Pilates em Schilde, Bélgica.",
    privacy: [
      { h: "1. Responsável pelo tratamento", p: "Spessirits Pilates, Cirkellaan 12, 2970 Schilde, Bélgica. E-mail: spessiritskine@icloud.com. Telefone: +32 472 240 581." },
      { h: "2. Quais dados coletamos?", p: "Este site não coleta dados pessoais em um servidor. Os formulários de contato abrem o seu cliente de e-mail (mailto:) — os seus dados nunca são armazenados nos nossos servidores." },
      { h: "3. Cookies", p: "Este site não utiliza cookies de rastreamento, análise ou publicidade. Nenhum cookie de terceiros é instalado." },
      { h: "4. Os seus direitos", p: "Ao abrigo do RGPD, você tem o direito de acessar, corrigir e apagar os seus dados pessoais. Contacte-nos por e-mail para qualquer pedido." },
      { h: "5. Período de conservação", p: "Como não armazenamos dados pessoais nos nossos servidores, nenhum período de conservação se aplica aos dados enviados através do formulário de contato." },
      { h: "6. Alterações", p: "Esta política de privacidade pode ser atualizada. Última atualização: março de 2026." },
    ],
    legal: [
      { h: "Dados da empresa", p: "Spessirits Pilates — Cintia Spessirits. Cirkellaan 12, 2970 Schilde, Bélgica. E-mail: spessiritskine@icloud.com." },
      { h: "Alojamento", p: "Este site é alojado pela Netlify, Inc. / Lovable (lovable.dev)." },
      { h: "Propriedade intelectual", p: "Todos os textos, imagens e conteúdos deste site são propriedade da Spessirits Pilates, salvo indicação em contrário. A reprodução sem autorização é proibida." },
      { h: "Responsabilidade", p: "A Spessirits Pilates não pode ser responsabilizada por erros ou imprecisões neste site. O conteúdo é informativo e não constitui aconselhamento médico." },
      { h: "Direito aplicável", p: "O direito belga aplica-se a este site e ao seu conteúdo. Qualquer litígio é da competência dos tribunais de Antuérpia." },
    ],
  },
};

const consentLabels = {
  nl: "Ik ga akkoord met het",
  en: "I agree to the",
  fr: "J'accepte la",
  pt: "Eu concordo com a",
};

export { consentLabels };

export default function Legal() {
  const { lang } = useLanguage();
  const c = legalContent[lang] || legalContent.nl;

  return (
    <main className="pt-24">
      <SEO
        title={c.seoTitle}
        description={c.seoDesc}
        path="/legal"
        breadcrumbs={[
          { name: "Home", url: SITE_URL },
          { name: c.tag, url: `${SITE_URL}/legal` },
        ]}
      />

      <section className="bg-muted">
        <div className="container-wide section-padding py-20 text-center">
          <p className="font-sans text-xs uppercase tracking-widest text-primary mb-4">{c.tag}</p>
          <h1 className="font-serif text-5xl md:text-6xl font-semibold text-foreground">{c.title}</h1>
        </div>
      </section>

      <section className="bg-card">
        <div className="container-wide section-padding">
          <div className="max-w-3xl mx-auto">
            <Tabs defaultValue="privacy" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-10">
                <TabsTrigger value="privacy" className="font-sans text-sm">{c.privacyTab}</TabsTrigger>
                <TabsTrigger value="legal" className="font-sans text-sm">{c.legalTab}</TabsTrigger>
              </TabsList>

              <TabsContent value="privacy">
                <div className="space-y-8">
                  {c.privacy.map((s) => (
                    <div key={s.h}>
                      <h2 className="font-serif text-xl font-semibold text-foreground mb-2">{s.h}</h2>
                      <p className="font-sans text-sm text-muted-foreground leading-relaxed">{s.p}</p>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="legal">
                <div className="space-y-8">
                  {c.legal.map((s) => (
                    <div key={s.h}>
                      <h2 className="font-serif text-xl font-semibold text-foreground mb-2">{s.h}</h2>
                      <p className="font-sans text-sm text-muted-foreground leading-relaxed">{s.p}</p>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>
    </main>
  );
}
