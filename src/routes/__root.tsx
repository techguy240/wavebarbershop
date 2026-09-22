import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";

function NotFoundComponent() {
  return (
    <div className="container-site flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
      <p className="eyebrow mb-4">Errore 404</p>
      <h1 className="font-display text-6xl font-semibold sm:text-7xl">
        <span className="text-gold-gradient">404</span>
      </h1>
      <h2 className="mt-4 font-display text-xl font-semibold">Pagina non trovata</h2>
      <p className="mt-2 max-w-sm text-sm text-muted-foreground">
        La pagina che cerchi non esiste o è stata spostata.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Button asChild>
          <Link to="/">Torna alla home</Link>
        </Button>
        <Button asChild variant="outline">
          <Link to="/sedi">Vedi le sedi</Link>
        </Button>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <p className="eyebrow mb-4">Ops</p>
        <h1 className="font-display text-2xl font-semibold">Questa pagina non si è caricata</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Si è verificato un problema. Puoi riprovare oppure tornare alla home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <Button
            onClick={() => {
              router.invalidate();
              reset();
            }}
          >
            Riprova
          </Button>
          <Button asChild variant="outline">
            <a href="/">Torna alla home</a>
          </Button>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover" },
      { title: `${siteConfig.name} — ${siteConfig.tagline}` },
      { name: "description", content: siteConfig.description },
      { name: "author", content: siteConfig.name },
      { name: "theme-color", content: "#1c1b19" },
      { property: "og:site_name", content: siteConfig.name },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: siteConfig.locale },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700&family=Sora:wght@400;500;600;700&display=swap",
      },
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.png", type: "image/png" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="it" className="dark">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <SiteLayout>
        {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
        <Outlet />
      </SiteLayout>
    </QueryClientProvider>
  );
}
