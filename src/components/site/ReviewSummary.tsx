import { Star, ArrowUpRight } from "lucide-react";
import type { Location } from "@/config";
import { isConfigured } from "@/config";
import { cn } from "@/lib/utils";

/** Riepilogo recensioni reali (rating + numero). Nessun testo di recensione inventato. */
export function ReviewSummary({ location, className, size = "md" }: { location: Location; className?: string; size?: "sm" | "md" }) {
  const { rating, count, source, url } = location.reviews;
  const stars = Array.from({ length: 5 }, (_, i) => i < Math.round(rating));
  const content = (
    <>
      <span className="flex items-center gap-0.5" aria-hidden="true">
        {stars.map((filled, i) => (
          <Star key={i} className={cn(size === "sm" ? "size-3.5" : "size-4", filled ? "fill-gold text-gold" : "text-muted-foreground/40")} />
        ))}
      </span>
      <span className={cn("font-display font-semibold", size === "sm" ? "text-sm" : "text-base")}>{rating.toFixed(1)}</span>
      <span className={cn("text-muted-foreground", size === "sm" ? "text-xs" : "text-sm")}>
        {count} recensioni · {source}
      </span>
      {isConfigured(url) && <ArrowUpRight className="size-3.5 text-gold" aria-hidden="true" />}
    </>
  );
  const label = `${rating.toFixed(1)} su 5, ${count} recensioni ${source} per ${location.name}`;

  if (isConfigured(url)) {
    return (
      <a href={url} target="_blank" rel="noopener noreferrer" aria-label={label} className={cn("inline-flex flex-wrap items-center gap-2 hover:text-gold", className)}>
        {content}
      </a>
    );
  }
  return (
    <p className={cn("inline-flex flex-wrap items-center gap-2", className)} aria-label={label}>
      {content}
    </p>
  );
}
