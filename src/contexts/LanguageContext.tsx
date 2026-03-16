import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import { getLanguageFromTimezone } from "@/lib/geo-language";

// ─── Single points of control ──────────────────────────────────────────────
// Set either to false to completely remove that language (type, toggle, strings).
export const ENABLE_FRENCH = true;
export const ENABLE_PORTUGUESE = true;
// ───────────────────────────────────────────────────────────────────────────

export type Language = "nl" | "en" | "fr" | "pt";

export const SUPPORTED_LANGUAGES: Language[] = [
  "nl",
  "en",
  ...(ENABLE_FRENCH ? (["fr"] as Language[]) : []),
  ...(ENABLE_PORTUGUESE ? (["pt"] as Language[]) : []),
];

export interface Translations {
  nav: {
    home: string;
    over: string;
    lessen: string;
    prive: string;
    tarieven: string;
    contact: string;
    bookNow: string;
    menu: string;
    menuClose: string;
  };
  footer: {
    tagline: string;
    navigation: string;
    contact: string;
    rights: string;
  };
  home: {
    heroTag: string;
    heroTitle: string;
    heroTitleEm: string;
    heroSub: string;
    heroCta: string;
    heroSecondary: string;
    aboutTag: string;
    aboutTitle: string;
    aboutP1: string;
    aboutP2: string;
    aboutLink: string;
    audienceTag: string;
    audienceTitle: string;
    benefitsTag: string;
    ctaTitle: string;
    ctaSub: string;
    ctaBtn: string;
    audiences: { title: string; desc: string }[];
    benefits: string[];
  };
  over: {
    tag: string;
    heroTitle: string;
    heroTitleEm: string;
    p1: string;
    p2: string;
    p3: string;
    heroCta: string;
    expertiseTitle: string;
    quoteTag: string;
    quote: string;
    quoteAuthor: string;
    ctaTitle: string;
    ctaSub: string;
    ctaBtn: string;
    ctaSecondary: string;
    credentials: { icon: string; title: string; desc: string }[];
  };
  lessen: {
    tag: string;
    heroTitle: string;
    heroTitleEm: string;
    heroSub: string;
    audienceTitle: string;
    audienceSub: string;
    equipmentTag: string;
    equipmentTitle: string;
    equipmentSub: string;
    ctaTitle: string;
    ctaSub: string;
    ctaBtn: string;
    bookNow: string;
    audiences: { icon: string; title: string; desc: string }[];
    equipment: { name: string; role: string }[];
  };
  prive: {
    tag: string;
    heroTitle: string;
    heroTitleEm: string;
    heroSub: string;
    approachTag: string;
    approachTitle: string;
    approachP1: string;
    approachP2: string;
    formatsTitle: string;
    individualTitle: string;
    individualSub: string;
    duoTitle: string;
    duoSub: string;
    viewPricing: string;
    ctaTitle: string;
    ctaSub: string;
    ctaBtn: string;
    individualBenefits: string[];
    duoBenefits: string[];
  };
  tarieven: {
    tag: string;
    heroTitle: string;
    heroSub: string;
    pricingNote: string;
    popular: string;
    individueel: string;
    duo: string;
    exclLabel: string;
    bookNow: string;
    policiesTitle: string;
    giftTitle: string;
    giftDesc: string;
    giftBtn: string;
    tiers: { label: string }[];
    policies: { title: string; desc: string }[];
  };
  contact: {
    tag: string;
    heroTitle: string;
    heroSub: string;
    infoTitle: string;
    formTitle: string;
    fieldNaam: string;
    fieldEmail: string;
    fieldTelefoon: string;
    fieldTelefoonOpt: string;
    fieldBericht: string;
    fieldNaamPlaceholder: string;
    fieldEmailPlaceholder: string;
    fieldTelefoonPlaceholder: string;
    fieldBerichtPlaceholder: string;
    submit: string;
    submitting: string;
    toastTitle: string;
    toastDesc: string;
    mapOpen: string;
    errNaam: string;
    errEmail: string;
    errEmailInvalid: string;
    errBericht: string;
    contactItems: { label: string }[];
  };
  medicalProfessionals: {
    navLabel: string;
    seoTitle: string;
    seoDesc: string;
    seoBreadcrumb: string;
    heroTag: string;
    heroTitle: string;
    heroTitleEm: string;
    heroP1: string;
    heroP2: string;
    ctaInfo: string;
    ctaContact: string;
    whoTag: string;
    whoTitle: string;
    whoTitleEm: string;
    whoP1: string;
    whoP2: string;
    clinicalTag: string;
    clinicalTitle: string;
    clinicalTitleEm: string;
    clinicalIntro: string;
    leftTitle: string;
    rightTitle: string;
    leftChecks: string[];
    rightChecks: string[];
    conditionsTag: string;
    conditionsTitle: string;
    conditionsTitleEm: string;
    conditionsIntro: string;
    conditionsList: string[];
    conditionsNote: string;
    referralTag: string;
    referralTitle: string;
    referralTitleEm: string;
    referralIntro: string;
    steps: { heading: string; body: string }[];
    quote: string;
    quoteAttribution: string;
    contactTag: string;
    contactTitle: string;
    contactTitleEm: string;
    contactIntro: string;
    contactDetailsTitle: string;
    contactLabels: string[];
    formName: string;
    formNamePlaceholder: string;
    formRole: string;
    formRolePlaceholder: string;
    roleOptions: string[];
    formPractice: string;
    formPracticePlaceholder: string;
    formEmail: string;
    formEmailPlaceholder: string;
    formPhone: string;
    formPhonePlaceholder: string;
    formMessage: string;
    formMessagePlaceholder: string;
    formSubmit: string;
    errName: string;
    errRole: string;
    errEmail: string;
    errEmailInvalid: string;
    errMessage: string;
    errConsent: string;
    successMedical: string;
    successPatient: string;
    footerNote1: string;
    footerNote2: string;
    footerCredits: string;
  };
}

const nl: Translations = {
  nav: {
    home: "Home",
    over: "Over Cintia",
    lessen: "Lessen",
    prive: "Privé Sessies",
    tarieven: "Tarieven",
    contact: "Contact",
    bookNow: "Boek Nu",
    menu: "Menu openen",
    menuClose: "Menu sluiten",
  },
  footer: {
    tagline:
      "Verantwoord Pilates — beweging die dient, niet eist. Onder begeleiding van Licentiate Kinesitherapiste Cintia.",
    navigation: "Navigatie",
    contact: "Contact",
    rights: "Alle rechten voorbehouden.",
  },
  home: {
    heroTag: "Physio-led Pilates · Schilde, België",
    heroTitle: "Pilates begeleid door een",
    heroTitleEm: "kinesitherapeute.",
    heroSub:
      "Preventief, persoonlijk en gefundeerd in klinische expertise.",
    heroCta: "Boek een Sessie",
    heroSecondary: "Over Cintia",
    aboutTag: "Over Cintia",
    aboutTitle: "Licentiate Kinesitherapie & Pilatesdocent",
    aboutP1:
      "Ik ben Licentiate Kinesitherapie en Pilatesdocent met meer dan 20 jaar ervaring in Brazilië, de Verenigde Staten en België.",
    aboutP2:
      "Pilates is altijd mijn grote passie geweest, met een sterke focus op preventief en bewust bewegen. Recent heb ik de overstap gemaakt naar fulltime Pilates lesgeven.",
    aboutLink: "Lees meer",
    audienceTag: "Pilates voor iedereen",
    audienceTitle: "Verantwoord Pilates op maat",
    benefitsTag: "Voordelen van de Pilatesmethode",
    ctaTitle: "Klaar om te beginnen?",
    ctaSub: "Neem contact op en plan je eerste sessie met Cintia.",
    ctaBtn: "Boek een sessie",
    audiences: [
      {
        title: "Beheer van Pijn & Klachten",
        desc: "Meer kracht, mobiliteit en betere bewegingskwaliteit, zonder rug- en gewrichtspijn.",
      },
      {
        title: "Revalidatie",
        desc: "Physio-led Pilates als onderdeel van je herstel naar dagelijkse beweging en sport na blessure of operatie.",
      },
      {
        title: "Beginners & Gevorderden",
        desc: "Beginners die hun lichaam beter willen leren kennen en sporters die hun prestaties willen ondersteunen.",
      },
      {
        title: "Pre- & Post-Nataal",
        desc: "Veilige en doeltreffende oefeningen die je helpen bewegen, voorbereiden en herstellen.",
      },
    ],
    benefits: [
      "Lichaamshouding",
      "Spierkracht & Kern",
      "Flexibiliteit",
      "Mobiliteit",
      "Coördinatie",
      "Stressreductie",
      "Mindfulness",
      "Ademhaling",
    ],
  },
  over: {
    tag: "Over Cintia",
    heroTitle: "Beweging vanuit",
    heroTitleEm: "kennis & passie",
    p1: "Ik ben Licentiate Kinesitherapie en Pilatesdocent met meer dan 20 jaar ervaring in Brazilië, de Verenigde Staten en België.",
    p2: "Pilates is altijd mijn grote passie geweest, met een sterke focus op preventief en bewust bewegen.",
    p3: "Recent heb ik de overstap gemaakt naar fulltime Pilates lesgeven, waarbij ik mijn uitgebreide kennis van anatomie en biomechanica inzet om veilige, doordachte en effectieve lessen aan te bieden.",
    heroCta: "Plan een sessie",
    expertiseTitle: "Expertise & Achtergrond",
    quoteTag: "Filosofie",
    quote: '"Verantwoord Pilates — beweging die dient, niet eist."',
    quoteAuthor: "— Cintia, Spessirits Pilates",
    ctaTitle: "Klaar voor jouw eerste sessie?",
    ctaSub: "Neem contact op met Cintia en ontdek hoe Pilates jou kan helpen.",
    ctaBtn: "Contacteer Cintia",
    ctaSecondary: "Bekijk tarieven",
    credentials: [
      {
        icon: "🌍",
        title: "Internationale Ervaring",
        desc: "Meer dan 20 jaar praktijkervaring in Brazilië, de Verenigde Staten en België — drie verschillende benaderingen, één gepassioneerde visie.",
      },
      {
        icon: "🎓",
        title: "Licentiate Kinesitherapie",
        desc: "Wetenschappelijke fundering in anatomie en biomechanica. Elke les is onderbouwd door diepgaande medische kennis.",
      },
      {
        icon: "🌿",
        title: "Pilatesdocent 20+ Jaar",
        desc: "Fulltime Pilatesdocent met een passie voor preventief en bewust bewegen. Veilige, doordachte en effectieve lessen.",
      },
    ],
  },
  lessen: {
    tag: "Lessen",
    heroTitle: "Individueel afgestemde",
    heroTitleEm: "Pilates",
    heroSub:
      "Verwacht geen standaardles, wel aandacht en respect voor het lichaam en beweging die dient — niet eist.",
    audienceTitle: "Pilates voor iedereen",
    audienceSub:
      'Dit is "verantwoord Pilates" — wat letsels op korte en lange termijn vermijdt.',
    equipmentTag: "Studio Uitrusting",
    equipmentTitle: "Pilates op maat — Individueel en Duo",
    equipmentSub:
      "Door Pilates in al haar vormen te gebruiken ontstaat er een rijkere, intelligentere manier van bewegen. Elk toestel voegt een eigen dimensie toe: ondersteuning waar nodig, uitdaging waar mogelijk en precisie tot in de kleinste details.",
    ctaTitle: "Nieuwsgierig geworden?",
    ctaSub: "Neem contact op met Cintia voor een gepersonaliseerde sessie.",
    ctaBtn: "Neem contact op",
    bookNow: "Boek Nu",
    audiences: [
      {
        icon: "🌿",
        title: "Beginners",
        desc: "Beginners die hun lichaam beter willen leren kennen. We starten rustig en bouwen op in je eigen tempo, met volle aandacht voor correcte uitvoering.",
      },
      {
        icon: "🏃",
        title: "Sporters",
        desc: "Sporters die hun prestaties willen ondersteunen. Pilates versterkt de kern, verbetert mobiliteit en helpt blessures voorkomen.",
      },
      {
        icon: "🌸",
        title: "Ouderen",
        desc: "Ouderen die mobiel, sterk en zelfstandig willen blijven. Beweging op maat die jouw lichaam respecteert en versterkt.",
      },
      {
        icon: "👶",
        title: "Pre- & Post-Nataal",
        desc: "Veilige en doeltreffende oefeningen die je helpen bewegen, voorbereiden en herstellen tijdens en na de zwangerschap.",
      },
    ],
    equipment: [
      { name: "Allegro Nextgen Reformer™ with Tower and Mat", role: "Kernapparaat voor weerstandstraining en kernkracht" },
      { name: "Ladder Barrel", role: "Rugverlenging, flexibiliteit en laterale bewegingen" },
      { name: "Chair", role: "Evenwicht, stabiliteit en functionele kracht" },
      { name: "Spine Corrector", role: "Rugcorrectie, thoracale mobiliteit en houding" },
      { name: "Arc", role: "Rugondersteuning en diepere rugstretch" },
      { name: "Oov", role: "Diepe kernactivatie en proprioceptie" },
      { name: "Konnections® Band", role: "Functionele weerstand en bewegingsvrijheid" },
      { name: "Spinefitter® by SISSEL®", role: "Wervelkolombeweeglijkheid en ontspanning" },
      { name: "Magic Roller®", role: "Myofasciale release en spierregeneratie" },
      { name: "Inflatable Ball", role: "Stabiliteit, evenwicht en zachte ondersteuning" },
    ],
  },
  prive: {
    tag: "Privé Sessies",
    heroTitle: "Pilates op maat —",
    heroTitleEm: "Individueel en Duo",
    heroSub:
      "Door Pilates in al haar vormen te gebruiken ontstaat er een rijkere, intelligentere manier van bewegen.",
    approachTag: "Onze aanpak",
    approachTitle: "Elke sessie is uniek",
    approachP1:
      'Elk toestel voegt een eigen dimensie toe: ondersteuning waar nodig, uitdaging waar mogelijk en precisie tot in de kleinste details. Dit is "verantwoord Pilates", wat letsels op korte en lange termijn vermijdt.',
    approachP2:
      "Verwacht geen standaardles, wel aandacht en respect voor het lichaam en beweging die dient — niet eist. Als Licentiate Kinesitherapiste zet Cintia haar uitgebreide kennis van anatomie en biomechanica in om veilige, doordachte en effectieve sessies aan te bieden.",
    formatsTitle: "Sessieformaten",
    individualTitle: "Individueel",
    individualSub: "Eén op één met Cintia",
    duoTitle: "Duo",
    duoSub: "Samen trainen met een partner",
    viewPricing: "Bekijk tarieven",
    ctaTitle: "Plan jouw privé sessie",
    ctaSub: "Contacteer Cintia en start jouw persoonlijk Pilatestraject.",
    ctaBtn: "Neem contact op",
    individualBenefits: [
      "Volledig op jouw lichaam en doelen afgestemde sessie",
      "Diepgaande begeleiding van Licentiate Kinesitherapiste",
      "Werkt aan specifieke klachten, blessures of revalidatie",
      "Flexibele planning op jouw ritme",
      "Gebruik van alle studiouitrusting",
    ],
    duoBenefits: [
      "Samen met een partner of vriend(in) trainen",
      "Kostenbesparing ten opzichte van twee individuele sessies",
      "Gemotiveerd en sociaal bewegen",
      "Elk duo-paar krijgt een aangepast programma",
      "Gebruik van alle studiouitrusting",
    ],
  },
  tarieven: {
    tag: "Tarieven 2026",
    heroTitle: "Transparante Prijzen",
    heroSub:
      "Kies het pakket dat bij jou past. Alle sessies zijn individueel afgestemd op jouw lichaam en doelen.",
    pricingNote:
      "(*) Prijzen exclusief BTW, niet geldig voor particuliere verkoop.",
    popular: "Meest Gekozen",
    individueel: "Individueel",
    duo: "Duo",
    exclLabel: "excl. BTW",
    bookNow: "Boek Nu",
    policiesTitle: "Praktische info",
    giftTitle: "Cadeaubons beschikbaar",
    giftDesc:
      "Geef het cadeau van bewust bewegen. Cadeaubons voor Pilates sessies bij Spessirits zijn verkrijgbaar. Neem contact op voor meer info.",
    giftBtn: "Meer info",
    tiers: [{ label: "1 Sessie" }, { label: "5 Sessies" }, { label: "10 Sessies" }],
    policies: [
      { title: "1 Uur per Sessie", desc: "Elke sessie duurt één uur." },
      { title: "24u Cancellation", desc: "Een sessie kan maximum 24 uur op voorhand gecancelled worden." },
      { title: "Vooraf Betalen", desc: "Sessies en pakketten dienen vooraf betaald te worden." },
      { title: "3 Maanden Geldig", desc: "Sessies zijn persoonlijk en drie maanden geldig vanaf de factuurdatum." },
    ],
  },
  contact: {
    tag: "Contact",
    heroTitle: "Neem contact op",
    heroSub:
      "Voor reservaties, vragen over lessen of tarieven — Cintia helpt je graag verder.",
    infoTitle: "Contactgegevens",
    formTitle: "Stuur een bericht",
    fieldNaam: "Naam",
    fieldEmail: "E-mail",
    fieldTelefoon: "Telefoon",
    fieldTelefoonOpt: "(optioneel)",
    fieldBericht: "Bericht",
    fieldNaamPlaceholder: "Jouw naam",
    fieldEmailPlaceholder: "jouw@email.com",
    fieldTelefoonPlaceholder: "+32 ...",
    fieldBerichtPlaceholder: "Stel hier jouw vraag of vertel wat je zoekt...",
    submit: "Verstuur bericht",
    submitting: "Versturen...",
    toastTitle: "Bericht verzonden! 🌿",
    toastDesc: "Cintia neemt zo snel mogelijk contact met je op.",
    mapOpen: "Open in Google Maps →",
    errNaam: "Naam is verplicht.",
    errEmail: "E-mailadres is verplicht.",
    errEmailInvalid: "Geldig e-mailadres vereist.",
    errBericht: "Bericht is verplicht.",
    contactItems: [
      { label: "Telefoon" },
      { label: "WhatsApp" },
      { label: "E-mail" },
      { label: "Adres" },
    ],
  },
  medicalProfessionals: {
    navLabel: "Voor Professionals",
    seoTitle: "Voor Medische Professionals — Spessirits Pilates",
    seoDesc: "Verwijs uw patiënten naar Pilates onder begeleiding van een kinesitherapeute. Cintia heeft meer dan 20 jaar klinische ervaring en biedt individuele revalidatiegerichte bewegingstherapie.",
    seoBreadcrumb: "Voor Medische Professionals",
    heroTag: "Voor Medische Professionals",
    heroTitle: "Beweging als therapie —",
    heroTitleEm: "voorgeschreven met precisie.",
    heroP1: "Cintia is een gediplomeerde kinesitherapeute met meer dan 20 jaar klinische ervaring.",
    heroP2: "Zoekt u een betrouwbare partner om de preventieve en revalidatieve beweging van uw patiënten te ondersteunen — dan bent u hier aan het juiste adres.",
    ctaInfo: "Informatiepakket aanvragen →",
    ctaContact: "Contact opnemen →",
    whoTag: "Voor wie",
    whoTitle: "Patiënten doorverwijzen naar",
    whoTitleEm: "kinesitherapeutisch geleide Pilates.",
    whoP1: "Deze pagina is geschreven voor huisartsen, kinesitherapeuten, orthopedisch specialisten, reumatologen, sportartsen en revalidatieteams.",
    whoP2: "Als u patiënten heeft die baat zouden hebben bij gestructureerde, individueel aangepaste bewegingstherapie — gefundeerd in kinesitherapie en gegeven in een privé, klinische setting — dan is de praktijk van Cintia precies wat ze nodig hebben.",
    clinicalTag: "Geen les. Geen fitness.",
    clinicalTitle: "Verantwoorde Pilates —",
    clinicalTitleEm: "geleid door klinische expertise.",
    clinicalIntro: "Spessirits is geen studio. Er zijn geen groepslessen van tien, geen gedeelde reformers, geen standaardprogramma's. Elke sessie is één-op-één, of af en toe één-op-twee op afspraak.",
    leftTitle: "Wat uw patiënt ontvangt",
    rightTitle: "Wat Cintia onderscheidt",
    leftChecks: [
      "Een volledige initiële beoordeling afgestemd op hun conditie en doelen",
      "Een programma opgebouwd rond hun lichaam — geen standaard lesplan",
      "Persoonlijke aandacht gedurende elke sessie",
      "Geleidelijke, evidence-based progressie",
      "Toegang tot een volledig uitgeruste privéstudio",
      "Een samenvattend rapport beschikbaar voor u op aanvraag",
    ],
    rightChecks: [
      "Gediplomeerde kinesitherapeute — geen fitnessinstructeur",
      "20+ jaar klinische en bewegingservaring",
      "Diepgaande kennis van anatomie, biomechanica en letselpatronen",
      "Preventief en revaliderend — niet prestatiegericht",
      "Maximaal twee cliënten tegelijk",
      "Werkt mét de doorverwijzende arts, niet eromheen",
    ],
    conditionsTag: "Aandoeningen die goed reageren",
    conditionsTitle: "Bewegingstherapie voor",
    conditionsTitleEm: "de patiënten die het meest baat hebben.",
    conditionsIntro: "Cintia werkt met patiënten wiens aandoeningen goed gediend worden door begeleide, low-impact, kinesitherapeutisch geïnformeerde beweging. Veelvoorkomende doorverwijzingsprofielen zijn:",
    conditionsList: [
      "Chronische lage rugpijn",
      "Nek- en cervicale spanning",
      "Postoperatieve revalidatie",
      "Artrose (heup, knie, wervelkolom)",
      "Scoliose en houdingsafwijkingen",
      "Hypermobiliteit en gewrichtsinstabiliteit",
      "Bekkenbodemproblematiek",
      "Pre- & postnatale revalidatie",
      "Balans en valpreventie",
      "Sedentaire leefstijlaandoeningen",
      "Stressgerelateerde musculoskeletale spanning",
      "Neurologische revalidatie (licht)",
    ],
    conditionsNote: "Niet zeker of Pilates geschikt is voor uw patiënt? Neem contact op — Cintia bespreekt het graag.",
    referralTag: "Eenvoudig doorverwijzen",
    referralTitle: "Drie stappen.",
    referralTitleEm: "Meer is er niet nodig.",
    referralIntro: "Een patiënt doorverwijzen naar Spessirits is eenvoudig. Geen verwijsformulieren, geen wachtlijsten, geen complexiteit.",
    steps: [
      { heading: "Stel Spessirits voor aan uw patiënt.", body: "Laat hen weten dat Cintia een gediplomeerde kinesitherapeute is die individuele Pilates-sessies aanbiedt vanuit een privéstudio in Schilde. De website bevat alles wat ze nodig hebben om de aanpak te begrijpen en zich comfortabel te voelen om contact op te nemen." },
      { heading: "Uw patiënt neemt rechtstreeks contact op.", body: "Ze kunnen Cintia bereiken via telefoon, WhatsApp of het contactformulier op deze pagina. Zij plant een eerste gesprek om hun geschiedenis, conditie en doelen te begrijpen — en te bevestigen dat kinesitherapeutisch geleide Pilates de juiste keuze is." },
      { heading: "Blijf op de hoogte, als u dat wenst.", body: "Na een initiële beoordeling stuurt Cintia graag een korte samenvatting naar de doorverwijzende arts — met toestemming van de patiënt. Ze ziet zichzelf als onderdeel van een breder zorgteam, niet als alternatief." },
    ],
    quote: "Pilates, wanneer geleid door iemand die het lichaam klinisch begrijpt, is een van de krachtigste preventieve middelen die we hebben. Ik wil de persoon zijn die uw patiënten vertrouwen om het goed te doen.",
    quoteAttribution: "Cintia Spessirits — Gediplomeerde Kinesitherapeute & Pilatesdocent",
    contactTag: "Contact opnemen",
    contactTitle: "Vraag het professionele",
    contactTitleEm: "informatiepakket aan.",
    contactIntro: "Of u nu een patiënt wilt doorverwijzen, ons klinisch informatiepakket wilt aanvragen of gewoon een vraag heeft — Cintia helpt u graag.",
    contactDetailsTitle: "Contactgegevens",
    contactLabels: ["TELEFOON", "WHATSAPP", "E-MAIL", "STUDIO"],
    formName: "Uw naam",
    formNamePlaceholder: "Dr. / Dhr. / Mevr. ...",
    formRole: "Ik ben een...",
    formRolePlaceholder: "Selecteer uw rol...",
    roleOptions: [
      "Huisarts",
      "Kinesitherapeut",
      "Orthopedisch of sportspecialist",
      "Andere medische professional",
      "Patiënt of potentiële cliënt",
    ],
    formPractice: "Praktijk- of kliniknaam",
    formPracticePlaceholder: "Optioneel",
    formEmail: "E-mail",
    formEmailPlaceholder: "uw@email.com",
    formPhone: "Telefoon",
    formPhonePlaceholder: "+32 ...",
    formMessage: "Bericht",
    formMessagePlaceholder: "Vertel ons over uw patiënt, of stel een vraag...",
    formSubmit: "Bericht versturen →",
    errName: "Naam is verplicht.",
    errRole: "Selecteer een rol.",
    errEmail: "E-mailadres is verplicht.",
    errEmailInvalid: "Voer een geldig e-mailadres in.",
    errMessage: "Bericht is verplicht.",
    errConsent: "U moet akkoord gaan met het privacybeleid.",
    successMedical: "Bedankt. Ons professionele informatiepakket is onderweg naar uw inbox. Cintia neemt binnenkort contact met u op.",
    successPatient: "Bedankt voor uw bericht. Cintia neemt zo snel mogelijk persoonlijk contact met u op.",
    footerNote1: "Uw aanvraag wordt met volledige discretie behandeld.",
    footerNote2: "Patiëntinformatie wordt nooit gedeeld zonder toestemming.",
    footerCredits: "Cintia Spessirits · Gediplomeerde Kinesitherapeute · Cirkellaan 12, 2970 Schilde · info@spessirits.com",
  },
};

const en: Translations = {
  nav: {
    home: "Home",
    over: "About Cintia",
    lessen: "Classes",
    prive: "Private Sessions",
    tarieven: "Pricing",
    contact: "Contact",
    bookNow: "Book Now",
    menu: "Open menu",
    menuClose: "Close menu",
  },
  footer: {
    tagline:
      "Responsible Pilates — movement that serves, not demands. Guided by licensed physiotherapist Cintia.",
    navigation: "Navigation",
    contact: "Contact",
    rights: "All rights reserved.",
  },
  home: {
    heroTag: "Physio-led Pilates · Schilde, Belgium",
    heroTitle: "Pilates guided by a",
    heroTitleEm: "physiotherapist.",
    heroSub:
      "Preventive, personal, and grounded in clinical expertise.",
    heroCta: "Book a Session",
    heroSecondary: "About Cintia",
    aboutTag: "About Cintia",
    aboutTitle: "Licensed Physiotherapist & Pilates Teacher",
    aboutP1:
      "I am a licensed physiotherapist and Pilates teacher with over 20 years of experience in Brazil, the United States and Belgium.",
    aboutP2:
      "Pilates has always been my great passion, with a strong focus on preventive and mindful movement. I recently transitioned to teaching Pilates full-time.",
    aboutLink: "Read more",
    audienceTag: "Pilates for everyone",
    audienceTitle: "Responsible Pilates — tailored to you",
    benefitsTag: "Benefits of the Pilates method",
    ctaTitle: "Ready to begin?",
    ctaSub: "Get in touch and schedule your first session with Cintia.",
    ctaBtn: "Book a session",
    audiences: [
      {
        title: "Pain & Complaint Management",
        desc: "More strength, mobility and better movement quality — without back and joint pain.",
      },
      {
        title: "Rehabilitation",
        desc: "Physio-led Pilates as part of your recovery toward daily movement and sport after injury or surgery.",
      },
      {
        title: "Beginners & Advanced",
        desc: "Beginners who want to get to know their body better, and athletes who want to support their performance.",
      },
      {
        title: "Pre- & Post-Natal",
        desc: "Safe and effective exercises to help you move, prepare and recover.",
      },
    ],
    benefits: [
      "Posture",
      "Core Strength",
      "Flexibility",
      "Mobility",
      "Coordination",
      "Stress Reduction",
      "Mindfulness",
      "Breathwork",
    ],
  },
  over: {
    tag: "About Cintia",
    heroTitle: "Movement rooted in",
    heroTitleEm: "knowledge & passion",
    p1: "I am a licensed physiotherapist and Pilates teacher with over 20 years of experience in Brazil, the United States and Belgium.",
    p2: "Pilates has always been my great passion, with a strong focus on preventive and mindful movement.",
    p3: "I recently transitioned to teaching Pilates full-time, drawing on my extensive knowledge of anatomy and biomechanics to offer safe, thoughtful and effective classes.",
    heroCta: "Plan a session",
    expertiseTitle: "Expertise & Background",
    quoteTag: "Philosophy",
    quote: '"Responsible Pilates — movement that serves, not demands."',
    quoteAuthor: "— Cintia, Spessirits Pilates",
    ctaTitle: "Ready for your first session?",
    ctaSub: "Get in touch with Cintia and discover how Pilates can help you.",
    ctaBtn: "Contact Cintia",
    ctaSecondary: "View pricing",
    credentials: [
      {
        icon: "🌍",
        title: "International Experience",
        desc: "Over 20 years of hands-on experience in Brazil, the United States and Belgium — three different approaches, one passionate vision.",
      },
      {
        icon: "🎓",
        title: "Licensed Physiotherapist",
        desc: "Scientific grounding in anatomy and biomechanics. Every class is backed by in-depth medical knowledge.",
      },
      {
        icon: "🌿",
        title: "Pilates Teacher 20+ Years",
        desc: "Full-time Pilates teacher with a passion for preventive and mindful movement. Safe, thoughtful and effective classes.",
      },
    ],
  },
  lessen: {
    tag: "Classes",
    heroTitle: "Individually tailored",
    heroTitleEm: "Pilates",
    heroSub:
      "Don't expect a standard class — expect mindful attention and respect for your body, movement that serves rather than demands.",
    audienceTitle: "Pilates for everyone",
    audienceSub:
      'This is "responsible Pilates" — which prevents injuries in both the short and long term.',
    equipmentTag: "Studio Equipment",
    equipmentTitle: "Pilates tailored — Individual and Duo",
    equipmentSub:
      "Using Pilates in all its forms creates a richer, more intelligent way of moving. Each apparatus adds its own dimension: support where needed, challenge where possible, and precision down to the smallest detail.",
    ctaTitle: "Curious to find out more?",
    ctaSub: "Get in touch with Cintia for a personalised session.",
    ctaBtn: "Get in touch",
    bookNow: "Book Now",
    audiences: [
      {
        icon: "🌿",
        title: "Beginners",
        desc: "Beginners who want to get to know their body better. We start gently and build at your own pace, with full attention to correct technique.",
      },
      {
        icon: "🏃",
        title: "Athletes",
        desc: "Athletes who want to support their performance. Pilates strengthens the core, improves mobility and helps prevent injuries.",
      },
      {
        icon: "🌸",
        title: "Seniors",
        desc: "Seniors who want to stay mobile, strong and independent. Tailored movement that respects and strengthens your body.",
      },
      {
        icon: "👶",
        title: "Pre- & Post-Natal",
        desc: "Safe and effective exercises to help you move, prepare and recover during and after pregnancy.",
      },
    ],
    equipment: [
      { name: "Allegro Nextgen Reformer™ with Tower and Mat", role: "Core apparatus for resistance training and core strength" },
      { name: "Ladder Barrel", role: "Spinal extension, flexibility and lateral movements" },
      { name: "Chair", role: "Balance, stability and functional strength" },
      { name: "Spine Corrector", role: "Spinal correction, thoracic mobility and posture" },
      { name: "Arc", role: "Back support and deeper spinal stretch" },
      { name: "Oov", role: "Deep core activation and proprioception" },
      { name: "Konnections® Band", role: "Functional resistance and freedom of movement" },
      { name: "Spinefitter® by SISSEL®", role: "Spinal mobility and relaxation" },
      { name: "Magic Roller®", role: "Myofascial release and muscle regeneration" },
      { name: "Inflatable Ball", role: "Stability, balance and gentle support" },
    ],
  },
  prive: {
    tag: "Private Sessions",
    heroTitle: "Pilates tailored to you —",
    heroTitleEm: "Individual and Duo",
    heroSub:
      "Using Pilates in all its forms creates a richer, more intelligent way of moving.",
    approachTag: "Our approach",
    approachTitle: "Every session is unique",
    approachP1:
      'Each apparatus adds its own dimension: support where needed, challenge where possible, and precision down to the smallest detail. This is "responsible Pilates" — which prevents injuries in both the short and long term.',
    approachP2:
      "Don't expect a standard class — expect mindful attention and respect for your body. As a licensed physiotherapist, Cintia draws on her extensive knowledge of anatomy and biomechanics to offer safe, thoughtful and effective sessions.",
    formatsTitle: "Session formats",
    individualTitle: "Individual",
    individualSub: "One-on-one with Cintia",
    duoTitle: "Duo",
    duoSub: "Train together with a partner",
    viewPricing: "View pricing",
    ctaTitle: "Plan your private session",
    ctaSub: "Contact Cintia and start your personal Pilates journey.",
    ctaBtn: "Get in touch",
    individualBenefits: [
      "Session fully tailored to your body and goals",
      "In-depth guidance from a licensed physiotherapist",
      "Addresses specific complaints, injuries or rehabilitation",
      "Flexible scheduling at your own pace",
      "Access to all studio equipment",
    ],
    duoBenefits: [
      "Train together with a partner or friend",
      "Cost savings compared to two individual sessions",
      "Motivated and social movement",
      "Each duo pair receives a tailored programme",
      "Access to all studio equipment",
    ],
  },
  tarieven: {
    tag: "Pricing 2026",
    heroTitle: "Transparent Pricing",
    heroSub:
      "Choose the package that suits you. All sessions are individually tailored to your body and goals.",
    pricingNote: "(*) Prices excluding VAT, not valid for private sales.",
    popular: "Most Popular",
    individueel: "Individual",
    duo: "Duo",
    exclLabel: "excl. VAT",
    bookNow: "Book Now",
    policiesTitle: "Practical information",
    giftTitle: "Gift vouchers available",
    giftDesc:
      "Give the gift of mindful movement. Gift vouchers for Pilates sessions at Spessirits are available. Get in touch for more information.",
    giftBtn: "More info",
    tiers: [{ label: "1 Session" }, { label: "5 Sessions" }, { label: "10 Sessions" }],
    policies: [
      { title: "1 Hour per Session", desc: "Each session lasts one hour." },
      { title: "24h Cancellation", desc: "A session can be cancelled up to 24 hours in advance." },
      { title: "Pay in Advance", desc: "Sessions and packages must be paid in advance." },
      { title: "Valid 3 Months", desc: "Sessions are personal and valid for three months from the invoice date." },
    ],
  },
  contact: {
    tag: "Contact",
    heroTitle: "Get in touch",
    heroSub:
      "For bookings, questions about classes or pricing — Cintia is happy to help.",
    infoTitle: "Contact details",
    formTitle: "Send a message",
    fieldNaam: "Name",
    fieldEmail: "Email",
    fieldTelefoon: "Phone",
    fieldTelefoonOpt: "(optional)",
    fieldBericht: "Message",
    fieldNaamPlaceholder: "Your name",
    fieldEmailPlaceholder: "your@email.com",
    fieldTelefoonPlaceholder: "+32 ...",
    fieldBerichtPlaceholder: "Ask your question or tell us what you're looking for...",
    submit: "Send message",
    submitting: "Sending...",
    toastTitle: "Message sent! 🌿",
    toastDesc: "Cintia will get back to you as soon as possible.",
    mapOpen: "Open in Google Maps →",
    errNaam: "Name is required.",
    errEmail: "Email address is required.",
    errEmailInvalid: "A valid email address is required.",
    errBericht: "Message is required.",
    contactItems: [
      { label: "Phone" },
      { label: "WhatsApp" },
      { label: "Email" },
      { label: "Address" },
    ],
  },
};

// ─── French translations ────────────────────────────────────────────────────
// Professional, warm tone. 'vous' form throughout. Adapted for Belgian/Dutch
// professional and sports audience. Remove by setting ENABLE_FRENCH = false.
const fr: Translations = {
  nav: {
    home: "Accueil",
    over: "À propos de Cintia",
    lessen: "Cours",
    prive: "Séances Privées",
    tarieven: "Tarifs",
    contact: "Contact",
    bookNow: "Réserver",
    menu: "Ouvrir le menu",
    menuClose: "Fermer le menu",
  },
  footer: {
    tagline:
      "Pilates responsable — un mouvement qui sert, sans contraindre. Guidé par Cintia, kinésithérapeute licenciée.",
    navigation: "Navigation",
    contact: "Contact",
    rights: "Tous droits réservés.",
  },
  home: {
    heroTag: "Pilates guidé par une kiné · Schilde, Belgique",
    heroTitle: "Pilates guidé par une",
    heroTitleEm: "kinésithérapeute.",
    heroSub:
      "Préventif, personnel et ancré dans l'expertise clinique.",
    heroCta: "Réserver une séance",
    heroSecondary: "À propos de Cintia",
    aboutTag: "À propos de Cintia",
    aboutTitle: "Kinésithérapeute licenciée & professeure de Pilates",
    aboutP1:
      "Je suis kinésithérapeute licenciée et professeure de Pilates, avec plus de 20 ans d'expérience au Brésil, aux États-Unis et en Belgique.",
    aboutP2:
      "Le Pilates a toujours été ma grande passion, avec une attention particulière portée au mouvement préventif et conscient. J'ai récemment fait le choix de me consacrer pleinement à l'enseignement du Pilates.",
    aboutLink: "En savoir plus",
    audienceTag: "Le Pilates pour tous",
    audienceTitle: "Un Pilates responsable, adapté à chacun",
    benefitsTag: "Les bienfaits de la méthode Pilates",
    ctaTitle: "Prêt(e) à commencer ?",
    ctaSub: "Contactez-nous et planifiez votre première séance avec Cintia.",
    ctaBtn: "Réserver une séance",
    audiences: [
      {
        title: "Gestion de la douleur & des plaintes",
        desc: "Plus de force, de mobilité et une meilleure qualité de mouvement — sans douleurs dorsales ni articulaires.",
      },
      {
        title: "Rééducation",
        desc: "Un Pilates guidé par une kinésithérapeute, intégré à votre parcours de récupération après une blessure ou une opération.",
      },
      {
        title: "Débutants & Avancés",
        desc: "Des débutants souhaitant mieux connaître leur corps aux sportifs cherchant à optimiser leurs performances.",
      },
      {
        title: "Pré- & Post-Natal",
        desc: "Des exercices sûrs et efficaces pour vous aider à bouger, vous préparer et récupérer.",
      },
    ],
    benefits: [
      "Posture",
      "Force & Gainage",
      "Souplesse",
      "Mobilité",
      "Coordination",
      "Réduction du stress",
      "Pleine conscience",
      "Respiration",
    ],
  },
  over: {
    tag: "À propos de Cintia",
    heroTitle: "Un mouvement ancré dans",
    heroTitleEm: "la connaissance & la passion",
    p1: "Je suis kinésithérapeute licenciée et professeure de Pilates, avec plus de 20 ans d'expérience au Brésil, aux États-Unis et en Belgique.",
    p2: "Le Pilates a toujours été ma grande passion, avec une attention particulière portée au mouvement préventif et conscient.",
    p3: "J'ai récemment choisi de me consacrer pleinement à l'enseignement du Pilates, en m'appuyant sur mes connaissances approfondies en anatomie et biomécanique pour proposer des séances sûres, réfléchies et efficaces.",
    heroCta: "Planifier une séance",
    expertiseTitle: "Expertise & Parcours",
    quoteTag: "Philosophie",
    quote: '"Pilates responsable — un mouvement qui sert, sans contraindre."',
    quoteAuthor: "— Cintia, Spessirits Pilates",
    ctaTitle: "Prêt(e) pour votre première séance ?",
    ctaSub: "Contactez Cintia et découvrez comment le Pilates peut vous aider.",
    ctaBtn: "Contacter Cintia",
    ctaSecondary: "Voir les tarifs",
    credentials: [
      {
        icon: "🌍",
        title: "Expérience internationale",
        desc: "Plus de 20 ans d'expérience pratique au Brésil, aux États-Unis et en Belgique — trois approches différentes, une vision passionnée.",
      },
      {
        icon: "🎓",
        title: "Kinésithérapeute licenciée",
        desc: "Une base scientifique solide en anatomie et biomécanique. Chaque séance est fondée sur des connaissances médicales approfondies.",
      },
      {
        icon: "🌿",
        title: "Professeure de Pilates depuis 20+ ans",
        desc: "Professeure de Pilates à temps plein, animée par la passion du mouvement préventif et conscient. Des séances sûres, réfléchies et efficaces.",
      },
    ],
  },
  lessen: {
    tag: "Cours",
    heroTitle: "Un Pilates",
    heroTitleEm: "personnalisé",
    heroSub:
      "N'attendez pas un cours ordinaire — attendez-vous à une attention sincère et un respect du corps.",
    audienceTitle: "Le Pilates pour tous",
    audienceSub:
      'C\'est le "Pilates responsable" — qui prévient les blessures à court et long terme.',
    equipmentTag: "Équipement du Studio",
    equipmentTitle: "Pilates sur mesure — Individuel et Duo",
    equipmentSub:
      "Pratiquer le Pilates sous toutes ses formes crée une façon de bouger plus riche et plus intelligente. Chaque appareil apporte sa propre dimension : soutien là où c'est nécessaire, défi là où c'est possible, et précision jusqu'au moindre détail.",
    ctaTitle: "Vous souhaitez en savoir plus ?",
    ctaSub: "Contactez Cintia pour une séance personnalisée.",
    ctaBtn: "Prendre contact",
    bookNow: "Réserver",
    audiences: [
      {
        icon: "🌿",
        title: "Débutants",
        desc: "Pour ceux qui souhaitent mieux connaître leur corps. Nous progressons à votre rythme, en veillant à une exécution correcte.",
      },
      {
        icon: "🏃",
        title: "Sportifs",
        desc: "Pour les sportifs souhaitant optimiser leurs performances. Le Pilates renforce le gainage, améliore la mobilité et aide à prévenir les blessures.",
      },
      {
        icon: "🌸",
        title: "Seniors",
        desc: "Pour les seniors souhaitant rester mobiles, forts et autonomes. Un mouvement adapté qui respecte et renforce votre corps.",
      },
      {
        icon: "👶",
        title: "Pré- & Post-Natal",
        desc: "Des exercices sûrs et efficaces pour bouger, vous préparer et récupérer pendant et après la grossesse.",
      },
    ],
    equipment: [
      { name: "Allegro Nextgen Reformer™ with Tower and Mat", role: "Appareil central pour la musculation par résistance et le gainage" },
      { name: "Ladder Barrel", role: "Extension du dos, souplesse et mouvements latéraux" },
      { name: "Chair", role: "Équilibre, stabilité et force fonctionnelle" },
      { name: "Spine Corrector", role: "Correction vertébrale, mobilité thoracique et posture" },
      { name: "Arc", role: "Soutien du dos et étirement vertébral en profondeur" },
      { name: "Oov", role: "Activation profonde du gainage et proprioception" },
      { name: "Konnections® Band", role: "Résistance fonctionnelle et liberté de mouvement" },
      { name: "Spinefitter® by SISSEL®", role: "Mobilité vertébrale et relaxation" },
      { name: "Magic Roller®", role: "Relâchement myofascial et régénération musculaire" },
      { name: "Inflatable Ball", role: "Stabilité, équilibre et soutien en douceur" },
    ],
  },
  prive: {
    tag: "Séances Privées",
    heroTitle: "Un Pilates adapté —",
    heroTitleEm: "Individuel et Duo",
    heroSub:
      "Pratiquer le Pilates sous toutes ses formes crée une façon de bouger plus riche et plus intelligente.",
    approachTag: "Notre approche",
    approachTitle: "Chaque séance est unique",
    approachP1:
      'Chaque appareil apporte sa propre dimension : soutien là où c\'est nécessaire, défi là où c\'est possible, et précision jusqu\'au moindre détail. C\'est le "Pilates responsable", qui prévient les blessures à court et long terme.',
    approachP2:
      "N'attendez pas un cours ordinaire — attendez-vous à une attention sincère et un respect du corps. En tant que kinésithérapeute licenciée, Cintia met ses connaissances approfondies en anatomie et biomécanique au service de séances sûres, réfléchies et efficaces.",
    formatsTitle: "Formats de séance",
    individualTitle: "Individuel",
    individualSub: "En tête-à-tête avec Cintia",
    duoTitle: "Duo",
    duoSub: "Entraînez-vous avec un(e) partenaire",
    viewPricing: "Voir les tarifs",
    ctaTitle: "Planifiez votre séance privée",
    ctaSub: "Contactez Cintia et commencez votre parcours Pilates personnalisé.",
    ctaBtn: "Prendre contact",
    individualBenefits: [
      "Séance entièrement adaptée à votre corps et à vos objectifs",
      "Accompagnement approfondi par une kinésithérapeute licenciée",
      "Prise en charge des plaintes spécifiques, blessures ou rééducation",
      "Planning flexible à votre rythme",
      "Accès à tout l'équipement du studio",
    ],
    duoBenefits: [
      "Entraînez-vous avec un(e) partenaire ou ami(e)",
      "Économies par rapport à deux séances individuelles",
      "Un mouvement motivant et convivial",
      "Chaque duo bénéficie d'un programme adapté",
      "Accès à tout l'équipement du studio",
    ],
  },
  tarieven: {
    tag: "Tarifs 2026",
    heroTitle: "Tarifs transparents",
    heroSub:
      "Choisissez la formule qui vous convient. Toutes les séances sont individuellement adaptées à votre corps et à vos objectifs.",
    pricingNote:
      "(*) Prix hors TVA, non valables pour la vente aux particuliers.",
    popular: "Le plus choisi",
    individueel: "Individuel",
    duo: "Duo",
    exclLabel: "hors TVA",
    bookNow: "Réserver",
    policiesTitle: "Informations pratiques",
    giftTitle: "Bons cadeaux disponibles",
    giftDesc:
      "Offrez le cadeau du mouvement conscient. Des bons cadeaux pour des séances de Pilates chez Spessirits sont disponibles. Contactez-nous pour plus d'informations.",
    giftBtn: "Plus d'infos",
    tiers: [{ label: "1 Séance" }, { label: "5 Séances" }, { label: "10 Séances" }],
    policies: [
      { title: "1 heure par séance", desc: "Chaque séance dure une heure." },
      { title: "Annulation 24h", desc: "Une séance peut être annulée jusqu'à 24 heures à l'avance." },
      { title: "Paiement à l'avance", desc: "Les séances et forfaits doivent être réglés à l'avance." },
      { title: "Valable 3 mois", desc: "Les séances sont personnelles et valables trois mois à compter de la date de facturation." },
    ],
  },
  contact: {
    tag: "Contact",
    heroTitle: "Contactez-nous",
    heroSub:
      "Pour les réservations, les questions sur les cours ou les tarifs — Cintia est à votre disposition.",
    infoTitle: "Coordonnées",
    formTitle: "Envoyez un message",
    fieldNaam: "Nom",
    fieldEmail: "E-mail",
    fieldTelefoon: "Téléphone",
    fieldTelefoonOpt: "(optionnel)",
    fieldBericht: "Message",
    fieldNaamPlaceholder: "Votre nom",
    fieldEmailPlaceholder: "votre@email.com",
    fieldTelefoonPlaceholder: "+32 ...",
    fieldBerichtPlaceholder: "Posez votre question ou dites-nous ce que vous recherchez...",
    submit: "Envoyer le message",
    submitting: "Envoi en cours...",
    toastTitle: "Message envoyé ! 🌿",
    toastDesc: "Cintia vous contactera dans les plus brefs délais.",
    mapOpen: "Ouvrir dans Google Maps →",
    errNaam: "Le nom est obligatoire.",
    errEmail: "L'adresse e-mail est obligatoire.",
    errEmailInvalid: "Une adresse e-mail valide est requise.",
    errBericht: "Le message est obligatoire.",
    contactItems: [
      { label: "Téléphone" },
      { label: "WhatsApp" },
      { label: "E-mail" },
      { label: "Adresse" },
    ],
  },
};
// ───────────────────────────────────────────────────────────────────────────

// ─── Brazilian Portuguese translations ─────────────────────────────────────
// Professional, warm diplomatic tone. 'você' form throughout.
// Adapted for Brazilian physiotherapy & sports audience.
// Remove by setting ENABLE_PORTUGUESE = false.
const pt: Translations = {
  nav: {
    home: "Início",
    over: "Sobre a Cintia",
    lessen: "Aulas",
    prive: "Sessões Privadas",
    tarieven: "Preços",
    contact: "Contato",
    bookNow: "Agendar",
    menu: "Abrir menu",
    menuClose: "Fechar menu",
  },
  footer: {
    tagline:
      "Pilates Responsável — um movimento que serve, sem exigir. Conduzido pela fisioterapeuta licenciada Cintia.",
    navigation: "Navegação",
    contact: "Contato",
    rights: "Todos os direitos reservados.",
  },
  home: {
    heroTag: "Pilates com orientação fisioterapêutica · Schilde, Bélgica",
    heroTitle: "Pilates orientado por uma",
    heroTitleEm: "fisioterapeuta.",
    heroSub:
      "Preventivo, pessoal e baseado em expertise clínica.",
    heroCta: "Agendar uma Sessão",
    heroSecondary: "Sobre a Cintia",
    aboutTag: "Sobre a Cintia",
    aboutTitle: "Fisioterapeuta Licenciada & Professora de Pilates",
    aboutP1:
      "Sou fisioterapeuta licenciada e professora de Pilates, com mais de 20 anos de experiência no Brasil, nos Estados Unidos e na Bélgica.",
    aboutP2:
      "O Pilates sempre foi a minha grande paixão, com foco especial no movimento preventivo e consciente. Recentemente, decidi me dedicar integralmente ao ensino do Pilates.",
    aboutLink: "Saiba mais",
    audienceTag: "Pilates para todos",
    audienceTitle: "Pilates Responsável, adaptado para você",
    benefitsTag: "Benefícios do Método Pilates",
    ctaTitle: "Pronto(a) para começar?",
    ctaSub: "Entre em contato e agende a sua primeira sessão com a Cintia.",
    ctaBtn: "Agendar uma sessão",
    audiences: [
      {
        title: "Gestão da Dor & Queixas",
        desc: "Mais força, mobilidade e qualidade de movimento — sem dores nas costas ou nas articulações.",
      },
      {
        title: "Reabilitação",
        desc: "Pilates com orientação fisioterapêutica como parte da sua recuperação após uma lesão ou cirurgia.",
      },
      {
        title: "Iniciantes & Avançados",
        desc: "Dos iniciantes que desejam conhecer melhor o próprio corpo aos atletas que buscam potencializar o seu desempenho.",
      },
      {
        title: "Pré- & Pós-Natal",
        desc: "Exercícios seguros e eficazes para ajudá-la a se movimentar, se preparar e se recuperar.",
      },
    ],
    benefits: [
      "Postura",
      "Força & Core",
      "Flexibilidade",
      "Mobilidade",
      "Coordenação",
      "Redução do Estresse",
      "Consciência Corporal",
      "Respiração",
    ],
  },
  over: {
    tag: "Sobre a Cintia",
    heroTitle: "Um movimento fundamentado em",
    heroTitleEm: "conhecimento & paixão",
    p1: "Sou fisioterapeuta licenciada e professora de Pilates, com mais de 20 anos de experiência no Brasil, nos Estados Unidos e na Bélgica.",
    p2: "O Pilates sempre foi a minha grande paixão, com foco especial no movimento preventivo e consciente.",
    p3: "Recentemente, optei por me dedicar integralmente ao ensino do Pilates, utilizando o meu profundo conhecimento em anatomia e biomecânica para oferecer sessões seguras, criteriosas e eficazes.",
    heroCta: "Agendar uma sessão",
    expertiseTitle: "Formação & Experiência",
    quoteTag: "Filosofia",
    quote: '"Pilates Responsável — um movimento que serve, sem exigir."',
    quoteAuthor: "— Cintia, Spessirits Pilates",
    ctaTitle: "Pronto(a) para a sua primeira sessão?",
    ctaSub: "Entre em contato com a Cintia e descubra como o Pilates pode ajudá-lo(a).",
    ctaBtn: "Falar com a Cintia",
    ctaSecondary: "Ver os preços",
    credentials: [
      {
        icon: "🌍",
        title: "Experiência Internacional",
        desc: "Mais de 20 anos de experiência prática no Brasil, nos Estados Unidos e na Bélgica — três abordagens distintas, uma visão apaixonada.",
      },
      {
        icon: "🎓",
        title: "Fisioterapeuta Licenciada",
        desc: "Sólida base científica em anatomia e biomecânica. Cada sessão é sustentada por um profundo conhecimento clínico.",
      },
      {
        icon: "🌿",
        title: "Professora de Pilates há 20+ anos",
        desc: "Professora de Pilates em dedicação exclusiva, movida pela paixão pelo movimento preventivo e consciente. Sessões seguras, criteriosas e eficazes.",
      },
    ],
  },
  lessen: {
    tag: "Aulas",
    heroTitle: "Pilates",
    heroTitleEm: "personalizado",
    heroSub:
      "Não espere uma aula comum — espere atenção genuína e respeito pelo seu corpo.",
    audienceTitle: "Pilates para todos",
    audienceSub:
      'Este é o "Pilates Responsável" — que previne lesões a curto e longo prazo.',
    equipmentTag: "Equipamentos do Estúdio",
    equipmentTitle: "Pilates sob medida — Individual e Duo",
    equipmentSub:
      "Praticar o Pilates em todas as suas formas cria uma maneira mais rica e inteligente de se movimentar. Cada aparelho contribui com a sua própria dimensão: suporte onde é necessário, desafio onde é possível e precisão até o mínimo detalhe.",
    ctaTitle: "Ficou curioso(a)?",
    ctaSub: "Entre em contato com a Cintia para uma sessão personalizada.",
    ctaBtn: "Entrar em contato",
    bookNow: "Agendar",
    audiences: [
      {
        icon: "🌿",
        title: "Iniciantes",
        desc: "Para quem deseja conhecer melhor o próprio corpo. Começamos com calma e evoluímos no seu ritmo, com total atenção à execução correta.",
      },
      {
        icon: "🏃",
        title: "Atletas",
        desc: "Para atletas que buscam potencializar o desempenho. O Pilates fortalece o core, melhora a mobilidade e ajuda a prevenir lesões.",
      },
      {
        icon: "🌸",
        title: "Terceira Idade",
        desc: "Para quem deseja manter mobilidade, força e independência. Um movimento adaptado que respeita e fortalece o seu corpo.",
      },
      {
        icon: "👶",
        title: "Pré- & Pós-Natal",
        desc: "Exercícios seguros e eficazes para ajudá-la a se movimentar, se preparar e se recuperar durante e após a gestação.",
      },
    ],
    equipment: [
      { name: "Allegro Nextgen Reformer™ with Tower and Mat", role: "Aparelho central para treinamento de resistência e fortalecimento do core" },
      { name: "Ladder Barrel", role: "Extensão da coluna, flexibilidade e movimentos laterais" },
      { name: "Chair", role: "Equilíbrio, estabilidade e força funcional" },
      { name: "Spine Corrector", role: "Correção postural, mobilidade torácica e alinhamento" },
      { name: "Arc", role: "Suporte para a coluna e alongamento profundo" },
      { name: "Oov", role: "Ativação profunda do core e propriocepção" },
      { name: "Konnections® Band", role: "Resistência funcional e liberdade de movimento" },
      { name: "Spinefitter® by SISSEL®", role: "Mobilidade da coluna e relaxamento" },
      { name: "Magic Roller®", role: "Liberação miofascial e regeneração muscular" },
      { name: "Inflatable Ball", role: "Estabilidade, equilíbrio e suporte suave" },
    ],
  },
  prive: {
    tag: "Sessões Privadas",
    heroTitle: "Pilates sob medida —",
    heroTitleEm: "Individual e Duo",
    heroSub:
      "Praticar o Pilates em todas as suas formas cria uma maneira mais rica e inteligente de se movimentar.",
    approachTag: "Nossa abordagem",
    approachTitle: "Cada sessão é única",
    approachP1:
      'Cada aparelho contribui com a sua própria dimensão: suporte onde é necessário, desafio onde é possível e precisão até o mínimo detalhe. Este é o "Pilates Responsável", que previne lesões a curto e longo prazo.',
    approachP2:
      "Não espere uma aula comum — espere atenção genuína e respeito pelo seu corpo. Como fisioterapeuta licenciada, a Cintia utiliza o seu profundo conhecimento de anatomia e biomecânica para oferecer sessões seguras, criteriosas e eficazes.",
    formatsTitle: "Formatos de Sessão",
    individualTitle: "Individual",
    individualSub: "Um a um com a Cintia",
    duoTitle: "Duo",
    duoSub: "Treine com um(a) parceiro(a)",
    viewPricing: "Ver os preços",
    ctaTitle: "Agende a sua sessão privada",
    ctaSub: "Entre em contato com a Cintia e inicie a sua jornada pessoal de Pilates.",
    ctaBtn: "Entrar em contato",
    individualBenefits: [
      "Sessão totalmente adaptada ao seu corpo e aos seus objetivos",
      "Acompanhamento aprofundado por uma fisioterapeuta licenciada",
      "Abordagem de queixas específicas, lesões ou reabilitação",
      "Agendamento flexível no seu ritmo",
      "Acesso a todos os equipamentos do estúdio",
    ],
    duoBenefits: [
      "Treine com um(a) parceiro(a) ou amigo(a)",
      "Economia em relação a duas sessões individuais",
      "Um movimento motivador e descontraído",
      "Cada dupla recebe um programa personalizado",
      "Acesso a todos os equipamentos do estúdio",
    ],
  },
  tarieven: {
    tag: "Preços 2026",
    heroTitle: "Preços Transparentes",
    heroSub:
      "Escolha o pacote que melhor se adapta a você. Todas as sessões são individualmente personalizadas para o seu corpo e objetivos.",
    pricingNote: "(*) Preços sem IVA, não válidos para venda a particulares.",
    popular: "Mais Escolhido",
    individueel: "Individual",
    duo: "Duo",
    exclLabel: "sem IVA",
    bookNow: "Agendar",
    policiesTitle: "Informações Práticas",
    giftTitle: "Vales-presente disponíveis",
    giftDesc:
      "Ofereça o presente do movimento consciente. Vales-presente para sessões de Pilates na Spessirits estão disponíveis. Entre em contato para mais informações.",
    giftBtn: "Mais informações",
    tiers: [{ label: "1 Sessão" }, { label: "5 Sessões" }, { label: "10 Sessões" }],
    policies: [
      { title: "1 hora por sessão", desc: "Cada sessão tem a duração de uma hora." },
      { title: "Cancelamento com 24h", desc: "Uma sessão pode ser cancelada com até 24 horas de antecedência." },
      { title: "Pagamento antecipado", desc: "As sessões e pacotes devem ser pagos antecipadamente." },
      { title: "Válido por 3 meses", desc: "As sessões são pessoais e válidas por três meses a partir da data da fatura." },
    ],
  },
  contact: {
    tag: "Contato",
    heroTitle: "Entre em contato",
    heroSub:
      "Para agendamentos, dúvidas sobre aulas ou preços — a Cintia está à sua disposição.",
    infoTitle: "Dados de Contato",
    formTitle: "Envie uma mensagem",
    fieldNaam: "Nome",
    fieldEmail: "E-mail",
    fieldTelefoon: "Telefone",
    fieldTelefoonOpt: "(opcional)",
    fieldBericht: "Mensagem",
    fieldNaamPlaceholder: "O seu nome",
    fieldEmailPlaceholder: "seu@email.com",
    fieldTelefoonPlaceholder: "+32 ...",
    fieldBerichtPlaceholder: "Faça a sua pergunta ou conte-nos o que procura...",
    submit: "Enviar mensagem",
    submitting: "Enviando...",
    toastTitle: "Mensagem enviada! 🌿",
    toastDesc: "A Cintia entrará em contato o mais breve possível.",
    mapOpen: "Abrir no Google Maps →",
    errNaam: "O nome é obrigatório.",
    errEmail: "O e-mail é obrigatório.",
    errEmailInvalid: "É necessário um endereço de e-mail válido.",
    errBericht: "A mensagem é obrigatória.",
    contactItems: [
      { label: "Telefone" },
      { label: "WhatsApp" },
      { label: "E-mail" },
      { label: "Endereço" },
    ],
  },
};
// ───────────────────────────────────────────────────────────────────────────

const baseTranslations: Record<"nl" | "en", Translations> = { nl, en };

export const translations: Record<Language, Translations> = {
  ...baseTranslations,
  ...(ENABLE_FRENCH ? { fr } : {}),
  ...(ENABLE_PORTUGUESE ? { pt } : {}),
} as Record<Language, Translations>;

interface LanguageContextValue {
  lang: Language;
  setLang: (l: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextValue>({
  lang: "nl",
  setLang: () => {},
  t: nl,
});

function getStoredLanguage(): Language | null {
  try {
    const stored = localStorage.getItem("spessirits-lang") as Language | null;
    if (stored && SUPPORTED_LANGUAGES.includes(stored)) return stored;
  } catch {}
  return null;
}

async function fetchDefaultLanguage(): Promise<Language> {
  try {
    const { data } = await supabase
      .from("site_settings")
      .select("default_language")
      .eq("id", "default")
      .single();
    const lang = data?.default_language as Language | undefined;
    if (lang && SUPPORTED_LANGUAGES.includes(lang)) return lang;
  } catch {}
  return "en";
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const stored = getStoredLanguage();
  const [lang, setLangState] = useState<Language>(stored ?? "en");
  const [ready, setReady] = useState(!!stored);

  useEffect(() => {
    if (stored) return; // already have a preference
    (async () => {
      // Try geo first
      const geoLang = getLanguageFromTimezone(SUPPORTED_LANGUAGES);
      if (geoLang) {
        setLangState(geoLang);
        setReady(true);
        return;
      }
      // Fall back to admin default from DB
      const dbDefault = await fetchDefaultLanguage();
      setLangState(dbDefault);
      setReady(true);
    })();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    try { localStorage.setItem("spessirits-lang", newLang); } catch {}
  };

  if (!ready) return null; // avoid flash of wrong language

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: translations[lang] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
