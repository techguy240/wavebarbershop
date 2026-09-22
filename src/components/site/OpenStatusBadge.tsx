import { useEffect, useState } from "react";
import type { Location } from "@/config";
import { getOpenStatus, type OpenStatus } from "@/lib/hours";
import { cn } from "@/lib/utils";

/** Stato aperto/chiuso calcolato lato client (fuso Europe/Rome), aggiornato ogni minuto. */
export function OpenStatusBadge({
  location,
  className,
  compact = false,
}: {
  location: Location;
  className?: string;
  compact?: boolean;
}) {
  const [status, setStatus] = useState<OpenStatus | null>(null);

  useEffect(() => {
    const tick = () => setStatus(getOpenStatus(location));
    tick();
    const id = window.setInterval(tick, 60_000);
    return () => window.clearInterval(id);
  }, [location]);

  if (!status) {
    return <span className={cn("inline-block h-4 w-24 animate-pulse rounded bg-muted", className)} aria-hidden="true" />;
  }

  return (
    <span
      className={cn("inline-flex items-center gap-2 text-xs font-medium", className)}
      role="status"
      aria-live="polite"
    >
      <span
        className={cn("size-2 rounded-full", status.isOpen ? "bg-success" : "bg-muted-foreground/60")}
        aria-hidden="true"
      />
      <span className={status.isOpen ? "text-success" : "text-muted-foreground"}>{status.label}</span>
      {!compact && status.detail && <span className="text-muted-foreground">· {status.detail}</span>}
      {compact && status.detail && <span className="text-muted-foreground/80">· {status.detail}</span>}
    </span>
  );
}
