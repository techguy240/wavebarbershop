import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/site/LegalPage";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/privacy")({
  head: () => pageMeta({ title: "Privacy policy", description: "Informativa sul trattamento dei dati personali di WaveBarbershop.", path: "/privacy" }),
  component: () => (
    <LegalPage eyebrow="Privacy" title="Informativa privacy" intro="Informativa ai sensi degli artt. 13 e 14 del Regolamento (UE) 2016/679 (GDPR).">
      <section>
        <h2>Dati trattati</h2>
        <ul>
          <li>Dati di account: nome, cognome, email, telefono (se ti registri).</li>
          <li>Dati della sessione ospite: nome, cognome e telefono, conservati solo nel tuo browser.</li>
          <li>Dati tecnici di navigazione strettamente necessari al funzionamento del sito.</li>
        </ul>
      </section>
      <section>
        <h2>Finalità e base giuridica</h2>
        <ul>
          <li>Gestione dell'area clienti e delle richieste: esecuzione del contratto / misure precontrattuali.</li>
          <li>Statistiche anonime (solo previo consenso ai cookie).</li>
        </ul>
      </section>
      <section>
        <h2>Conservazione</h2>
        <p>I dati dell'account sono conservati finché l'account resta attivo; puoi richiederne la cancellazione in qualsiasi momento.</p>
      </section>
      <section>
        <h2>Diritti dell'interessato</h2>
        <p>Puoi esercitare i diritti di accesso, rettifica, cancellazione, limitazione, portabilità e opposizione contattando il titolare ai recapiti indicati sul sito. Hai inoltre diritto di proporre reclamo al Garante per la protezione dei dati personali.</p>
      </section>
      <section>
        <h2>Prenotazioni</h2>
        <p>Le prenotazioni vengono gestite tramite il sistema ufficiale WaveBarbershop, soggetto alla relativa informativa.</p>
      </section>
    </LegalPage>
  ),
});
