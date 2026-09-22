import { Scissors, Sparkles, FlaskConical, SquarePen } from "lucide-react";
import type { Service } from "@/config";
import { isConfigured } from "@/config";

const icons = {
  scissors: Scissors,
  razor: SquarePen,
  bottle: FlaskConical,
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
        <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{service.description}</p>
      </div>
      <p className="text-xs font-medium uppercase tracking-widest text-gold/80">
        {isConfigured(service.price) ? service.price : "Prezzo su richiesta"}
      </p>
    </article>
  );
}
