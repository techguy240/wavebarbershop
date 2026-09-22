import { useState } from "react";
import { CalendarCheck } from "lucide-react";
import { Button, type ButtonProps } from "@/components/ui/button";
import { LocationSelector } from "./LocationSelector";
import { siteConfig, type LocationId } from "@/config";

interface Props extends Omit<ButtonProps, "onClick"> {
  /** Se indicato, salta la scelta della sede. */
  locationId?: LocationId;
  label?: string;
  withIcon?: boolean;
}

/**
 * CTA "Prenota ora": apre il selettore sede e reindirizza al sistema
 * di prenotazione ufficiale configurato in src/config/site.ts.
 */
export function BookButton({ locationId, label = siteConfig.booking.label, withIcon = true, ...props }: Props) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button {...props} onClick={() => setOpen(true)}>
        {withIcon && <CalendarCheck aria-hidden="true" />}
        {label}
      </Button>
      <LocationSelector open={open} onOpenChange={setOpen} preselect={locationId} />
    </>
  );
}
