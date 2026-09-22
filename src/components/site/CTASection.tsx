import { Phone } from "lucide-react";
import { BookButton } from "./BookButton";
import { Button } from "@/components/ui/button";
import { images, locationList } from "@/config";
import { telHref } from "@/lib/links";

export function CTASection() {
  return (
    <section className="container-site py-16 sm:py-24" aria-labelledby="cta-title">
      <div className="relative overflow-hidden rounded-3xl border border-gold/30">
        <img src={images.barber.src} alt="" className="absolute inset-0 h-full w-full object-cover" loading="lazy" aria-hidden="true" />
        <div className="hero-overlay absolute inset-0" aria-hidden="true" />
        <div className="relative px-6 py-16 text-center sm:px-12 sm:py-24">
          <p className="eyebrow mb-4">Il tuo prossimo appuntamento</p>
          <h2 id="cta-title" className="mx-auto max-w-2xl font-display text-3xl font-semibold sm:text-5xl">
            Pronto per un nuovo look?
          </h2>
          <p className="mx-auto mt-4 max-w-md text-muted-foreground">
            Prenota online tramite l'app ufficiale oppure chiama direttamente la sede più vicina a te.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <BookButton size="xl" className="w-full sm:w-auto" />
            {locationList.map((l) => (
              <Button key={l.id} asChild variant="outline" size="xl" className="w-full sm:w-auto">
                <a href={telHref(l.phoneE164)}>
                  <Phone aria-hidden="true" />
                  {l.city}
                </a>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
