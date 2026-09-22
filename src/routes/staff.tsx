import { createFileRoute } from "@tanstack/react-router";
import { SectionHeading } from "@/components/site/SectionHeading";
import { StaffCard } from "@/components/site/StaffCard";
import { CTASection } from "@/components/site/CTASection";
import { images, locationList, getStaffForLocation } from "@/config";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/staff")({
  head: () =>
    pageMeta({
      title: "Staff",
      description: "I barbieri WaveBarbershop: Nicco, Luca e Martino a Cecina; Nicco e Luigi a Volterra.",
      path: "/staff",
    }),
  component: StaffPage,
});

function StaffPage() {
  return (
    <>
      <section className="container-site pt-12 sm:pt-20">
        <SectionHeading as="h1" eyebrow="Staff" title="Il team Wave" description="Professionisti che lavorano ogni giorno con passione e precisione." />
      </section>
      <section className="container-site grid gap-6 py-10 lg:grid-cols-[1fr_1fr] sm:py-14">
        <img src={images.barber.src} alt={images.barber.alt} loading="lazy" className="aspect-[4/5] w-full rounded-3xl object-cover lg:sticky lg:top-24" />
        <div className="space-y-10">
          {locationList.map((l) => (
            <div key={l.id}>
              <h2 className="font-display text-2xl font-semibold">{l.city}</h2>
              <div className="gold-rule mt-3" aria-hidden="true" />
              <div className="mt-6 grid gap-4">
                {getStaffForLocation(l.id).map((m, i) => (
                  <StaffCard key={m.id} member={m} index={i} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
      <CTASection />
    </>
  );
}
