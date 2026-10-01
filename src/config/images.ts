/**
 * Immagini ufficiali WaveBarbershop (asset caricati dal titolare).
 * Nessuna immagine stock: ogni foto appartiene alla sede indicata.
 */
import logoAsset from "@/assets/logo.png";
import cecinaSalone from "@/assets/cecina-salone.png";
import cecinaVetrina from "@/assets/cecina-vetrina-logo.png";
import cecinaPoltrona from "@/assets/cecina-poltrona.png";
import cecinaPostazioni from "@/assets/cecina-postazioni.png";
import barbiereAlLavoro from "@/assets/barbiere-al-lavoro.png";
import volterraEsterno from "@/assets/volterra-esterno.png";
import volterraInterno1 from "@/assets/volterra-interno-1.png";
import volterraInterno2 from "@/assets/volterra-interno-2.png";

export interface SiteImage {
  src: string;
  alt: string;
  location?: "cecina" | "volterra";
}

const url = (a: string) => a;

export const images = {
  logo: { src: url(logoAsset), alt: "Logo WaveBarbershop" } satisfies SiteImage,

  hero: {
    src: url(cecinaSalone),
    alt: "Interno della sede WaveBarbershop di Cecina",
    location: "cecina",
  } satisfies SiteImage,

  barber: {
    src: url(barbiereAlLavoro),
    alt: "Barbiere WaveBarbershop al lavoro durante un taglio",
    location: "cecina",
  } satisfies SiteImage,

  cecina: [
    { src: url(cecinaSalone), alt: "Salone WaveBarbershop Cecina: postazioni e poltrone", location: "cecina" },
    { src: url(cecinaPostazioni), alt: "Postazioni con specchi e luci nella sede di Cecina", location: "cecina" },
    { src: url(cecinaPoltrona), alt: "Poltrona da barbiere nella sede di Cecina", location: "cecina" },
    { src: url(cecinaVetrina), alt: "Vetrina con logo WaveBarbershop, sede di Cecina", location: "cecina" },
    { src: url(barbiereAlLavoro), alt: "Barbiere al lavoro nella sede di Cecina", location: "cecina" },
  ] satisfies SiteImage[],

  volterra: [
    { src: url(volterraEsterno), alt: "Ingresso della sede WaveBarbershop di Volterra", location: "volterra" },
    { src: url(volterraInterno1), alt: "Interno della sede di Volterra con postazioni e poltrone", location: "volterra" },
    { src: url(volterraInterno2), alt: "Area attesa nella sede di Volterra", location: "volterra" },
  ] satisfies SiteImage[],
} as const;

export const galleryImages: SiteImage[] = [...images.cecina, ...images.volterra];
