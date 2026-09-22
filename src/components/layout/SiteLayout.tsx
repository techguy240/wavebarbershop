import type { ReactNode } from "react";
import { Toaster } from "@/components/ui/sonner";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { MobileBottomBar } from "./MobileBottomBar";
import { CookieBanner } from "./CookieBanner";
import { Analytics } from "./Analytics";

export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-dvh flex-col">
      <Navbar />
      <main id="main" className="flex-1">
        {children}
      </main>
      <Footer />
      <MobileBottomBar />
      <CookieBanner />
      <Analytics />
      <Toaster position="top-center" richColors />
    </div>
  );
}
