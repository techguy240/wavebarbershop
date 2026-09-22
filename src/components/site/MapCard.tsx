import { Navigation, ExternalLink } from "lucide-react";
import type { Location } from "@/config";
import { directionsHref, mapEmbedSrc, mapsSearchHref } from "@/lib/links";
import { Button } from "@/components/ui/button";

/** Mappa basata sull'indirizzo reale della sede. */
export function MapCard({ location }: { location: Location }) {
  return (
    <div className="card-premium overflow-hidden">
      <div className="aspect-[4/3] w-full sm:aspect-[16/9]">
        <iframe
          title={`Mappa ${location.name}`}
          src={mapEmbedSrc(location)}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="h-full w-full grayscale-[35%] contrast-[1.05]"
          allowFullScreen
        />
      </div>
      <div className="flex flex-wrap gap-3 p-4">
        <Button asChild className="flex-1">
          <a href={directionsHref(location)} target="_blank" rel="noopener noreferrer">
            <Navigation aria-hidden="true" />
            Indicazioni
          </a>
        </Button>
        <Button asChild variant="outline">
          <a href={mapsSearchHref(location)} target="_blank" rel="noopener noreferrer">
            <ExternalLink aria-hidden="true" />
            Apri in Maps
          </a>
        </Button>
      </div>
    </div>
  );
}
