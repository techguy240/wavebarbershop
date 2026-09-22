import type { ReactNode } from "react";
import { SectionHeading } from "./SectionHeading";
import { DemoNotice } from "./DemoNotice";
import { isConfigured, siteConfig } from "@/config";

export function LegalPage({ eyebrow, title, intro, children }: { eyebrow: string; title: string; intro: string; children: ReactNode }) {
  const owner = isConfigured(siteConfig.legal.companyName) ? siteConfig.legal.companyName : siteConfig.name;
  return (
    <section className="container-site max-w-3xl py-12 sm:py-20">
      <SectionHeading as="h1" eyebrow={eyebrow} title={title} description={intro} />
      {!isConfigured(siteConfig.legal.companyName) && (
        <DemoNotice className="mt-6">Testo segnaposto: ragione sociale, P.IVA e contatti del titolare del trattamento sono da configurare e da rivedere con un consulente legale.</DemoNotice>
      )}
      <div className="prose-legal mt-10 space-y-8 text-sm leading-relaxed text-muted-foreground [&_h2]:font-display [&_h2]:text-lg [&_h2]:font-semibold [&_h2]:text-foreground [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1">
        <p>
          Titolare: <strong className="text-foreground">{owner}</strong>
          {isConfigured(siteConfig.legal.registeredAddress) && ` — ${siteConfig.legal.registeredAddress}`}
          {isConfigured(siteConfig.legal.vatNumber) && ` — P.IVA ${siteConfig.legal.vatNumber}`}.
        </p>
        {children}
        <p className="text-xs">Ultimo aggiornamento: {new Date().getFullYear()}.</p>
      </div>
    </section>
  );
}
