/**
 * Preferenza "ricordami su questo dispositivo".
 * Se attiva, la sessione resta anche dopo la chiusura del browser.
 * Se disattiva, l'accesso viene dimenticato alla chiusura del browser.
 */
const KEY = "wave.remember";
const ALIVE = "wave.session.alive";

export function setRemember(value: boolean) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(KEY, value ? "1" : "0");
  window.sessionStorage.setItem(ALIVE, "1");
}

export function getRemember(): boolean {
  if (typeof window === "undefined") return true;
  return window.localStorage.getItem(KEY) !== "0";
}

/** true se la sessione va chiusa perché l'utente non ha scelto di essere ricordato. */
export function shouldForgetSession(): boolean {
  if (typeof window === "undefined") return false;
  const alive = window.sessionStorage.getItem(ALIVE) === "1";
  if (alive) return false;
  window.sessionStorage.setItem(ALIVE, "1");
  return !getRemember();
}
