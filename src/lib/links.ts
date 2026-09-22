import type { Location } from "@/config/locations";

export const telHref = (e164: string) => `tel:${e164}`;

/** Indicazioni stradali basate sull'indirizzo reale (nessuna coordinata inventata). */
export const directionsHref = (l: Location) =>
  `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(l.mapQuery)}`;

/** Mappa incorporata basata sull'indirizzo (non richiede chiavi API). */
export const mapEmbedSrc = (l: Location) =>
  `https://www.google.com/maps?q=${encodeURIComponent(l.mapQuery)}&output=embed&hl=it`;

export const mapsSearchHref = (l: Location) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(l.mapQuery)}`;
