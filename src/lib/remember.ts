/**
 * Preferenza "ricordami su questo dispositivo".
 * Se attiva, la sessione resta anche dopo la chiusura del browser.
 * Se disattiva, l'accesso viene dimenticato alla chiusura del browser.
 *
 * Il marker "sessione viva" è un cookie di sessione (senza scadenza): è condiviso
 * tra le schede e il browser lo elimina alla chiusura, a differenza di sessionStorage
 * che è per singola scheda.
 */
const KEY = "wave.remember";
const ALIVE = "wave_session_alive";

function markAlive() {
  document.cookie = `${ALIVE}=1; path=/; SameSite=Lax`;
}

function isAlive() {
  return document.cookie.split("; ").some((c) => c === `${ALIVE}=1`);
}

export function setRemember(value: boolean) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(KEY, value ? "1" : "0");
  markAlive();
}

export function getRemember(): boolean {
  if (typeof window === "undefined") return true;
  return window.localStorage.getItem(KEY) !== "0";
}

/** true se la sessione va chiusa perché l'utente non ha scelto di essere ricordato. */
export function shouldForgetSession(): boolean {
  if (typeof window === "undefined") return false;
  if (isAlive()) return false;
  markAlive();
  return !getRemember();
}
