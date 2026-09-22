import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Cookie } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getConsent, setConsent } from "@/lib/consent";
import { DemoNotice } from "@/components/site/DemoNotice";
import { isConfigured, siteConfig } from "@/config";

/**
 * Banner cookie GDPR. Gli script analytics vengono caricati solo dopo
 * il consenso e solo se un ID è configurato in src/config/site.ts.
 */
export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const sync = () => setVisible(getConsent() === null);
    sync();
    window.addEventListener("wave:consent", sync);
    return () => window.removeEventListener("wave:consent", sync);
  }, []);

  if (!visible) return null;

  const hasAnalytics = isConfigured(siteConfig.analytics.gaMeasurementId) || isConfigured(siteConfig.analytics.metaPixelId);

  return (
    <div
      role="dialog"
      aria-labelledby="cookie-title"
      aria-describedby="cookie-desc"
      className="fixed inset-x-3 bottom-[5.5rem] z-50 mx-auto max-w-lg rounded-3xl border border-border bg-surface p-5 shadow-card animate-fade-up md:bottom-6 md:inset-x-6 md:mx-0 md:ml-auto"
    >
      <div className="flex items-start gap-3">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-gold/10 text-gold">
          <Cookie className="size-5" aria-hidden="true" />
        </span>
        <div className="min-w-0 flex-1">
          <h2 id="cookie-title" className="font-display font-semibold">
            Cookie e privacy
          </h2>
          <p id="cookie-desc" className="mt-1 text-sm text-muted-foreground">
            Usiamo solo cookie tecnici necessari. Con il tuo consenso possiamo attivare cookie statistici.{" "}
            <Link to="/cookie-policy" className="text-gold underline-offset-4 hover:underline">
              Cookie policy
            </Link>
          </p>
          {!hasAnalytics && <DemoNotice className="mt-3">Nessun servizio di analytics configurato: non viene caricato alcuno script di terze parti.</DemoNotice>}
        </div>
      </div>
      <div className="mt-4 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
        <Button variant="ghost" size="sm" onClick={() => setConsent({ analytics: false, marketing: false })}>
          Solo necessari
        </Button>
        <Button size="sm" onClick={() => setConsent({ analytics: true, marketing: false })}>
          Accetta tutti
        </Button>
      </div>
    </div>
  );
}
