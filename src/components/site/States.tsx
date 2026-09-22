import { AlertTriangle, Inbox, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function LoadingState({ label = "Caricamento…", className }: { label?: string; className?: string }) {
  return (
    <div className={cn("flex flex-col items-center justify-center gap-3 py-16 text-muted-foreground", className)} role="status" aria-live="polite">
      <Loader2 className="size-6 animate-spin text-gold" aria-hidden="true" />
      <p className="text-sm">{label}</p>
    </div>
  );
}

export function ErrorState({
  title = "Qualcosa è andato storto",
  description = "Riprova tra qualche istante.",
  onRetry,
  className,
}: {
  title?: string;
  description?: string;
  onRetry?: () => void;
  className?: string;
}) {
  return (
    <div className={cn("card-premium flex flex-col items-center gap-3 p-8 text-center", className)} role="alert">
      <AlertTriangle className="size-7 text-gold" aria-hidden="true" />
      <h3 className="font-display text-lg font-semibold">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
      {onRetry && (
        <Button variant="outline-gold" size="sm" onClick={onRetry}>
          Riprova
        </Button>
      )}
    </div>
  );
}

export function EmptyState({
  title,
  description,
  action,
  className,
}: {
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("card-premium flex flex-col items-center gap-3 p-8 text-center", className)}>
      <Inbox className="size-7 text-gold" aria-hidden="true" />
      <h3 className="font-display text-lg font-semibold">{title}</h3>
      {description && <p className="max-w-sm text-sm text-muted-foreground">{description}</p>}
      {action}
    </div>
  );
}
