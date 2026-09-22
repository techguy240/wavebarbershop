export interface Service {
  id: string;
  name: string;
  price: string;
  durationMinutes: number;
  icon: "scissors" | "razor" | "sparkles";
}

/** Catalogo unico WaveBarbershop, condiviso in tutte le pagine del sito. */
export const services: Service[] = [
  { id: "barba", name: "Barba", price: "€15,00", durationMinutes: 30, icon: "razor" },
  {
    id: "taglio-con-shampoo",
    name: "Taglio capelli con shampoo",
    price: "€17,00",
    durationMinutes: 30,
    icon: "scissors",
  },
  {
    id: "barba-capelli",
    name: "Barba e capelli",
    price: "€25,00",
    durationMinutes: 60,
    icon: "scissors",
  },
  {
    id: "taglio-senza-shampoo",
    name: "Taglio capelli senza shampoo",
    price: "€16,00",
    durationMinutes: 30,
    icon: "scissors",
  },
  {
    id: "decolorazione-colore",
    name: "Decolorazione-Colore",
    price: "€70,00",
    durationMinutes: 120,
    icon: "sparkles",
  },
];