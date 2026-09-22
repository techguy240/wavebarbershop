import type { ReactNode } from "react";
import { images } from "@/config";

const sideImage = images.volterra[1] ?? images.hero;

export function AuthShell({ eyebrow, title, description, children }: { eyebrow: string; title: string; description: string; children: ReactNode }) {
  return (
    <section className="container-site grid gap-8 py-10 lg:grid-cols-2 lg:gap-14 sm:py-16">
      <div className="relative hidden overflow-hidden rounded-3xl lg:block">
        <img src={sideImage.src} alt={sideImage.alt} className="h-full min-h-[640px] w-full object-cover" />
        <div className="hero-overlay absolute inset-0" aria-hidden="true" />
        <div className="absolute inset-x-8 bottom-8">
          <p className="eyebrow mb-2">Area clienti</p>
          <p className="font-display text-3xl font-semibold">Il tuo posto in poltrona ti aspetta.</p>
        </div>
      </div>
      <div className="mx-auto w-full max-w-md">
        <p className="eyebrow mb-3">{eyebrow}</p>
        <h1 className="font-display text-3xl font-semibold sm:text-4xl">{title}</h1>
        <p className="mt-2 text-sm text-muted-foreground">{description}</p>
        <div className="mt-8">{children}</div>
      </div>
    </section>
  );
}

export function Divider({ label = "oppure" }: { label?: string }) {
  return (
    <div className="my-6 flex items-center gap-3 text-xs uppercase tracking-widest text-muted-foreground" role="separator">
      <span className="h-px flex-1 bg-border" />
      {label}
      <span className="h-px flex-1 bg-border" />
    </div>
  );
}
