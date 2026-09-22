import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/site/LegalPage";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/termini")({
  head: () => pageMeta({ title: "Termini e condizioni", description: "Termini di utilizzo del sito WaveBarbershop.", path: "/termini" }),
  component: () => (
    <LegalPage eyebrow="Termini" title="Termini e condizioni" intro="Condizioni generali di utilizzo del sito e dell'area clienti.">
      <section>
        <h2>Uso del sito</h2>
        <p>Il sito ha finalità informative e di accesso ai servizi di prenotazione. I contenuti (testi, foto, logo) sono di proprietà del titolare e non possono essere riutilizzati senza autorizzazione.</p>
      </section>
      <section>
        <h2>Account</h2>
        <p>Sei responsabile della riservatezza delle tue credenziali. Puoi richiedere in qualsiasi momento la chiusura dell'account.</p>
      </section>
      <section>
        <h2>Prenotazioni</h2>
        <p>Le prenotazioni sono gestite dal sistema ufficiale WaveBarbershop e regolate dalle sue condizioni. Orari e servizi possono variare: fanno fede le informazioni comunicate dalla sede.</p>
      </section>
      <section>
        <h2>Legge applicabile</h2>
        <p>Si applica la legge italiana.</p>
      </section>
    </LegalPage>
  ),
});
