import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { ArrowLeft, Clock, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BookButton } from "@/components/site/BookButton";
import { OpenStatusBadge } from "@/components/site/OpenStatusBadge";
import { ReviewSummary } from "@/components/site/ReviewSummary";
import { ServiceCard } from "@/components/site/ServiceCard";
import { StaffCard } from "@/components/site/StaffCard";
import { HoursTable } from "@/components/site/HoursTable";
import { MapCard } from "@/components/site/MapCard";
import { Gallery } from "@/components/site/Gallery";
import { SectionHeading } from "@/components/site/SectionHeading";
import { fullAddress, getLocation, getStaffForLocation, services } from "@/config";
import { telHref } from "@/lib/links";
import { pageMeta } from "@/lib/seo";
import { barberShopSchema } from "@/lib/schema";

export const Route = createFileRoute("/sedi/$locationId")({
  loader: ({ params }) => {
    const location = getLocation(params.locationId);
    if (!location) throw notFound();
    return { location };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Sede non trovata" }, { name: "robots", content: "noindex" }] };
    const l = loaderData.location;
    const base = pageMeta({
      title: `Sede di ${l.city}`,
      description: `WaveBarbershop ${l.city}: ${fullAddress(l)}. Tel. ${l.phone}. ${l.hoursLabel.join(", ")}.`,
      path: `/sedi/${l.id}`,
    });
    return {
      ...base,
      scripts: [{ type: "application/ld+json", children: JSON.stringify(barberShopSchema(l)) }],
    };
  },
  component: LocationPage,
});

function LocationPage() {
  const { location: l } = Route.useLoaderData();
  const team = getStaffForLocation(l.id);

  return (
    <>
      <section className="relative -mt-16 sm:-mt-20" aria-labelledby="loc-title">
        <div className="relative h-[60dvh] min-h-[420px] overflow-hidden">
          <img src={l.cover.src} alt={l.cover.alt} className="absolute inset-0 h-full w-full object-cover" fetchPriority="high" />
          <div className="hero-overlay absolute inset-0" aria-hidden="true" />
          <div className="container-site relative flex h-full flex-col justify-end pb-10 pt-28">
            <Link to="/sedi" className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-gold">
              <ArrowLeft className="size-4" aria-hidden="true" />
              Tutte le sedi
            </Link>
            <p className="eyebrow mb-3">Sede</p>
            <h1 id="loc-title" className="font-display text-5xl font-semibold sm:text-6xl">
              {l.city}
            </h1>
            <p className="mt-3 max-w-md text-muted-foreground">{l.vibe}</p>
            <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2">
              <OpenStatusBadge location={l} />
              <ReviewSummary location={l} size="sm" />
            </div>
          </div>
        </div>
      </section>

      <section className="container-site grid gap-6 py-12 lg:grid-cols-[1fr_380px]">
        <div className="space-y-12">
          <div>
            <SectionHeading
              eyebrow="Servizi"
              title="Catalogo WaveBarbershop"
              description={`Per informazioni sui servizi disponibili nella sede di ${l.city}, contattaci.`}
            />
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {services.map((s, i) => (
                <ServiceCard key={s.id} service={s} index={i} />
              ))}
            </div>
          </div>
          <div>
            <SectionHeading eyebrow="Staff" title="Il team" />
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {team.map((m, i) => (
                <StaffCard key={m.id} member={m} index={i} />
              ))}
            </div>
          </div>
          <div>
            <SectionHeading eyebrow="Gallery" title={`Dentro la sede di ${l.city}`} />
            <Gallery images={l.images} className="mt-8" />
          </div>
        </div>

        <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
          <div className="card-premium space-y-5 p-6">
            <BookButton locationId={l.id} size="lg" className="w-full" />
            <Button asChild variant="outline-gold" size="lg" className="w-full">
              <a href={telHref(l.phoneE164)}>
                <Phone aria-hidden="true" />
                {l.phone}
              </a>
            </Button>
            <div className="space-y-3 border-t border-border pt-5 text-sm">
              <p className="flex gap-2.5">
                <MapPin className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden="true" />
                <span>{fullAddress(l)}</span>
              </p>
              <div className="flex gap-2.5">
                <Clock className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden="true" />
                <div className="flex-1">
                  <p className="mb-2 font-medium">Orari</p>
                  <HoursTable location={l} />
                </div>
              </div>
            </div>
          </div>
          <MapCard location={l} />
        </aside>
      </section>
    </>
  );
}
