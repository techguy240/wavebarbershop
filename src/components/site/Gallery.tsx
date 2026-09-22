import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import type { SiteImage } from "@/config";
import { cn } from "@/lib/utils";

export function Gallery({ images, className }: { images: SiteImage[]; className?: string }) {
  const [index, setIndex] = useState<number | null>(null);
  const current = index !== null ? images[index] : null;
  const step = (d: number) => setIndex((i) => (i === null ? null : (i + d + images.length) % images.length));

  return (
    <>
      <ul className={cn("grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3", className)}>
        {images.map((img, i) => (
          <li key={img.src + i} className={cn(i === 0 && "col-span-2 row-span-2")}>
            <button
              type="button"
              onClick={() => setIndex(i)}
              className="group relative block h-full w-full overflow-hidden rounded-2xl border border-border"
              aria-label={`Apri immagine: ${img.alt}`}
            >
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                className={cn("img-zoom h-full w-full object-cover", i === 0 ? "aspect-square md:aspect-[4/3]" : "aspect-square")}
              />
              <span className="absolute inset-0 bg-background/0 transition-colors group-hover:bg-background/20" aria-hidden="true" />
            </button>
          </li>
        ))}
      </ul>

      <Dialog open={index !== null} onOpenChange={(o) => !o && setIndex(null)}>
        <DialogContent className="max-w-4xl border-border bg-background/95 p-2 sm:p-3">
          <DialogTitle className="sr-only">{current?.alt ?? "Immagine"}</DialogTitle>
          {current && (
            <figure className="relative">
              <img src={current.src} alt={current.alt} className="max-h-[80vh] w-full rounded-xl object-contain" />
              <figcaption className="mt-2 px-1 text-center text-xs text-muted-foreground">{current.alt}</figcaption>
              {images.length > 1 && (
                <>
                  <Button variant="secondary" size="icon" className="absolute left-2 top-1/2 -translate-y-1/2" onClick={() => step(-1)} aria-label="Immagine precedente">
                    <ChevronLeft />
                  </Button>
                  <Button variant="secondary" size="icon" className="absolute right-2 top-1/2 -translate-y-1/2" onClick={() => step(1)} aria-label="Immagine successiva">
                    <ChevronRight />
                  </Button>
                </>
              )}
            </figure>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
