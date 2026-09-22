import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Sparkles, Scissors, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BookButton } from "@/components/site/BookButton";
import { SectionHeading } from "@/components/site/SectionHeading";
import { LocationCard } from "@/components/site/LocationCard";
import { ServiceCard } from "@/components/site/ServiceCard";
import { ReviewSummary } from "@/components/site/ReviewSummary";
import { CTASection } from "@/components/site/CTASection";
import { images, locationList, locations, siteConfig } from "@/config";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/")({
  head: () =>
    pageMeta({
      title: "Barberia a Cecina e Volterra",
      description: siteConfig.description,
      path: "/",
    }),
  component: Index,
});

const highlights = [
  { Icon: Scissors, title: "Taglio e barba", text: "Dal classico forbice e pettine alla sfumatura moderna." },
  { Icon: Sparkles, title: "Cura e trattamenti", text: "Prodotti professionali e trattamenti per capelli e barba." },
  { Icon: MapPin, title: "Due sedi", text: "Cecina e Volterra, con orari pensati per la tua settimana." },
];

function Index() {
  const featuredServices = [...locations.cecina.services.slice(0, 2), ...locations.volterra.services.slice(0, 2)];

  return (
    <>
      {/* HERO */}
      <section className="relative -mt-16 min-h-[92dvh] overflow-hidden sm:-mt-20" aria-labelledby="hero-title">
        <img
          src={images.hero.src}
          alt={images.hero.alt}
          className="absolute inset-0 h-full w-full object-cover"
          fetchPriority="high"
        />
        <div className="hero-overlay absolute inset-0" aria-hidden="true" />
        <div className="container-site relative flex min-h-[92dvh] flex-col justify-end pb-20 pt-32 sm:pb-28">
          <p className="eyebrow mb-5 animate-fade-up">Barbershop · dal {siteConfig.since}</p>
          <h1
            id="hero-title"
            className="max-w-3xl font-display text-[2.75rem] font-semibold leading-[1.02] sm:text-6xl lg:text-7xl animate-fade-up"
            style={{ animationDelay: "80ms" }}
          >
            Il tuo stile,
            <br />
            <span className="text-gold-gradient">curato nel dettaglio.</span>
          </h1>
          <p className="mt-6 max-w-lg text-base text-muted-foreground sm:text-lg animate-fade-up" style={{ animationDelay: "160ms" }}>
            Tagli, barba e trattamenti professionali nelle nostre sedi di Cecina e Volterra.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row animate-fade-up" style={{ animationDelay: "240ms" }}>
            <BookButton size="xl" />
            <Button asChild variant="outline" size="xl">
              <Link to="/sedi">
                Scopri le sedi
                <ArrowRight aria-hidden="true" />
              </Link>
            </Button>
          </div>
          <ul className="mt-10 flex flex-wrap gap-x-8 gap-y-3 animate-fade-in" style={{ animationDelay: "400ms" }}>
            {locationList.map((l) => (
              <li key={l.id} className="flex items-center gap-3">
                <span className="font-display text-sm font-semibold uppercase tracking-widest">{l.city}</span>
                <ReviewSummary location={l} size="sm" />
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* HIGHLIGHTS */}
      <section className="container-site py-16 sm:py-24" aria-labelledby="highlights-title">
        <SectionHeading eyebrow="Perché Wave" title={<span id="highlights-title">Un'esperienza su misura</span>} />
        <ul className="mt-10 grid gap-4 sm:grid-cols-3">
          {highlights.map(({ Icon, title, text }, i) => (
            <li key={title} className="card-premium p-6 animate-fade-up" style={{ animationDelay: `${i * 80}ms` }}>
              <Icon className="size-6 text-gold" aria-hidden="true" />
              <h3 className="mt-4 font-display text-lg font-semibold">{title}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{text}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* SEDI */}
      <section className="bg-surface py-16 sm:py-24" aria-labelledby="sedi-title">
        <div className="container-site">
          <SectionHeading
            eyebrow="Le nostre sedi"
            title={<span id="sedi-title">Cecina e Volterra</span>}
            description="Due ambienti diversi, la stessa attenzione. Scegli la sede più comoda per te."
          />
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {locationList.map((l, i) => (
              <LocationCard key={l.id} location={l} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* SERVIZI */}
      <section className="container-site py-16 sm:py-24" aria-labelledby="servizi-title">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading eyebrow="Servizi" title={<span id="servizi-title">Cosa facciamo</span>} />
          <Button asChild variant="outline-gold">
            <Link to="/servizi">
              Tutti i servizi
              <ArrowRight aria-hidden="true" />
            </Link>
          </Button>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {featuredServices.map((s, i) => (
            <ServiceCard key={s.id + i} service={s} index={i} />
          ))}
        </div>
      </section>

      {/* GALLERY PREVIEW */}
      <section className="container-site pb-8" aria-labelledby="gallery-title">
        <div className="grid gap-3 md:grid-cols-3">
          {[images.cecina[1], images.volterra[0], images.cecina[2]].filter((x): x is NonNullable<typeof x> => !!x).map((img, i) => (
            <div key={img.src} className={i === 1 ? "md:-translate-y-6" : ""}>
              <img src={img.src} alt={img.alt} loading="lazy" className="aspect-[4/5] w-full rounded-3xl object-cover" />
            </div>
          ))}
        </div>
        <div className="mt-8 text-center">
          <h2 id="gallery-title" className="sr-only">
            Gallery
          </h2>
          <Button asChild variant="link">
            <Link to="/gallery">
              Guarda la gallery completa
              <ArrowRight aria-hidden="true" />
            </Link>
          </Button>
        </div>
      </section>

      <CTASection />
    </>
  );
}
