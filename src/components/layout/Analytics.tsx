import { useEffect } from "react";
import { getConsent } from "@/lib/consent";
import { isConfigured, siteConfig } from "@/config";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

/** Carica Google Analytics solo con consenso e solo se l'ID è configurato. */
export function Analytics() {
  useEffect(() => {
    const id = siteConfig.analytics.gaMeasurementId;
    if (!isConfigured(id)) return;

    const load = () => {
      if (!getConsent()?.analytics || document.getElementById("ga-script")) return;
      const s = document.createElement("script");
      s.id = "ga-script";
      s.async = true;
      s.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`;
      document.head.appendChild(s);
      window.dataLayer = window.dataLayer || [];
      window.gtag = (...args: unknown[]) => window.dataLayer!.push(args);
      window.gtag("js", new Date());
      window.gtag("config", id, { anonymize_ip: true });
    };
    load();
    window.addEventListener("wave:consent", load);
    return () => window.removeEventListener("wave:consent", load);
  }, []);
  return null;
}
