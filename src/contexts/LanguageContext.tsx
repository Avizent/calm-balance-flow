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
    poaTitle?: string;
    poaBody?: string;
    poaContactBtn?: string;
    poaWhatsappBtn?: string;
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
    poaTitle: "Tarieven op aanvraag",
    poaBody: "Elke traject is persoonlijk en wordt afgestemd op jouw lichaam, doelen en frequentie. Neem contact op voor een offerte op maat.",
    poaContactBtn: "Contact",
    poaWhatsappBtn: "WhatsApp",
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
    poaTitle: "Pricing on application",
    poaBody: "Every programme is personal and tailored to your body, goals and frequency. Contact us for a custom quote.",
    poaContactBtn: "Contact",
    poaWhatsappBtn: "WhatsApp",
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
  medicalProfessionals: {
    navLabel: "Medical Professionals",
    seoTitle: "For Medical Professionals — Spessirits Pilates",
    seoDesc: "Refer your patients to physio-led Pilates. Cintia is a licensed physiotherapist with 20+ years of clinical experience offering one-to-one rehabilitative movement therapy.",
    seoBreadcrumb: "For Medical Professionals",
    heroTag: "For Medical Professionals",
    heroTitle: "Movement as medicine —",
    heroTitleEm: "prescribed with precision.",
    heroP1: "Cintia is a licensed physiotherapist with over 20 years of clinical experience.",
    heroP2: "If you are looking for a trusted partner to support your patients' preventive and rehabilitative movement — you are in the right place.",
    ctaInfo: "Request Information Pack →",
    ctaContact: "Get in Touch →",
    whoTag: "Who This Is For",
    whoTitle: "Referring patients to",
    whoTitleEm: "physio-led Pilates.",
    whoP1: "This page is written for GPs, physiotherapists, orthopaedic specialists, rheumatologists, sports medicine practitioners, and rehabilitation teams.",
    whoP2: "If you have patients who would benefit from structured, individually tailored movement therapy — grounded in physiotherapy and delivered in a private, clinical setting — Cintia's practice may be exactly what they need.",
    clinicalTag: "Not a Class. Not a Gym.",
    clinicalTitle: "Responsible Pilates —",
    clinicalTitleEm: "guided by clinical expertise.",
    clinicalIntro: "Spessirits is not a studio. There are no classes of ten, no shared reformers, no generic programmes. Every session is one-to-one, or occasionally one-to-two by arrangement.",
    leftTitle: "What your patient receives",
    rightTitle: "What sets Cintia apart",
    leftChecks: [
      "A full initial assessment tailored to their condition and goals",
      "A programme built around their body — not a standard class plan",
      "One-to-one attention throughout every session",
      "Gradual, evidence-informed progression",
      "Access to a fully equipped private studio",
      "A summary report available to you on request",
    ],
    rightChecks: [
      "Licensed physiotherapist — not a fitness instructor",
      "20+ years of clinical and movement experience",
      "Deep knowledge of anatomy, biomechanics, and injury patterns",
      "Preventive and rehabilitative — not performance-led",
      "Maximum two clients at any one time",
      "Works with the referring practitioner, not around them",
    ],
    conditionsTag: "Conditions That Respond Well",
    conditionsTitle: "Movement therapy for",
    conditionsTitleEm: "the patients who need it most.",
    conditionsIntro: "Cintia works with patients whose conditions are well served by guided, low-impact, physiotherapy-informed movement. Common referral profiles include:",
    conditionsList: [
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
    ],
    conditionsNote: "Not sure if Pilates is right for your patient? Get in touch — Cintia is happy to discuss.",
    referralTag: "Simple to Refer",
    referralTitle: "Three steps.",
    referralTitleEm: "That's all it takes.",
    referralIntro: "Referring a patient to Spessirits is straightforward. No referral forms, no waiting lists, no complexity.",
    steps: [
      { heading: "Introduce Spessirits to your patient.", body: "Let them know that Cintia is a licensed physiotherapist offering individual Pilates sessions from a private studio in Schilde. The website has everything they need to understand the approach and feel comfortable making contact." },
      { heading: "Your patient makes contact directly.", body: "They can reach Cintia by phone, WhatsApp, or the enquiry form on this page. She will arrange an initial conversation to understand their history, condition, and goals — and confirm that physio-led Pilates is the right fit for them." },
      { heading: "Stay in the loop, if you'd like.", body: "After an initial assessment, Cintia is happy to provide a brief summary to the referring practitioner — with the patient's consent. She sees herself as part of a wider care team, not an alternative to it." },
    ],
    quote: "Pilates, when led by someone who understands the body clinically, is one of the most powerful preventive tools we have. I want to be the person your patients trust to do it properly.",
    quoteAttribution: "Cintia Spessirits — Licensed Physiotherapist & Pilates Teacher",
    contactTag: "Get in Touch",
    contactTitle: "Request the professional",
    contactTitleEm: "information pack.",
    contactIntro: "Whether you'd like to refer a patient, request our clinical information pack, or simply ask a question — Cintia is happy to help.",
    contactDetailsTitle: "Contact details",
    contactLabels: ["PHONE", "WHATSAPP", "EMAIL", "STUDIO"],
    formName: "Your name",
    formNamePlaceholder: "Dr. / Mr. / Ms. ...",
    formRole: "I am a...",
    formRolePlaceholder: "Select your role...",
    roleOptions: [
      "GP / General practitioner",
      "Physiotherapist",
      "Orthopaedic or sports specialist",
      "Other medical professional",
      "Patient or prospective client",
    ],
    formPractice: "Practice or clinic name",
    formPracticePlaceholder: "Optional",
    formEmail: "Email",
    formEmailPlaceholder: "your@email.com",
    formPhone: "Phone",
    formPhonePlaceholder: "+32 ...",
    formMessage: "Message",
    formMessagePlaceholder: "Tell us about your patient, or ask a question...",
    formSubmit: "Send message →",
    errName: "Name is required.",
    errRole: "Please select a role.",
    errEmail: "Email is required.",
    errEmailInvalid: "Please enter a valid email.",
    errMessage: "Message is required.",
    errConsent: "You must agree to the privacy policy.",
    successMedical: "Thank you. Our professional information pack is on its way to your inbox. Cintia will be in touch shortly.",
    successPatient: "Thank you for getting in touch. Cintia will be in contact with you directly very soon.",
    footerNote1: "Your enquiry is treated with complete discretion.",
    footerNote2: "Patient information is never shared without consent.",
    footerCredits: "Cintia Spessirits · Licensed Physiotherapist · Cirkellaan 12, 2970 Schilde · info@spessirits.com",
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
    poaTitle: "Tarifs sur demande",
    poaBody: "Chaque parcours est personnel et adapté à votre corps, vos objectifs et votre fréquence. Contactez-nous pour un devis sur mesure.",
    poaContactBtn: "Contact",
    poaWhatsappBtn: "WhatsApp",
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
  medicalProfessionals: {
    navLabel: "Professionnels médicaux",
    seoTitle: "Pour les Professionnels Médicaux — Spessirits Pilates",
    seoDesc: "Orientez vos patients vers du Pilates encadré par une kinésithérapeute. Cintia possède plus de 20 ans d'expérience clinique et propose des séances individuelles de thérapie par le mouvement.",
    seoBreadcrumb: "Pour les Professionnels Médicaux",
    heroTag: "Pour les Professionnels Médicaux",
    heroTitle: "Le mouvement comme médecine —",
    heroTitleEm: "prescrit avec précision.",
    heroP1: "Cintia est une kinésithérapeute diplômée avec plus de 20 ans d'expérience clinique.",
    heroP2: "Si vous recherchez un partenaire de confiance pour accompagner le mouvement préventif et rééducatif de vos patients — vous êtes au bon endroit.",
    ctaInfo: "Demander le dossier d'information →",
    ctaContact: "Nous contacter →",
    whoTag: "À qui s'adresse cette page",
    whoTitle: "Orienter vos patients vers du",
    whoTitleEm: "Pilates guidé par une kinésithérapeute.",
    whoP1: "Cette page s'adresse aux médecins généralistes, kinésithérapeutes, spécialistes orthopédiques, rhumatologues, médecins du sport et équipes de rééducation.",
    whoP2: "Si vous avez des patients qui bénéficieraient d'une thérapie par le mouvement structurée et individualisée — fondée sur la kinésithérapie et dispensée dans un cadre privé et clinique — la pratique de Cintia pourrait être exactement ce dont ils ont besoin.",
    clinicalTag: "Pas un cours. Pas une salle de sport.",
    clinicalTitle: "Pilates responsable —",
    clinicalTitleEm: "guidé par l'expertise clinique.",
    clinicalIntro: "Spessirits n'est pas un studio. Il n'y a pas de cours de dix personnes, pas de reformers partagés, pas de programmes génériques. Chaque séance est individuelle, ou occasionnellement en duo sur arrangement.",
    leftTitle: "Ce que votre patient reçoit",
    rightTitle: "Ce qui distingue Cintia",
    leftChecks: [
      "Une évaluation initiale complète adaptée à sa condition et ses objectifs",
      "Un programme construit autour de son corps — pas un plan de cours standard",
      "Une attention individuelle tout au long de chaque séance",
      "Une progression graduelle et fondée sur les preuves",
      "Accès à un studio privé entièrement équipé",
      "Un rapport de synthèse disponible sur demande",
    ],
    rightChecks: [
      "Kinésithérapeute diplômée — pas une instructrice de fitness",
      "20+ ans d'expérience clinique et en mouvement",
      "Connaissance approfondie de l'anatomie, la biomécanique et les schémas de blessures",
      "Préventive et rééducative — pas axée sur la performance",
      "Maximum deux clients à la fois",
      "Travaille avec le praticien référent, pas en marge",
    ],
    conditionsTag: "Pathologies qui répondent bien",
    conditionsTitle: "Thérapie par le mouvement pour",
    conditionsTitleEm: "les patients qui en ont le plus besoin.",
    conditionsIntro: "Cintia travaille avec des patients dont les pathologies répondent bien à un mouvement guidé, à faible impact, informé par la kinésithérapie. Les profils d'orientation courants incluent :",
    conditionsList: [
      "Lombalgie chronique",
      "Tensions cervicales et du cou",
      "Rééducation post-chirurgicale",
      "Arthrose (hanche, genou, colonne)",
      "Scoliose et déséquilibre postural",
      "Hypermobilité et instabilité articulaire",
      "Dysfonction du plancher pelvien",
      "Récupération pré- & post-natale",
      "Équilibre et prévention des chutes",
      "Pathologies liées à la sédentarité",
      "Tensions musculosquelettiques liées au stress",
      "Rééducation neurologique (légère)",
    ],
    conditionsNote: "Vous n'êtes pas sûr que le Pilates convienne à votre patient ? Contactez-nous — Cintia se fera un plaisir d'en discuter.",
    referralTag: "Simple à orienter",
    referralTitle: "Trois étapes.",
    referralTitleEm: "C'est tout ce qu'il faut.",
    referralIntro: "Orienter un patient vers Spessirits est simple. Pas de formulaires de référence, pas de listes d'attente, pas de complexité.",
    steps: [
      { heading: "Présentez Spessirits à votre patient.", body: "Faites-lui savoir que Cintia est une kinésithérapeute diplômée qui propose des séances individuelles de Pilates dans un studio privé à Schilde. Le site contient tout ce dont il a besoin pour comprendre l'approche et se sentir à l'aise pour prendre contact." },
      { heading: "Votre patient prend contact directement.", body: "Il peut joindre Cintia par téléphone, WhatsApp ou le formulaire de cette page. Elle organisera une conversation initiale pour comprendre son historique, sa condition et ses objectifs — et confirmer que le Pilates guidé par une kinésithérapeute est adapté." },
      { heading: "Restez informé, si vous le souhaitez.", body: "Après une évaluation initiale, Cintia peut fournir un bref résumé au praticien référent — avec le consentement du patient. Elle se considère comme faisant partie d'une équipe de soins élargie, pas comme une alternative." },
    ],
    quote: "Le Pilates, lorsqu'il est dirigé par quelqu'un qui comprend le corps cliniquement, est l'un des outils préventifs les plus puissants dont nous disposons. Je veux être la personne en qui vos patients ont confiance pour le faire correctement.",
    quoteAttribution: "Cintia Spessirits — Kinésithérapeute Diplômée & Enseignante Pilates",
    contactTag: "Nous contacter",
    contactTitle: "Demandez le dossier",
    contactTitleEm: "d'information professionnelle.",
    contactIntro: "Que vous souhaitiez orienter un patient, demander notre dossier d'information clinique ou simplement poser une question — Cintia se fera un plaisir de vous aider.",
    contactDetailsTitle: "Coordonnées",
    contactLabels: ["TÉLÉPHONE", "WHATSAPP", "E-MAIL", "STUDIO"],
    formName: "Votre nom",
    formNamePlaceholder: "Dr. / M. / Mme ...",
    formRole: "Je suis...",
    formRolePlaceholder: "Sélectionnez votre rôle...",
    roleOptions: [
      "Médecin généraliste",
      "Kinésithérapeute",
      "Spécialiste orthopédique ou sportif",
      "Autre professionnel médical",
      "Patient ou futur client",
    ],
    formPractice: "Nom du cabinet ou de la clinique",
    formPracticePlaceholder: "Facultatif",
    formEmail: "E-mail",
    formEmailPlaceholder: "votre@email.com",
    formPhone: "Téléphone",
    formPhonePlaceholder: "+32 ...",
    formMessage: "Message",
    formMessagePlaceholder: "Parlez-nous de votre patient ou posez une question...",
    formSubmit: "Envoyer le message →",
    errName: "Le nom est obligatoire.",
    errRole: "Veuillez sélectionner un rôle.",
    errEmail: "L'adresse e-mail est obligatoire.",
    errEmailInvalid: "Veuillez entrer une adresse e-mail valide.",
    errMessage: "Le message est obligatoire.",
    errConsent: "Vous devez accepter la politique de confidentialité.",
    successMedical: "Merci. Notre dossier d'information professionnelle est en route vers votre boîte mail. Cintia vous contactera sous peu.",
    successPatient: "Merci de nous avoir contactés. Cintia vous répondra très rapidement.",
    footerNote1: "Votre demande est traitée avec la plus grande discrétion.",
    footerNote2: "Les informations des patients ne sont jamais partagées sans consentement.",
    footerCredits: "Cintia Spessirits · Kinésithérapeute Diplômée · Cirkellaan 12, 2970 Schilde · info@spessirits.com",
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
    poaTitle: "Preços sob consulta",
    poaBody: "Cada percurso é pessoal e adaptado ao seu corpo, objetivos e frequência. Entre em contato para um orçamento personalizado.",
    poaContactBtn: "Contato",
    poaWhatsappBtn: "WhatsApp",
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
  medicalProfessionals: {
    navLabel: "Profissionais Médicos",
    seoTitle: "Para Profissionais Médicos — Spessirits Pilates",
    seoDesc: "Encaminhe os seus pacientes para Pilates orientado por fisioterapeuta. Cintia tem mais de 20 anos de experiência clínica e oferece sessões individuais de terapia pelo movimento.",
    seoBreadcrumb: "Para Profissionais Médicos",
    heroTag: "Para Profissionais Médicos",
    heroTitle: "Movimento como medicina —",
    heroTitleEm: "prescrito com precisão.",
    heroP1: "Cintia é uma fisioterapeuta diplomada com mais de 20 anos de experiência clínica.",
    heroP2: "Se procura um parceiro de confiança para apoiar o movimento preventivo e reabilitativo dos seus pacientes — está no lugar certo.",
    ctaInfo: "Solicitar pacote informativo →",
    ctaContact: "Entrar em contato →",
    whoTag: "Para quem",
    whoTitle: "Encaminhar pacientes para",
    whoTitleEm: "Pilates orientado por fisioterapeuta.",
    whoP1: "Esta página destina-se a médicos de clínica geral, fisioterapeutas, especialistas ortopédicos, reumatologistas, médicos desportivos e equipas de reabilitação.",
    whoP2: "Se tem pacientes que beneficiariam de uma terapia pelo movimento estruturada e individualizada — fundamentada na fisioterapia e realizada num ambiente privado e clínico — a prática da Cintia pode ser exatamente o que precisam.",
    clinicalTag: "Não é uma aula. Não é um ginásio.",
    clinicalTitle: "Pilates responsável —",
    clinicalTitleEm: "guiado por expertise clínica.",
    clinicalIntro: "O Spessirits não é um estúdio. Não há aulas de dez pessoas, nem reformers partilhados, nem programas genéricos. Cada sessão é individual, ou ocasionalmente a dois por acordo.",
    leftTitle: "O que o seu paciente recebe",
    rightTitle: "O que distingue a Cintia",
    leftChecks: [
      "Uma avaliação inicial completa adaptada à sua condição e objetivos",
      "Um programa construído em torno do seu corpo — não um plano de aula padrão",
      "Atenção individual durante toda a sessão",
      "Progressão gradual e baseada em evidências",
      "Acesso a um estúdio privado totalmente equipado",
      "Relatório de síntese disponível mediante pedido",
    ],
    rightChecks: [
      "Fisioterapeuta diplomada — não instrutora de fitness",
      "20+ anos de experiência clínica e em movimento",
      "Conhecimento profundo de anatomia, biomecânica e padrões de lesão",
      "Preventivo e reabilitativo — não focado em performance",
      "Máximo dois clientes de cada vez",
      "Trabalha com o profissional que encaminha, não à margem",
    ],
    conditionsTag: "Condições que respondem bem",
    conditionsTitle: "Terapia pelo movimento para",
    conditionsTitleEm: "os pacientes que mais precisam.",
    conditionsIntro: "Cintia trabalha com pacientes cujas condições respondem bem a um movimento guiado, de baixo impacto e informado pela fisioterapia. Perfis de encaminhamento comuns incluem:",
    conditionsList: [
      "Dor lombar crónica",
      "Tensão cervical e do pescoço",
      "Reabilitação pós-cirúrgica",
      "Osteoartrose (anca, joelho, coluna)",
      "Escoliose e desequilíbrio postural",
      "Hipermobilidade e instabilidade articular",
      "Disfunção do pavimento pélvico",
      "Recuperação pré e pós-natal",
      "Equilíbrio e prevenção de quedas",
      "Condições relacionadas ao sedentarismo",
      "Tensão musculoesquelética relacionada ao stress",
      "Reabilitação neurológica (leve)",
    ],
    conditionsNote: "Não tem a certeza se Pilates é adequado para o seu paciente? Entre em contato — a Cintia terá todo o prazer em conversar.",
    referralTag: "Simples de encaminhar",
    referralTitle: "Três passos.",
    referralTitleEm: "É tudo o que é preciso.",
    referralIntro: "Encaminhar um paciente para o Spessirits é simples. Sem formulários de referência, sem listas de espera, sem complexidade.",
    steps: [
      { heading: "Apresente o Spessirits ao seu paciente.", body: "Informe-o de que a Cintia é uma fisioterapeuta diplomada que oferece sessões individuais de Pilates num estúdio privado em Schilde. O site tem tudo o que precisa para entender a abordagem e sentir-se à vontade para entrar em contato." },
      { heading: "O seu paciente entra em contato diretamente.", body: "Pode contactar a Cintia por telefone, WhatsApp ou pelo formulário desta página. Ela agendará uma conversa inicial para entender o histórico, condição e objetivos — e confirmar que Pilates orientado por fisioterapeuta é a escolha certa." },
      { heading: "Mantenha-se informado, se desejar.", body: "Após uma avaliação inicial, a Cintia terá todo o prazer em fornecer um breve resumo ao profissional que encaminhou — com o consentimento do paciente. Ela vê-se como parte de uma equipa de cuidados mais ampla, não como alternativa." },
    ],
    quote: "O Pilates, quando liderado por alguém que compreende o corpo clinicamente, é uma das ferramentas preventivas mais poderosas que temos. Quero ser a pessoa em quem os seus pacientes confiam para fazê-lo corretamente.",
    quoteAttribution: "Cintia Spessirits — Fisioterapeuta Diplomada & Professora de Pilates",
    contactTag: "Entre em contato",
    contactTitle: "Solicite o pacote de",
    contactTitleEm: "informação profissional.",
    contactIntro: "Quer encaminhar um paciente, solicitar o nosso pacote de informação clínica ou simplesmente fazer uma pergunta — a Cintia terá todo o prazer em ajudar.",
    contactDetailsTitle: "Dados de contato",
    contactLabels: ["TELEFONE", "WHATSAPP", "E-MAIL", "ESTÚDIO"],
    formName: "O seu nome",
    formNamePlaceholder: "Dr. / Sr. / Sra. ...",
    formRole: "Eu sou...",
    formRolePlaceholder: "Selecione o seu papel...",
    roleOptions: [
      "Médico de clínica geral",
      "Fisioterapeuta",
      "Especialista ortopédico ou desportivo",
      "Outro profissional médico",
      "Paciente ou futuro cliente",
    ],
    formPractice: "Nome da clínica ou consultório",
    formPracticePlaceholder: "Opcional",
    formEmail: "E-mail",
    formEmailPlaceholder: "seu@email.com",
    formPhone: "Telefone",
    formPhonePlaceholder: "+32 ...",
    formMessage: "Mensagem",
    formMessagePlaceholder: "Conte-nos sobre o seu paciente ou faça uma pergunta...",
    formSubmit: "Enviar mensagem →",
    errName: "O nome é obrigatório.",
    errRole: "Por favor selecione um papel.",
    errEmail: "O e-mail é obrigatório.",
    errEmailInvalid: "Por favor insira um endereço de e-mail válido.",
    errMessage: "A mensagem é obrigatória.",
    errConsent: "Deve concordar com a política de privacidade.",
    successMedical: "Obrigado. O nosso pacote de informação profissional está a caminho da sua caixa de entrada. A Cintia entrará em contato em breve.",
    successPatient: "Obrigado por entrar em contato. A Cintia responderá pessoalmente muito em breve.",
    footerNote1: "A sua consulta é tratada com total discrição.",
    footerNote2: "A informação do paciente nunca é partilhada sem consentimento.",
    footerCredits: "Cintia Spessirits · Fisioterapeuta Diplomada · Cirkellaan 12, 2970 Schilde · info@spessirits.com",
  },
};
// ───────────────────────────────────────────────────────────────────────────

const baseTranslations: Record<"nl" | "en", Translations> = { nl, en };

export const hardcodedTranslations: Record<Language, Translations> = {
  ...baseTranslations,
  ...(ENABLE_FRENCH ? { fr } : {}),
  ...(ENABLE_PORTUGUESE ? { pt } : {}),
} as Record<Language, Translations>;

// Deep merge: source values override target, recursing into objects
function deepMerge<T>(target: T, source: Partial<T>): T {
  if (!source) return target;
  const result = { ...target } as Record<string, unknown>;
  for (const key of Object.keys(source)) {
    const srcVal = (source as Record<string, unknown>)[key];
    const tgtVal = result[key];
    if (
      srcVal &&
      typeof srcVal === "object" &&
      !Array.isArray(srcVal) &&
      tgtVal &&
      typeof tgtVal === "object" &&
      !Array.isArray(tgtVal)
    ) {
      result[key] = deepMerge(tgtVal, srcVal as Partial<typeof tgtVal>);
    } else if (srcVal !== undefined) {
      result[key] = srcVal;
    }
  }
  return result as T;
}

interface LanguageContextValue {
  lang: Language;
  setLang: (l: Language) => void;
  t: Translations;
  dbTranslations: Record<Language, Translations> | null;
}

const LanguageContext = createContext<LanguageContextValue>({
  lang: "nl",
  setLang: () => {},
  t: nl,
  dbTranslations: null,
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

async function fetchTranslations(): Promise<Record<Language, Partial<Translations>> | null> {
  try {
    const { data, error } = await supabase
      .from("translations")
      .select("language, content");
    if (error || !data) return null;
    const result: Record<string, Partial<Translations>> = {};
    for (const row of data) {
      result[row.language] = row.content as unknown as Partial<Translations>;
    }
    return result as Record<Language, Partial<Translations>>;
  } catch {
    return null;
  }
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const stored = getStoredLanguage();
  const [lang, setLangState] = useState<Language>(stored ?? "en");
  const [ready, setReady] = useState(!!stored);
  const [mergedTranslations, setMergedTranslations] = useState<Record<Language, Translations>>(hardcodedTranslations);
  const [dbTranslations, setDbTranslations] = useState<Record<Language, Translations> | null>(null);

  useEffect(() => {
    (async () => {
      // Fetch DB translations and merge over hardcoded defaults
      const dbData = await fetchTranslations();
      if (dbData) {
        const merged = { ...hardcodedTranslations };
        for (const l of SUPPORTED_LANGUAGES) {
          if (dbData[l]) {
            merged[l] = deepMerge(hardcodedTranslations[l], dbData[l]);
          }
        }
        setMergedTranslations(merged);
        setDbTranslations(merged);
      }

      // Determine initial language if not stored
      if (!stored) {
        const geoLang = getLanguageFromTimezone(SUPPORTED_LANGUAGES);
        if (geoLang) {
          setLangState(geoLang);
        } else {
          const dbDefault = await fetchDefaultLanguage();
          setLangState(dbDefault);
        }
      }
      setReady(true);
    })();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    try { localStorage.setItem("spessirits-lang", newLang); } catch {}
  };

  if (!ready) return null; // avoid flash of wrong language

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: mergedTranslations[lang], dbTranslations }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
