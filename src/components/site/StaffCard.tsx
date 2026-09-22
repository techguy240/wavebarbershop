import type { StaffMember } from "@/config";
import { locations } from "@/config";

/** Scheda staff con solo dati forniti (nome, ruolo, sedi). Nessuna foto o bio inventata. */
export function StaffCard({ member, index = 0 }: { member: StaffMember; index?: number }) {
  return (
    <article
      className="card-premium flex items-center gap-4 p-5 animate-fade-up"
      style={{ animationDelay: `${index * 70}ms` }}
    >
      <div
        className="flex size-14 shrink-0 items-center justify-center rounded-full border border-gold/40 bg-gold/10 font-display text-xl font-bold text-gold"
        aria-hidden="true"
      >
        {member.name.charAt(0)}
      </div>
      <div className="min-w-0">
        <h3 className="font-display text-lg font-semibold">{member.name}</h3>
        <p className="text-sm text-muted-foreground">{member.role}</p>
        <p className="mt-1 text-xs uppercase tracking-widest text-gold/80">
          {member.locations.map((id) => locations[id].city).join(" · ")}
        </p>
      </div>
    </article>
  );
}
