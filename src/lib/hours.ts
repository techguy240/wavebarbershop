import type { DayHours, Location } from "@/config/locations";

const DAY_NAMES = ["Domenica", "Lunedì", "Martedì", "Mercoledì", "Giovedì", "Venerdì", "Sabato"];

const toMinutes = (hhmm: string) => {
  const [h = 0, m = 0] = hhmm.split(":").map(Number);
  return h * 60 + m;
};

/** Ora corrente nel fuso orario italiano. */
function nowInRome(now = new Date()) {
  const parts = new Intl.DateTimeFormat("it-IT", {
    timeZone: "Europe/Rome",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(now);
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "";
  const wd = get("weekday").toLowerCase();
  const map: Record<string, number> = { dom: 0, lun: 1, mar: 2, mer: 3, gio: 4, ven: 5, sab: 6 };
  const day = map[wd.slice(0, 3)] ?? now.getDay();
  const minutes = Number(get("hour")) * 60 + Number(get("minute"));
  return { day, minutes };
}

export interface OpenStatus {
  isOpen: boolean;
  label: string;
  detail: string;
}

export function getOpenStatus(location: Location, now = new Date()): OpenStatus {
  const { day, minutes } = nowInRome(now);
  const today = location.hours.find((h) => h.day === day);

  if (today?.open && today.close) {
    const open = toMinutes(today.open);
    const close = toMinutes(today.close);
    if (minutes >= open && minutes < close) {
      return { isOpen: true, label: "Aperto ora", detail: `Chiude alle ${today.close}` };
    }
    if (minutes < open) {
      return { isOpen: false, label: "Chiuso", detail: `Apre oggi alle ${today.open}` };
    }
  }

  // prossimo giorno di apertura
  for (let i = 1; i <= 7; i++) {
    const d = (day + i) % 7;
    const h = location.hours.find((x) => x.day === d);
    if (h?.open) {
      const when = i === 1 ? "domani" : (DAY_NAMES[d] ?? "").toLowerCase();
      return { isOpen: false, label: "Chiuso", detail: `Apre ${when} alle ${h.open}` };
    }
  }
  return { isOpen: false, label: "Chiuso", detail: "" };
}

export function formatDayHours(h: DayHours): string {
  return h.open && h.close ? `${h.open} – ${h.close}` : "Chiuso";
}

export const dayName = (day: number) => DAY_NAMES[day] ?? "";

/** Ordine lun → dom per la tabella orari. */
export const weekOrder = [1, 2, 3, 4, 5, 6, 0];
