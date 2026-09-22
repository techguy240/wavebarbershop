import { useEffect, useState } from "react";
import { ArrowUpRight, Phone, MapPin } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { OpenStatusBadge } from "./OpenStatusBadge";
import { APP_STORE_URL, GOOGLE_PLAY_URL, isConfigured, locationList, siteConfig, type LocationId } from "@/config";
import { telHref } from "@/lib/links";
import { cn } from "@/lib/utils";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  preselect?: LocationId | undefined;
}

export function LocationSelector({ open, onOpenChange, preselect }: Props) {
  const [selected, setSelected] = useState<LocationId | undefined>(preselect);
  useEffect(() => {
    if (open) setSelected(preselect);
  }, [open, preselect]);

  const location = selected ? locationList.find((l) => l.id === selected) : undefined;
  const appUrl = isConfigured(GOOGLE_PLAY_URL) ? GOOGLE_PLAY_URL : APP_STORE_URL;
  const canOpenAppStore = isConfigured(appUrl);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md rounded-3xl border-border bg-surface p-6 sm:p-8">
        <DialogHeader className="text-left">
          <p className="eyebrow">Prenotazione online</p>
          <DialogTitle className="font-display text-2xl">PRENOTA TRAMITE L'APP</DialogTitle>
          <DialogDescription>Per prenotare online, scarica l'app ufficiale WaveBarbershop.</DialogDescription>
        </DialogHeader>

        {canOpenAppStore ? (
          <Button asChild size="lg" className="w-full">
            <a href={appUrl} target={siteConfig.booking.openInNewTab ? "_blank" : undefined} rel="noopener noreferrer">
              PRENOTA NELL'APP
              <ArrowUpRight aria-hidden="true" />
            </a>
          </Button>
        ) : (
          <Button size="lg" className="w-full" disabled>
            PRENOTA NELL'APP
          </Button>
        )}

        <p className="text-sm font-medium">Oppure scegli la sede e chiama:</p>

        <div className="mt-2 grid gap-3" role="radiogroup" aria-label="Sede">
          {locationList.map((l) => {
            const active = selected === l.id;
            return (
              <button
                key={l.id}
                type="button"
                role="radio"
                aria-checked={active}
                onClick={() => setSelected(l.id)}
                className={cn(
                  "flex items-center gap-4 rounded-2xl border p-4 text-left transition-all",
                  active ? "border-gold bg-gold/10" : "border-border bg-surface-2 hover:border-foreground/30",
                )}
              >
                <img src={l.cover.src} alt="" className="h-14 w-14 shrink-0 rounded-xl object-cover" />
                <div className="min-w-0 flex-1">
                  <p className="font-display font-semibold">{l.city}</p>
                  <p className="truncate text-sm text-muted-foreground">
                    {l.address}, {l.city}
                  </p>
                  <OpenStatusBadge location={l} className="mt-1" compact />
                </div>
              </button>
            );
          })}
        </div>

        {location && (
          <div className="mt-2 space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <Button asChild variant="outline-gold" size="lg">
                <a href={telHref(location.phoneE164)}>
                  <Phone aria-hidden="true" />
                  Chiama
                </a>
              </Button>
              <Button asChild variant="outline" size="lg">
                <a href={`/sedi/${location.id}`}>
                  <MapPin aria-hidden="true" />
                  Dettagli
                </a>
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
