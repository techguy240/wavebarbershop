import { Info } from "lucide-react";
import { DEMO_MODE } from "@/config";
import { cn } from "@/lib/utils";

/** Avviso esplicito per integrazioni non ancora configurate (visibile solo in DEMO_MODE). */
export function DemoNotice({ children, className }: { children: React.ReactNode; className?: string }) {
  if (!DEMO_MODE) return null;
  return (
    <p
      role="note"
      className={cn(
        "flex items-start gap-2 rounded-xl border border-dashed border-gold/40 bg-gold/5 px-3 py-2 text-xs text-muted-foreground",
        className,
      )}
    >
      <Info className="mt-0.5 size-3.5 shrink-0 text-gold" aria-hidden="true" />
      <span>{children}</span>
    </p>
  );
}
