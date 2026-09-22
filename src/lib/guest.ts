import { z } from "zod";
import { getRemember } from "@/lib/remember";

/**
 * Sessione ospite: memorizzata solo nel browser.
 * Con "ricordami" attivo resta salvata sul dispositivo, altrimenti
 * viene dimenticata alla chiusura del browser.
 */
export const guestSchema = z.object({
  firstName: z.string().trim().min(2, "Inserisci il nome").max(60),
  lastName: z.string().trim().min(2, "Inserisci il cognome").max(60),
  phone: z
    .string()
    .trim()
    .regex(/^\+?[0-9 ]{8,16}$/, "Numero di telefono non valido"),
});

export type GuestSession = z.infer<typeof guestSchema> & { createdAt: string };

const KEY = "wave.guest";

export function getGuestSession(): GuestSession | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.sessionStorage.getItem(KEY) ?? window.localStorage.getItem(KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as GuestSession;
    return guestSchema.safeParse(parsed).success ? parsed : null;
  } catch {
    return null;
  }
}

export function setGuestSession(data: z.infer<typeof guestSchema>): GuestSession {
  const session: GuestSession = { ...data, createdAt: new Date().toISOString() };
  const value = JSON.stringify(session);
  if (getRemember()) window.localStorage.setItem(KEY, value);
  else window.localStorage.removeItem(KEY);
  window.sessionStorage.setItem(KEY, value);
  window.dispatchEvent(new Event("wave:guest"));
  return session;
}

export function clearGuestSession() {
  window.sessionStorage.removeItem(KEY);
  window.localStorage.removeItem(KEY);
  window.dispatchEvent(new Event("wave:guest"));
}
