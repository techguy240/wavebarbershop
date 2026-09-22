import { createFileRoute } from "@tanstack/react-router";
import { Mail, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/site/SectionHeading";
import { OpenStatusBadge } from "@/components/site/OpenStatusBadge";
import { HoursTable } from "@/components/site/HoursTable";
import { MapCard } from "@/components/site/MapCard";
import { BookButton } from "@/components/site/BookButton";
import { DemoNotice } from "@/components/site/DemoNotice";
import { fullAddress, isConfigured, locationList, siteConfig } from "@/config";
import { telHref } from "@/lib/links";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/contatti")({
  head: () =>
    pageMeta({
      title: "Contatti",
      description: "Contatta WaveBarbershop: Cecina 0586 016117, Volterra 0588 070024. Indirizzi, orari e mappe.",
      path: "/contatti",
    }),
  component: ContattiPage,
});

function ContattiPage() {
  return (
    <>
      <section className="container-site pt-12 sm:pt-20">
        <SectionHeading as="h1" eyebrow="Contatti" title="Parliamone" description="Chiamaci o passa a trovarci. Per gli appuntamenti usa la prenotazione online." />
        <div className="mt-6 flex flex-wrap gap-3">
          <BookButton size="lg" />
          {isConfigured(siteConfig.email) ? (
            <Button asChild variant="outline" size="lg">
              <a href={`mailto:${siteConfig.email}`}>
                <Mail aria-hidden="true" />
                {siteConfig.email}
              </a>
            </Button>
          ) : (
            <DemoNotice className="self-center">Email di contatto da configurare.</DemoNotice>
          )}
        </div>
      </section>

      <section className="container-site grid gap-8 py-12 md:grid-cols-2 sm:py-16">
        {locationList.map((l) => (
          <article key={l.id} className="space-y-4">
            <div className="card-premium p-6">
              <p className="eyebrow">{l.city}</p>
              <h2 className="mt-1 font-display text-2xl font-semibold">{l.name}</h2>
              <OpenStatusBadge location={l} className="mt-2" />
              <ul className="mt-5 space-y-3 text-sm">
                <li className="flex gap-2.5">
                  <MapPin className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden="true" />
                  {fullAddress(l)}
                </li>
                <li className="flex gap-2.5">
                  <Phone className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden="true" />
                  <a href={telHref(l.phoneE164)} className="hover:text-gold">
                    {l.phone}
                  </a>
                </li>
              </ul>
              <HoursTable location={l} className="mt-5" />
              <Button asChild variant="outline-gold" className="mt-5 w-full">
                <a href={telHref(l.phoneE164)}>
                  <Phone aria-hidden="true" />
                  Chiama {l.city}
                </a>
              </Button>
            </div>
            <MapCard location={l} />
          </article>
        ))}
      </section>
    </>
  );
}
