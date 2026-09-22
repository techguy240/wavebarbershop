import { createFileRoute } from "@tanstack/react-router";
import { SectionHeading } from "@/components/site/SectionHeading";
import { LocationCard } from "@/components/site/LocationCard";
import { MapCard } from "@/components/site/MapCard";
import { locationList } from "@/config";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/sedi/")({
  head: () =>
    pageMeta({
      title: "Sedi: Cecina e Volterra",
      description: "Le due sedi WaveBarbershop: Via Napoli 28 a Cecina e Via Ricciarelli 16 a Volterra. Orari, telefono, mappa e indicazioni.",
      path: "/sedi",
    }),
  component: SediPage,
});

function SediPage() {
  return (
    <>
      <section className="container-site pt-12 sm:pt-20">
        <SectionHeading as="h1" eyebrow="Sedi" title="Dove trovarci" description="Scegli la sede più vicina: orari, contatti e indicazioni stradali." />
      </section>
      <section className="container-site grid gap-6 py-10 md:grid-cols-2 sm:py-14">
        {locationList.map((l, i) => (
          <LocationCard key={l.id} location={l} index={i} />
        ))}
      </section>
      <section className="container-site grid gap-6 pb-16 md:grid-cols-2 sm:pb-24" aria-label="Mappe delle sedi">
        {locationList.map((l) => (
          <div key={l.id}>
            <h2 className="mb-3 font-display text-lg font-semibold">{l.city}</h2>
            <MapCard location={l} />
          </div>
        ))}
      </section>
    </>
  );
}
