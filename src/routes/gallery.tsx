import { createFileRoute } from "@tanstack/react-router";
import { SectionHeading } from "@/components/site/SectionHeading";
import { Gallery } from "@/components/site/Gallery";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { galleryImages, locationList } from "@/config";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/gallery")({
  head: () =>
    pageMeta({
      title: "Gallery",
      description: "Foto ufficiali delle sedi WaveBarbershop di Cecina e Volterra.",
      path: "/gallery",
    }),
  component: GalleryPage,
});

function GalleryPage() {
  return (
    <section className="container-site py-12 sm:py-20">
      <SectionHeading as="h1" eyebrow="Gallery" title="I nostri spazi" description="Uno sguardo alle due sedi." />
      <Tabs defaultValue="tutte" className="mt-10">
        <TabsList className="h-auto rounded-full bg-surface p-1">
          <TabsTrigger value="tutte" className="rounded-full px-5 py-2.5 font-display data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            Tutte
          </TabsTrigger>
          {locationList.map((l) => (
            <TabsTrigger key={l.id} value={l.id} className="rounded-full px-5 py-2.5 font-display data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              {l.city}
            </TabsTrigger>
          ))}
        </TabsList>
        <TabsContent value="tutte" className="mt-8">
          <Gallery images={galleryImages} />
        </TabsContent>
        {locationList.map((l) => (
          <TabsContent key={l.id} value={l.id} className="mt-8">
            <Gallery images={l.images} />
          </TabsContent>
        ))}
      </Tabs>
    </section>
  );
}
