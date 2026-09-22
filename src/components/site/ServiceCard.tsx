import { Clock, Scissors, Sparkles, SquarePen } from "lucide-react";
import type { Service } from "@/config";

const icons = {
  scissors: Scissors,
  razor: SquarePen,
  sparkles: Sparkles,
};

export function ServiceCard({ service, index = 0 }: { service: Service; index?: number }) {
  const Icon = icons[service.icon];
  return (
    <article
      className="card-premium group flex h-full flex-col gap-4 p-6 animate-fade-up"
      style={{ animationDelay: `${index * 70}ms` }}
    >
      <div className="flex size-11 items-center justify-center rounded-xl border border-gold/30 bg-gold/10 text-gold">
        <Icon className="size-5" aria-hidden="true" />
      </div>
      <div className="flex-1">
        <h3 className="font-display text-lg font-semibold">{service.name}</h3>
      </div>
      <div className="flex items-center justify-between gap-4 text-sm">
        <p className="font-display font-semibold text-gold">{service.price}</p>
        <p className="flex items-center gap-1.5 text-muted-foreground">
          <Clock className="size-4" aria-hidden="true" />
          {service.durationMinutes} minuti
        </p>
      </div>
    </article>
  );
}
