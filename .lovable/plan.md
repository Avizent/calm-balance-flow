
## Adding Brazilian Portuguese (PT-BR) as a Toggleable Language

### Current Architecture Summary

The language system is elegantly structured around a single file — `src/contexts/LanguageContext.tsx` — with three key building blocks:

1. **A feature flag** at line 5: `export const ENABLE_FRENCH = true`
2. **A `SUPPORTED_LANGUAGES` array** derived from that flag (line 10–12), consumed by `Navigation.tsx` for the toggle cycle
3. **A `translations` record** that conditionally includes the `fr` object (line 909–911)

The Navigation toggle (desktop and mobile) already reads `SUPPORTED_LANGUAGES` dynamically — so adding PT-BR requires zero changes to `Navigation.tsx`. The toggle will automatically cycle NL → EN → FR → PT → NL once `pt` is in the array.

The `Boeken.tsx` page has its own inline `copy` object using `isNl` / `isFr` guards. It needs a `isPt` branch added.

---

### Step 1: Ambiguous Terms — Clarification Notes

Before translating, the following Dutch terms have multiple valid Brazilian Portuguese equivalents in this physiotherapy/sports context. The approach below reflects the most appropriate professional choice for each:

| Dutch term | Options | Choice & reasoning |
|---|---|---|
| **Klachten** | *queixas*, *problemas*, *disfunções* | → **queixas** — standard clinical term in Brazilian physiotherapy |
| **Sessie** | *sessão*, *aula*, *consulta* | → **sessão** — covers both class and clinical appointment; **aula** for the group/class context |
| **Verantwoord Pilates** | *Pilates responsável*, *Pilates consciente*, *Pilates seguro* | → **Pilates Responsável** — mirrors the brand's "responsible/mindful" philosophy precisely |
| **Beweging** | *movimento*, *exercício*, *mobilidade* | → **movimento** — broader, philosophically appropriate |
| **Kinesitherapiste** | *fisioterapeuta*, *kinesioterapeuta* | → **fisioterapeuta** — standard Brazilian term; "kinesioterapeuta" is not used in Brazil |
| **Licentiate** | *Licenciada*, *Graduada*, *Especialista* | → **Fisioterapeuta licenciada** — culturally and professionally accurate in Brazil |
| **Toestel / Apparaat** | *aparelho*, *equipamento*, *dispositivo* | → **aparelho** for individual studio machines; **equipamentos** for the collective |
| **Duo** | *dupla*, *duo*, *par* | → **Duo** — kept as-is; it's internationally understood in Pilates/fitness |
| **Revalidatie** | *reabilitação*, *fisioterapia*, *recuperação* | → **reabilitação** — precise clinical term used in Brazilian physiotherapy |
| **Cadeaubon** | *vale-presente*, *voucher*, *gift card* | → **vale-presente** — most natural Brazilian Portuguese equivalent |

No clarification is needed from the user — these are clear professional choices based on Brazilian clinical and sports science usage.

---

### Step 2: Key Phrasing Adaptations (Dutch directness → Brazilian warmth)

Three representative examples showing the diplomatic adaptation:

**1. Hero tagline**
- Dutch: *"Verwacht geen standaardles, wel aandacht en respect voor het lichaam"*
- Literal: "Don't expect a standard class, but attention and respect for the body"
- Brazilian PT: *"Não espere uma aula comum — espere atenção genuína, respeito pelo seu corpo e um movimento que serve, sem nunca exigir."*
- Why: Dutch negation ("don't expect") is direct; in Brazilian professional communication, the positive reframe ("atenção genuína") lands warmer while preserving the contrast.

**2. CTA directness**
- Dutch: *"Neem contact op en plan je eerste sessie"*
- Literal: "Take contact and plan your first session"
- Brazilian PT: *"Entre em contato e agende a sua primeira sessão com a Cintia."*
- Why: "agende" (schedule/book) is warmer and more action-inviting than the literal "plan". Adding "a Cintia" (with the definite article, common in Brazilian Portuguese) makes it more personal.

**3. Policy statements**
- Dutch: *"Sessies dienen vooraf betaald te worden."*
- Literal: "Sessions must be paid in advance."
- Brazilian PT: *"As sessões e pacotes devem ser pagos antecipadamente."*
- Why: "devem ser pagos" is professional yet softer than "dienen te worden" (which sounds like a legal obligation in Dutch). The tone remains clear but not imposing.

---

### Files to Change

**Only two files need to change:**

#### 1. `src/contexts/LanguageContext.tsx`

- Add `export const ENABLE_PORTUGUESE = true` below the `ENABLE_FRENCH` flag (same single-flag pattern)
- Extend `Language` type: `"nl" | "en" | "fr" | "pt"`
- Update `SUPPORTED_LANGUAGES` to include `"pt"` when flag is true
- Add a complete `pt: Translations` object (all sections: nav, footer, home, over, lessen, prive, tarieven, contact)
- Update `baseTranslations` and the `translations` record to include `pt` conditionally

The language toggle in Navigation.tsx will automatically show `NL / EN / FR / PT` — no changes needed there.

#### 2. `src/pages/Boeken.tsx`

- Add `const isPt = lang === "pt"` alongside `isNl` and `isFr`
- Extend all `copy` strings to four-way conditionals: `isPt ? "..." : isFr ? "..." : isNl ? "..." : "..."`

---

### Full Brazilian Portuguese Translation (PT-BR)

Professional tone, warm and diplomatic, using **você** consistently throughout (standard Brazilian professional register — `tu` is regional and inappropriate for this audience).

```
nav:
  home: "Início"
  over: "Sobre a Cintia"
  lessen: "Aulas"
  prive: "Sessões Privadas"
  tarieven: "Preços"
  contact: "Contato"
  bookNow: "Agendar"
  menu: "Abrir menu"
  menuClose: "Fechar menu"

footer:
  tagline: "Pilates Responsável — um movimento que serve, sem exigir. Conduzido pela fisioterapeuta licenciada Cintia."
  navigation: "Navegação"
  contact: "Contato"
  rights: "Todos os direitos reservados."

home:
  heroTag: "Pilates com orientação fisioterapêutica · Schilde, Bélgica"
  heroTitle: "Pilates como"
  heroTitleEm: "estilo de vida"
  heroSub: "Não espere uma aula comum — espere atenção genuína, respeito pelo seu corpo e um movimento que serve, sem nunca exigir."
  heroCta: "Agendar uma Sessão"
  heroSecondary: "Sobre a Cintia"
  aboutTag: "Sobre a Cintia"
  aboutTitle: "Fisioterapeuta Licenciada & Professora de Pilates"
  aboutP1: "Sou fisioterapeuta licenciada e professora de Pilates, com mais de 20 anos de experiência no Brasil, nos Estados Unidos e na Bélgica."
  aboutP2: "O Pilates sempre foi a minha grande paixão, com foco especial no movimento preventivo e consciente. Recentemente, decidi me dedicar integralmente ao ensino do Pilates."
  aboutLink: "Saiba mais"
  audienceTag: "Pilates para todos"
  audienceTitle: "Pilates Responsável, adaptado para você"
  benefitsTag: "Benefícios do Método Pilates"
  ctaTitle: "Pronto(a) para começar?"
  ctaSub: "Entre em contato e agende a sua primeira sessão com a Cintia."
  ctaBtn: "Agendar uma sessão"
  audiences:
    - title: "Gestão da Dor & Queixas"
      desc: "Mais força, mobilidade e qualidade de movimento — sem dores nas costas ou nas articulações."
    - title: "Reabilitação"
      desc: "Pilates com orientação fisioterapêutica como parte da sua recuperação após uma lesão ou cirurgia."
    - title: "Iniciantes & Avançados"
      desc: "Dos iniciantes que desejam conhecer melhor o próprio corpo aos atletas que buscam potencializar o seu desempenho."
    - title: "Pré- & Pós-Natal"
      desc: "Exercícios seguros e eficazes para ajudá-la a se movimentar, se preparar e se recuperar."
  benefits:
    ["Postura", "Força & Core", "Flexibilidade", "Mobilidade", "Coordenação", "Redução do Estresse", "Consciência Corporal", "Respiração"]

over:
  tag: "Sobre a Cintia"
  heroTitle: "Um movimento fundamentado em"
  heroTitleEm: "conhecimento & paixão"
  p1: "Sou fisioterapeuta licenciada e professora de Pilates, com mais de 20 anos de experiência no Brasil, nos Estados Unidos e na Bélgica."
  p2: "O Pilates sempre foi a minha grande paixão, com foco especial no movimento preventivo e consciente."
  p3: "Recentemente, optei por me dedicar integralmente ao ensino do Pilates, utilizando o meu profundo conhecimento em anatomia e biomecânica para oferecer sessões seguras, criteriosas e eficazes."
  heroCta: "Agendar uma sessão"
  expertiseTitle: "Formação & Experiência"
  quoteTag: "Filosofia"
  quote: '"Pilates Responsável — um movimento que serve, sem exigir."'
  quoteAuthor: "— Cintia, Spessirits Pilates"
  ctaTitle: "Pronto(a) para a sua primeira sessão?"
  ctaSub: "Entre em contato com a Cintia e descubra como o Pilates pode ajudá-lo(a)."
  ctaBtn: "Falar com a Cintia"
  ctaSecondary: "Ver os preços"
  credentials:
    - icon: "🌍", title: "Experiência Internacional"
      desc: "Mais de 20 anos de experiência prática no Brasil, nos Estados Unidos e na Bélgica — três abordagens distintas, uma visão apaixonada."
    - icon: "🎓", title: "Fisioterapeuta Licenciada"
      desc: "Sólida base científica em anatomia e biomecânica. Cada sessão é sustentada por um profundo conhecimento clínico."
    - icon: "🌿", title: "Professora de Pilates há 20+ anos"
      desc: "Professora de Pilates em dedicação exclusiva, movida pela paixão pelo movimento preventivo e consciente. Sessões seguras, criteriosas e eficazes."

lessen:
  tag: "Aulas"
  heroTitle: "Pilates"
  heroTitleEm: "personalizado"
  heroSub: "Não espere uma aula comum — espere atenção genuína e respeito pelo seu corpo."
  audienceTitle: "Pilates para todos"
  audienceSub: 'Este é o "Pilates Responsável" — que previne lesões a curto e longo prazo.'
  equipmentTag: "Equipamentos do Estúdio"
  equipmentTitle: "Pilates sob medida — Individual e Duo"
  equipmentSub: "Praticar o Pilates em todas as suas formas cria uma maneira mais rica e inteligente de se movimentar. Cada aparelho contribui com a sua própria dimensão: suporte onde é necessário, desafio onde é possível e precisão até o mínimo detalhe."
  ctaTitle: "Ficou curioso(a)?"
  ctaSub: "Entre em contato com a Cintia para uma sessão personalizada."
  ctaBtn: "Entrar em contato"
  bookNow: "Agendar"
  audiences:
    - icon: "🌿", title: "Iniciantes"
      desc: "Para quem deseja conhecer melhor o próprio corpo. Começamos com calma e evoluímos no seu ritmo, com total atenção à execução correta."
    - icon: "🏃", title: "Atletas"
      desc: "Para atletas que buscam potencializar o desempenho. O Pilates fortalece o core, melhora a mobilidade e ajuda a prevenir lesões."
    - icon: "🌸", title: "Terceira Idade"
      desc: "Para quem deseja manter mobilidade, força e independência. Um movimento adaptado que respeita e fortalece o seu corpo."
    - icon: "👶", title: "Pré- & Pós-Natal"
      desc: "Exercícios seguros e eficazes para ajudá-la a se movimentar, se preparar e se recuperar durante e após a gestação."
  equipment: [apparatus names kept; roles translated]
    - Allegro Nextgen Reformer™: "Aparelho central para treinamento de resistência e fortalecimento do core"
    - Ladder Barrel: "Extensão da coluna, flexibilidade e movimentos laterais"
    - Chair: "Equilíbrio, estabilidade e força funcional"
    - Spine Corrector: "Correção postural, mobilidade torácica e alinhamento"
    - Arc: "Suporte para a coluna e alongamento profundo"
    - Oov: "Ativação profunda do core e propriocepção"
    - Konnections® Band: "Resistência funcional e liberdade de movimento"
    - Spinefitter® by SISSEL®: "Mobilidade da coluna e relaxamento"
    - Magic Roller®: "Liberação miofascial e regeneração muscular"
    - Inflatable Ball: "Estabilidade, equilíbrio e suporte suave"

prive:
  tag: "Sessões Privadas"
  heroTitle: "Pilates sob medida —"
  heroTitleEm: "Individual e Duo"
  heroSub: "Praticar o Pilates em todas as suas formas cria uma maneira mais rica e inteligente de se movimentar."
  approachTag: "Nossa abordagem"
  approachTitle: "Cada sessão é única"
  approachP1: 'Cada aparelho contribui com a sua própria dimensão: suporte onde é necessário, desafio onde é possível e precisão até o mínimo detalhe. Este é o "Pilates Responsável", que previne lesões a curto e longo prazo.'
  approachP2: "Não espere uma aula comum — espere atenção genuína e respeito pelo seu corpo. Como fisioterapeuta licenciada, a Cintia utiliza o seu profundo conhecimento de anatomia e biomecânica para oferecer sessões seguras, criteriosas e eficazes."
  formatsTitle: "Formatos de Sessão"
  individualTitle: "Individual"
  individualSub: "Um a um com a Cintia"
  duoTitle: "Duo"
  duoSub: "Treine com um(a) parceiro(a)"
  viewPricing: "Ver os preços"
  ctaTitle: "Agende a sua sessão privada"
  ctaSub: "Entre em contato com a Cintia e inicie a sua jornada pessoal de Pilates."
  ctaBtn: "Entrar em contato"
  individualBenefits:
    ["Sessão totalmente adaptada ao seu corpo e aos seus objetivos",
     "Acompanhamento aprofundado por uma fisioterapeuta licenciada",
     "Abordagem de queixas específicas, lesões ou reabilitação",
     "Agendamento flexível no seu ritmo",
     "Acesso a todos os equipamentos do estúdio"]
  duoBenefits:
    ["Treine com um(a) parceiro(a) ou amigo(a)",
     "Economia em relação a duas sessões individuais",
     "Um movimento motivador e descontraído",
     "Cada dupla recebe um programa personalizado",
     "Acesso a todos os equipamentos do estúdio"]

tarieven:
  tag: "Preços 2026"
  heroTitle: "Preços Transparentes"
  heroSub: "Escolha o pacote que melhor se adapta a você. Todas as sessões são individualmente personalizadas para o seu corpo e objetivos."
  pricingNote: "(*) Preços sem IVA, não válidos para venda a particulares."
  popular: "Mais Escolhido"
  individueel: "Individual"
  duo: "Duo"
  exclLabel: "sem IVA"
  bookNow: "Agendar"
  policiesTitle: "Informações Práticas"
  giftTitle: "Vales-presente disponíveis"
  giftDesc: "Ofereça o presente do movimento consciente. Vales-presente para sessões de Pilates na Spessirits estão disponíveis. Entre em contato para mais informações."
  giftBtn: "Mais informações"
  tiers: ["1 Sessão", "5 Sessões", "10 Sessões"]
  policies:
    - title: "1 hora por sessão", desc: "Cada sessão tem a duração de uma hora."
    - title: "Cancelamento com 24h", desc: "Uma sessão pode ser cancelada com até 24 horas de antecedência."
    - title: "Pagamento antecipado", desc: "As sessões e pacotes devem ser pagos antecipadamente."
    - title: "Válido por 3 meses", desc: "As sessões são pessoais e válidas por três meses a partir da data da fatura."

contact:
  tag: "Contato"
  heroTitle: "Entre em contato"
  heroSub: "Para agendamentos, dúvidas sobre aulas ou preços — a Cintia está à sua disposição."
  infoTitle: "Dados de Contato"
  formTitle: "Envie uma mensagem"
  fieldNaam: "Nome"
  fieldEmail: "E-mail"
  fieldTelefoon: "Telefone"
  fieldTelefoonOpt: "(opcional)"
  fieldBericht: "Mensagem"
  fieldNaamPlaceholder: "O seu nome"
  fieldEmailPlaceholder: "seu@email.com"
  fieldTelefoonPlaceholder: "+32 ..."
  fieldBerichtPlaceholder: "Faça a sua pergunta ou conte-nos o que procura..."
  submit: "Enviar mensagem"
  submitting: "Enviando..."
  toastTitle: "Mensagem enviada! 🌿"
  toastDesc: "A Cintia entrará em contato o mais breve possível."
  mapOpen: "Abrir no Google Maps →"
  errNaam: "O nome é obrigatório."
  errEmail: "O e-mail é obrigatório."
  errEmailInvalid: "É necessário um endereço de e-mail válido."
  errBericht: "A mensagem é obrigatória."
  contactItems: ["Telefone", "WhatsApp", "E-mail", "Endereço"]
```

---

### Boeken.tsx inline copy (PT-BR branch)

```typescript
const isPt = lang === "pt";

tag: isPt ? "Agendamento" : isFr ? "Réservation" : isNl ? "Reservatie" : "Booking Request"
heroTitle: isPt ? "Agendar uma Sessão" : isFr ? "Réserver une séance" : isNl ? "Boek een Sessie" : "Book a Session"
heroSub: isPt ? "Preencha o formulário abaixo e a Cintia entrará em contato para definir uma data e horário."
         : isFr ? "..." : isNl ? "..." : "..."
notice: isPt ? "A Cintia entrará em contato o mais breve possível para confirmar uma data e horário que sejam convenientes para você."
submit: isPt ? "Enviar Solicitação" : ...
sessieOptions (PT): ["Pilates para Iniciantes", "Atletas & Desempenho", "Gestão da Dor & Queixas", "Reabilitação", "Pré-Natal", "Pós-Natal", "Pilates Avançado"]
formatOptions (PT): ["Individual (um a um com a Cintia)", "Duo (2 pessoas)"]
```

---

### How to Remove Portuguese Later

Exactly the same pattern as French:

```typescript
// src/contexts/LanguageContext.tsx — line 2
export const ENABLE_PORTUGUESE = false;  // ← change true to false
```

The toggle collapses back to NL / EN / FR, the type excludes `"pt"`, and no Portuguese strings are ever accessed.

---

### No database changes required.
