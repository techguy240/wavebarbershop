import { Link } from "@tanstack/react-router";
import { ArrowRight, MapPin, Phone } from "lucide-react";
import type { Location } from "@/config";
import { fullAddress } from "@/config";
import { telHref } from "@/lib/links";
import { Button } from "@/components/ui/button";
import { OpenStatusBadge } from "./OpenStatusBadge";
import { ReviewSummary } from "./ReviewSummary";
import { BookButton } from "./BookButton";

export function LocationCard({ location, index = 0 }: { location: Location; index?: number }) {
  return (
    <article
      className="card-premium group flex flex-col overflow-hidden animate-fade-up"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <Link to="/sedi/$locationId" params={{ locationId: location.id }} className="relative block aspect-[4/3] overflow-hidden" aria-label={`Scopri la sede di ${location.city}`}>
        <img src={location.cover.src} alt={location.cover.alt} className="img-zoom h-full w-full object-cover" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/10 to-transparent" aria-hidden="true" />
        <div className="absolute inset-x-5 bottom-5">
          <p className="eyebrow">Sede</p>
          <h3 className="font-display text-3xl font-semibold">{location.city}</h3>
        </div>
      </Link>
      <div className="flex flex-1 flex-col gap-4 p-6">
        <OpenStatusBadge location={location} />
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li className="flex items-start gap-2.5">
            <MapPin className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden="true" />
            <span>{fullAddress(location)}</span>
          </li>
          <li className="flex items-start gap-2.5">
            <Phone className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden="true" />
            <a href={telHref(location.phoneE164)} className="hover:text-gold">
              {location.phone}
            </a>
          </li>
        </ul>
        <ReviewSummary location={location} size="sm" />
        <div className="mt-auto flex flex-wrap gap-3 pt-2">
          <BookButton locationId={location.id} size="default" className="flex-1" />
          <Button asChild variant="outline" size="default">
            <Link to="/sedi/$locationId" params={{ locationId: location.id }}>
              Dettagli
              <ArrowRight aria-hidden="true" />
            </Link>
          </Button>
        </div>
      </div>
    </article>
  );
}
