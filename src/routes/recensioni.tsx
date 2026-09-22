import { createFileRoute } from "@tanstack/react-router";
import { Star, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/site/SectionHeading";
import { DemoNotice } from "@/components/site/DemoNotice";
import { CTASection } from "@/components/site/CTASection";
import { isConfigured, locationList } from "@/config";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/recensioni")({
  head: () =>
    pageMeta({
      title: "Recensioni",
      description: "Le valutazioni Google dei clienti WaveBarbershop: 5.0 su 5 a Cecina (15 recensioni) e 4.9 su 5 a Volterra (23 recensioni).",
      path: "/recensioni",
    }),
  component: RecensioniPage,
});

function RecensioniPage() {
  return (
    <>
      <section className="container-site pt-12 sm:pt-20">
        <SectionHeading as="h1" eyebrow="Recensioni" title="Cosa dicono i clienti" description="Le valutazioni reali pubblicate su Google per ciascuna sede." />
      </section>
      <section className="container-site grid gap-6 py-10 md:grid-cols-2 sm:py-14">
        {locationList.map((l, i) => {
          const { rating, count, source, url } = l.reviews;
          return (
            <article key={l.id} className="card-premium p-8 animate-fade-up" style={{ animationDelay: `${i * 100}ms` }}>
              <p className="eyebrow">{l.city}</p>
              <div className="mt-4 flex items-end gap-3">
                <span className="font-display text-6xl font-semibold leading-none text-gold-gradient">{rating.toFixed(1)}</span>
                <span className="pb-1 text-muted-foreground">/ 5</span>
              </div>
              <div className="mt-3 flex gap-1" aria-hidden="true">
                {Array.from({ length: 5 }).map((_, k) => (
                  <Star key={k} className={k < Math.round(rating) ? "size-5 fill-gold text-gold" : "size-5 text-muted-foreground/40"} />
                ))}
              </div>
              <p className="mt-3 text-sm text-muted-foreground">
                {count} recensioni su {source}
              </p>
              <div className="mt-6">
                {isConfigured(url) ? (
                  <Button asChild variant="outline-gold">
                    <a href={url} target="_blank" rel="noopener noreferrer">
                      Leggi le recensioni
                      <ExternalLink aria-hidden="true" />
                    </a>
                  </Button>
                ) : (
                  <DemoNotice>Il link alle recensioni Google di {l.city} è da configurare: qui compariranno le recensioni reali.</DemoNotice>
                )}
              </div>
            </article>
          );
        })}
      </section>
      <CTASection />
    </>
  );
}
