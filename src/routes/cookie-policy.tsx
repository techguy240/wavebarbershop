import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/site/LegalPage";
import { Button } from "@/components/ui/button";
import { clearConsent } from "@/lib/consent";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/cookie-policy")({
  head: () => pageMeta({ title: "Cookie policy", description: "Informazioni sui cookie utilizzati dal sito WaveBarbershop.", path: "/cookie-policy" }),
  component: () => (
    <LegalPage eyebrow="Cookie" title="Cookie policy" intro="Quali cookie usiamo e come gestire le tue preferenze.">
      <section>
        <h2>Cookie tecnici</h2>
        <p>Necessari al funzionamento del sito (es. sessione di accesso, preferenze sui cookie). Non richiedono consenso.</p>
      </section>
      <section>
        <h2>Cookie statistici</h2>
        <p>Attivati solo con il tuo consenso e solo se un servizio di analisi è configurato. Servono a misurare in forma aggregata l'uso del sito.</p>
      </section>
      <section>
        <h2>Contenuti di terze parti</h2>
        <p>Le mappe incorporate sono fornite da Google Maps e possono impostare cookie propri secondo le rispettive policy.</p>
      </section>
      <section>
        <h2>Gestisci le preferenze</h2>
        <Button variant="outline-gold" size="sm" onClick={() => clearConsent()}>
          Modifica consenso cookie
        </Button>
      </section>
    </LegalPage>
  ),
});
