import type { LocationId } from "./site";
import { images, type SiteImage } from "./images";
import { services, type Service } from "./services";

/** 0 = domenica … 6 = sabato (come Date.getDay()). */
export interface DayHours {
  day: number;
  /** null = chiuso */
  open: string | null;
  close: string | null;
}

export interface StaffMember {
  id: string;
  name: string;
  /** Ruolo generico (non inventiamo bio). */
  role: string;
  locations: LocationId[];
}

export interface ReviewSummary {
  rating: number;
  count: number;
  source: "Google";
  /** URL pubblico delle recensioni: da configurare. */
  url: string;
}

export interface Location {
  id: LocationId;
  name: string;
  city: string;
  province: string;
  address: string;
  postalCode: string;
  phone: string;
  /** Numero in formato E.164 per il link tel:. */
  phoneE164: string;
  hours: DayHours[];
  hoursLabel: string[];
  services: Service[];
  staffIds: string[];
  reviews: ReviewSummary;
  images: SiteImage[];
  cover: SiteImage;
  /** Coordinate non fornite: la mappa usa l'indirizzo. */
  mapQuery: string;
  vibe: string;
}

export const staff: StaffMember[] = [
  { id: "nicco", name: "Nicco", role: "Barbiere", locations: ["cecina", "volterra"] },
  { id: "luca", name: "Luca", role: "Barbiere", locations: ["cecina"] },
  { id: "martino", name: "Martino", role: "Barbiere", locations: ["cecina"] },
  { id: "luigi", name: "Luigi", role: "Barbiere", locations: ["volterra"] },
];

const closed = (day: number): DayHours => ({ day, open: null, close: null });

export const locations: Record<LocationId, Location> = {
  cecina: {
    id: "cecina",
    name: "WaveBarbershop Cecina",
    city: "Cecina",
    province: "LI",
    address: "Via Napoli, 28",
    postalCode: "57023",
    phone: "0586 016117",
    phoneE164: "+390586016117",
    hours: [
      closed(0),
      { day: 1, open: "09:00", close: "20:00" },
      { day: 2, open: "09:00", close: "20:00" },
      { day: 3, open: "09:00", close: "20:00" },
      { day: 4, open: "09:00", close: "20:00" },
      { day: 5, open: "09:00", close: "20:00" },
      { day: 6, open: "09:00", close: "20:00" },
    ],
    hoursLabel: ["Lun – Sab: 09:00 – 20:00", "Domenica: chiuso"],
    services,
    staffIds: ["nicco", "luca", "martino"],
    reviews: { rating: 5.0, count: 15, source: "Google", url: "" },
    images: images.cecina,
    cover: images.cecina[0] ?? images.hero,
    mapQuery: "WaveBarbershop, Via Napoli 28, 57023 Cecina LI",
    vibe: "Ambiente luminoso e contemporaneo, dettagli in marmo e oro.",
  },
  volterra: {
    id: "volterra",
    name: "WaveBarbershop Volterra",
    city: "Volterra",
    province: "PI",
    address: "Via Ricciarelli, 16",
    postalCode: "56048",
    phone: "0588 070024",
    phoneE164: "+390588070024",
    hours: [
      closed(0),
      closed(1),
      { day: 2, open: "08:00", close: "19:00" },
      { day: 3, open: "08:00", close: "19:00" },
      { day: 4, open: "08:00", close: "19:00" },
      { day: 5, open: "08:00", close: "19:00" },
      { day: 6, open: "08:00", close: "17:00" },
    ],
    hoursLabel: ["Mar – Ven: 08:00 – 19:00", "Sabato: 08:00 – 17:00", "Lunedì e Domenica: chiuso"],
    services,
    staffIds: ["nicco", "luigi"],
    reviews: { rating: 4.9, count: 23, source: "Google", url: "" },
    images: images.volterra,
    cover: images.volterra[1] ?? images.hero,
    mapQuery: "WaveBarbershop, Via Ricciarelli 16, 56048 Volterra PI",
    vibe: "Atmosfera da barberia tradizionale nel centro storico.",
  },
};

export const locationList: Location[] = [locations.cecina, locations.volterra];

export const getLocation = (id: string): Location | undefined =>
  (id === "cecina" || id === "volterra" ? locations[id] : undefined);

export const getStaffForLocation = (id: LocationId): StaffMember[] =>
  staff.filter((s) => s.locations.includes(id));

export const fullAddress = (l: Location) =>
  `${l.address}, ${l.postalCode} ${l.city} (${l.province})`;
