import { Helmet } from "react-helmet-async";

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface SEOProps {
  title: string;
  description: string;
  path: string;
  breadcrumbs?: BreadcrumbItem[];
  type?: "website" | "article";
  noindex?: boolean;
  lang?: string;
  /** Optional path (relative or absolute) to a route-specific OG image.
   *  Falls back to the global OG_IMAGE when omitted. Should be 1200×630. */
  image?: string;
  /** Optional alt text for the OG image. */
  imageAlt?: string;
}

const SITE_URL = "https://calm-balance-flow.lovable.app";
const SITE_NAME = "Spessirits Pilates";
const OG_IMAGE = `${SITE_URL}/og-image.png`;

const LOCALE_MAP: Record<string, string> = {
  nl: "nl_BE",
  en: "en_GB",
  fr: "fr_BE",
  pt: "pt_BR",
};

/* ── LocalBusiness + Organization (homepage & contact only) ──────── */
const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "HealthAndBeautyBusiness"],
  "@id": `${SITE_URL}/#business`,
  name: SITE_NAME,
  alternateName: "Spessirits",
  description:
    "Physio-led Pilates studio in Schilde, Belgium. Individual and duo sessions guided by licensed physiotherapist Cintia with over 20 years of experience.",
  url: SITE_URL,
  telephone: "+32472240581",
  email: "spessiritskine@icloud.com",
  image: OG_IMAGE,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Cirkellaan 12",
    addressLocality: "Schilde",
    postalCode: "2970",
    addressCountry: "BE",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 51.2456,
    longitude: 4.5147,
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "08:00",
    closes: "19:00",
  },
  priceRange: "€€",
  sameAs: ["https://wa.me/32472913917"],
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}/#org`,
  name: SITE_NAME,
  url: SITE_URL,
  logo: OG_IMAGE,
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+32472240581",
    contactType: "customer service",
    availableLanguage: ["Dutch", "English", "French", "Portuguese"],
  },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  name: SITE_NAME,
  url: SITE_URL,
  inLanguage: ["nl", "en", "fr", "pt"],
};

function buildBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function SEO({
  title,
  description,
  path,
  breadcrumbs,
  type = "website",
  noindex = false,
  lang = "nl",
  image,
  imageAlt,
}: SEOProps) {
  // Canonical URL normalization:
  // - Root stays as "/"
  // - All other routes use NO trailing slash (e.g. /contact, not /contact/)
  // This prevents duplicate indexing of /foo and /foo/ as two different URLs.
  const normalizedPath =
    path === "/" ? "/" : `/${path.replace(/^\/+|\/+$/g, "")}`;
  const canonicalUrl = `${SITE_URL}${normalizedPath}`;
  const fullTitle = normalizedPath === "/" ? title : `${title} — ${SITE_NAME}`;
  const isHomepage = normalizedPath === "/";
  const isContact = normalizedPath === "/contact";
  const ogLocale = LOCALE_MAP[lang] || "nl_BE";
  const alternateLocales = Object.values(LOCALE_MAP).filter((l) => l !== ogLocale);

  // Resolve OG image: support absolute URLs or root-relative paths.
  const resolvedImage = image
    ? image.startsWith("http")
      ? image
      : `${SITE_URL}${image.startsWith("/") ? "" : "/"}${image}`
    : OG_IMAGE;
  const resolvedImageAlt =
    imageAlt ||
    "Spessirits Pilates studio in Schilde — Physio-led Pilates by Cintia";

  return (
    <Helmet>
      <html lang={lang} />
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />

      {noindex && <meta name="robots" content="noindex, nofollow" />}

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content={type} />
      <meta property="og:image" content={resolvedImage} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content={ogLocale} />
      {alternateLocales.map((loc) => (
        <meta key={loc} property="og:locale:alternate" content={loc} />
      ))}

      {/* Robots: allow generous snippets for AI/search */}
      {!noindex && (
        <meta name="robots" content="max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      )}

      {/* OG Image dimensions */}
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={resolvedImageAlt} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={resolvedImage} />
      <meta name="twitter:image:alt" content={resolvedImageAlt} />

      {/* JSON-LD: WebSite (homepage only) */}
      {isHomepage && (
        <script type="application/ld+json">
          {JSON.stringify(websiteSchema)}
        </script>
      )}

      {/* JSON-LD: Organization (homepage only) */}
      {isHomepage && (
        <script type="application/ld+json">
          {JSON.stringify(organizationSchema)}
        </script>
      )}

      {/* JSON-LD: LocalBusiness (homepage + contact) */}
      {(isHomepage || isContact) && (
        <script type="application/ld+json">
          {JSON.stringify(localBusinessSchema)}
        </script>
      )}

      {/* JSON-LD: BreadcrumbList */}
      {breadcrumbs && breadcrumbs.length > 0 && (
        <script type="application/ld+json">
          {JSON.stringify(buildBreadcrumbSchema(breadcrumbs))}
        </script>
      )}
    </Helmet>
  );
}

export { SITE_URL };
