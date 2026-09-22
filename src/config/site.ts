/**
 * Configurazione centrale del sito WaveBarbershop.
 * Tutti i valori vuoti ("") sono "da configurare": il sito li gestisce
 * mostrando uno stato chiaro invece di dati inventati.
 */

/** Modalità demo: mostra avvisi espliciti sulle integrazioni non ancora collegate. */
export const DEMO_MODE = true;

/** Link ufficiali dell'app WaveBarbershop: valorizzare appena disponibili. */
export const GOOGLE_PLAY_URL = "";
export const APP_STORE_URL = "";

export const siteConfig = {
  name: "WaveBarbershop",
  shortName: "Wave",
  tagline: "Barberia a Cecina e Volterra",
  since: "2015",
  description:
    "WaveBarbershop: barberia premium con due sedi a Cecina e Volterra. Tagli, barba, trattamenti e prodotti professionali. Prenota il tuo appuntamento.",
  locale: "it_IT",
  /** Dominio pubblico: da configurare (es. https://www.wavebarbershop.it). */
  url: "",
  /** Email di contatto generale: da configurare. */
  email: "",

  booking: {
    /** Se true apre l'URL in una nuova scheda. */
    openInNewTab: true,
    /** Testo CTA principale. */
    label: "Prenota ora",
  },

  social: {
    /** Da configurare: URL completi dei profili ufficiali. */
    instagram: "",
    facebook: "",
    tiktok: "",
    whatsapp: "",
  },

  analytics: {
    /** Da configurare: es. G-XXXXXXX. Se vuoto nessuno script viene caricato. */
    gaMeasurementId: "",
    /** Da configurare: ID Meta Pixel. */
    metaPixelId: "",
  },

  auth: {
    emailPassword: true,
    google: true,
    /** Richiede un provider SMS configurato nel backend. */
    phoneOtp: false,
    guest: true,
  },

  legal: {
    /** Ragione sociale, P.IVA, sede legale: da configurare. */
    companyName: "",
    vatNumber: "",
    registeredAddress: "",
    privacyEmail: "",
  },
} as const;

export type LocationId = "cecina" | "volterra";

export const isConfigured = (value: string | undefined | null): value is string =>
  typeof value === "string" && value.trim().length > 0;
