import { createFileRoute } from "@tanstack/react-router";
import { SectionHeading } from "@/components/site/SectionHeading";
import { ServiceCard } from "@/components/site/ServiceCard";
import { BookButton } from "@/components/site/BookButton";
import { CTASection } from "@/components/site/CTASection";
import { services } from "@/config";
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
          description="Consulta il catalogo WaveBarbershop con prezzi e durata dei trattamenti."
        />
      </section>

      <section className="container-site py-10 sm:py-14">
        <div className="grid gap-4 sm:grid-cols-2">
          {services.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>
        <div className="mt-8">
          <BookButton size="lg" />
        </div>
      </section>

      <CTASection />
    </>
  );
}
