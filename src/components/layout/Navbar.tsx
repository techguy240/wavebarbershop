import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, User, X } from "lucide-react";
import { Logo } from "@/components/site/Logo";
import { BookButton } from "@/components/site/BookButton";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";

export const navLinks = [
  { to: "/", label: "Home" },
  { to: "/servizi", label: "Servizi" },
  { to: "/sedi", label: "Sedi" },
  { to: "/staff", label: "Staff" },
  { to: "/gallery", label: "Gallery" },
  { to: "/recensioni", label: "Recensioni" },
  { to: "/contatti", label: "Contatti" },
] as const;

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const auth = useAuth();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b transition-all duration-300",
        scrolled ? "border-border bg-background/85 backdrop-blur-xl" : "border-transparent bg-transparent",
      )}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded-full focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
      >
        Vai al contenuto
      </a>
      <div className="container-site flex h-16 items-center justify-between gap-4 sm:h-20">
        <Logo />

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Navigazione principale">
          {navLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeOptions={{ exact: l.to === "/" }}
              className="rounded-full px-3.5 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
              activeProps={{ className: "text-foreground" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <Button asChild variant="ghost" size="default">
            <Link to={auth.isAuthenticated ? "/account" : "/login"}>
              <User aria-hidden="true" />
              {auth.isAuthenticated ? auth.displayName || "Account" : "Accedi"}
            </Link>
          </Button>
          <BookButton size="default" />
        </div>

        <Button
          variant="outline"
          size="icon"
          className="lg:hidden"
          onClick={() => setOpen(true)}
          aria-label="Apri menu"
          aria-expanded={open}
        >
          <Menu />
        </Button>
      </div>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="right" className="w-[88vw] max-w-sm border-border bg-background p-0 [&>button]:hidden">
          <SheetTitle className="sr-only">Menu</SheetTitle>
          <SheetDescription className="sr-only">Navigazione del sito</SheetDescription>
          <div className="flex h-16 items-center justify-between border-b border-border px-5">
            <Logo size={36} />
            <Button variant="ghost" size="icon" onClick={() => setOpen(false)} aria-label="Chiudi menu">
              <X />
            </Button>
          </div>
          <nav className="flex flex-col px-3 py-4" aria-label="Menu mobile">
            {navLinks.map((l, i) => (
              <Link
                key={l.to}
                to={l.to}
                activeOptions={{ exact: l.to === "/" }}
                className="rounded-xl px-4 py-3.5 font-display text-lg text-muted-foreground transition-colors hover:bg-accent hover:text-foreground animate-fade-up"
                style={{ animationDelay: `${i * 40}ms` }}
                activeProps={{ className: "text-gold" }}
              >
                {l.label}
              </Link>
            ))}
            <Link
              to={auth.isAuthenticated ? "/account" : "/login"}
              className="mt-2 flex items-center gap-2 rounded-xl px-4 py-3.5 font-display text-lg text-muted-foreground hover:bg-accent hover:text-foreground"
            >
              <User className="size-5" aria-hidden="true" />
              {auth.isAuthenticated ? `Ciao, ${auth.displayName || "utente"}` : "Accedi / Registrati"}
            </Link>
          </nav>
          <div className="mt-auto border-t border-border p-5">
            <BookButton size="lg" className="w-full" />
          </div>
        </SheetContent>
      </Sheet>
    </header>
  );
}
