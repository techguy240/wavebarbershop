import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { CalendarCheck, MapPin, Phone, User } from "lucide-react";
import { LocationSelector } from "@/components/site/LocationSelector";
import { Sheet, SheetContent, SheetDescription, SheetTitle } from "@/components/ui/sheet";
import { locationList } from "@/config";
import { telHref } from "@/lib/links";
import { useAuth } from "@/hooks/useAuth";
import { OpenStatusBadge } from "@/components/site/OpenStatusBadge";

/** Barra azioni rapide fissa in basso (solo mobile). */
export function MobileBottomBar() {
  const [book, setBook] = useState(false);
  const [call, setCall] = useState(false);
  const auth = useAuth();

  const item =
    "flex flex-1 flex-col items-center justify-center gap-1 py-2 text-[11px] font-medium text-muted-foreground transition-colors hover:text-foreground min-h-11";

  return (
    <>
      <nav
        aria-label="Azioni rapide"
        className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/90 backdrop-blur-xl md:hidden"
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        <div className="flex items-stretch px-1">
          <button type="button" className={item} onClick={() => setCall(true)}>
            <Phone className="size-5" aria-hidden="true" />
            Chiama
          </button>
          <Link to="/sedi" className={item} activeProps={{ className: "text-gold" }}>
            <MapPin className="size-5" aria-hidden="true" />
            Sedi
          </Link>
          <button
            type="button"
            onClick={() => setBook(true)}
            className="-mt-5 flex flex-1 flex-col items-center gap-1 text-[11px] font-semibold"
          >
            <span className="flex size-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-gold">
              <CalendarCheck className="size-6" aria-hidden="true" />
            </span>
            <span className="text-gold">Prenota</span>
          </button>
          <Link to={auth.isAuthenticated ? "/account" : "/login"} className={item} activeProps={{ className: "text-gold" }}>
            <User className="size-5" aria-hidden="true" />
            {auth.isAuthenticated ? "Account" : "Accedi"}
          </Link>
        </div>
      </nav>

      <LocationSelector open={book} onOpenChange={setBook} />

      <Sheet open={call} onOpenChange={setCall}>
        <SheetContent side="bottom" className="rounded-t-3xl border-border bg-surface pb-8">
          <SheetTitle className="font-display text-xl">Chiama una sede</SheetTitle>
          <SheetDescription>Scegli la sede da contattare.</SheetDescription>
          <ul className="mt-4 space-y-3">
            {locationList.map((l) => (
              <li key={l.id}>
                <a
                  href={telHref(l.phoneE164)}
                  className="flex items-center justify-between rounded-2xl border border-border bg-surface-2 p-4 hover:border-gold"
                >
                  <span>
                    <span className="block font-display font-semibold">{l.city}</span>
                    <OpenStatusBadge location={l} compact />
                  </span>
                  <span className="flex items-center gap-2 text-gold">
                    <Phone className="size-4" aria-hidden="true" />
                    {l.phone}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </SheetContent>
      </Sheet>
    </>
  );
}
