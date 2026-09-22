import { createFileRoute } from "@tanstack/react-router";
import { SectionHeading } from "@/components/site/SectionHeading";
import { ServiceCard } from "@/components/site/ServiceCard";
import { BookButton } from "@/components/site/BookButton";
import { DemoNotice } from "@/components/site/DemoNotice";
import { CTASection } from "@/components/site/CTASection";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { locationList } from "@/config";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/servizi")({
  head: () =>
    pageMeta({
      title: "Servizi",
      description: "Taglio capelli, cura della barba, rasatura, sfumature e trattamenti nelle sedi WaveBarbershop di Cecina e Volterra.",
      path: "/servizi",
    }),
  component: ServiziPage,
});

function ServiziPage() {
  return (
    <>
      <section className="container-site pt-12 sm:pt-20">
        <SectionHeading
          as="h1"
          eyebrow="Servizi"
          title="Taglio, barba e cura"
          description="Ogni sede propone i propri servizi. Seleziona la sede per vedere l'offerta completa."
        />
        <DemoNotice className="mt-6 max-w-2xl">I prezzi non sono ancora pubblicati: verranno mostrati appena configurati.</DemoNotice>
      </section>

      <section className="container-site py-10 sm:py-14">
        <Tabs defaultValue="cecina">
          <TabsList className="h-auto rounded-full bg-surface p-1">
            {locationList.map((l) => (
              <TabsTrigger key={l.id} value={l.id} className="rounded-full px-5 py-2.5 font-display data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                {l.city}
              </TabsTrigger>
            ))}
          </TabsList>
          {locationList.map((l) => (
            <TabsContent key={l.id} value={l.id} className="mt-8">
              <div className="grid gap-4 sm:grid-cols-2">
                {l.services.map((s, i) => (
                  <ServiceCard key={s.id} service={s} index={i} />
                ))}
              </div>
              <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
                <BookButton locationId={l.id} size="lg" label={`Prenota a ${l.city}`} />
                <p className="text-sm text-muted-foreground">Staff: {l.staffIds.map((s) => s.charAt(0).toUpperCase() + s.slice(1)).join(", ")}</p>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </section>

      <CTASection />
    </>
  );
}
