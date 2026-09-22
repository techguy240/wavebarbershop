/** Consenso cookie: memorizzato in localStorage, nessuno script di terze parti finché non accettato. */
export type Consent = { analytics: boolean; marketing: boolean; decidedAt: string };

const KEY = "wave.consent.v1";

export function getConsent(): Consent | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Consent) : null;
  } catch {
    return null;
  }
}

export function setConsent(c: Omit<Consent, "decidedAt">) {
  const value: Consent = { ...c, decidedAt: new Date().toISOString() };
  window.localStorage.setItem(KEY, JSON.stringify(value));
  window.dispatchEvent(new Event("wave:consent"));
  return value;
}

export function clearConsent() {
  window.localStorage.removeItem(KEY);
  window.dispatchEvent(new Event("wave:consent"));
}
