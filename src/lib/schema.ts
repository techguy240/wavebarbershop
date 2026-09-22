import { fullAddress, type Location } from "@/config/locations";
import { isConfigured, siteConfig } from "@/config/site";

const DAY = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

/** JSON-LD LocalBusiness (BarberShop) con soli dati reali. */
export function barberShopSchema(l: Location) {
  return {
    "@context": "https://schema.org",
    "@type": "BarberShop",
    name: l.name,
    telephone: l.phoneE164,
    image: l.images.map((i) => i.src),
    ...(isConfigured(siteConfig.url) ? { url: `${siteConfig.url}/sedi/${l.id}` } : {}),
    address: {
      "@type": "PostalAddress",
      streetAddress: l.address,
      postalCode: l.postalCode,
      addressLocality: l.city,
      addressRegion: l.province,
      addressCountry: "IT",
    },
    openingHoursSpecification: l.hours
      .filter((h) => h.open && h.close)
      .map((h) => ({
        "@type": "OpeningHoursSpecification",
        dayOfWeek: DAY[h.day],
        opens: h.open,
        closes: h.close,
      })),
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: l.reviews.rating,
      reviewCount: l.reviews.count,
      bestRating: 5,
    },
    description: fullAddress(l),
  };
}
