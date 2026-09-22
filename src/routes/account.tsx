import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { CalendarDays, LogOut, UserRound, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SectionHeading } from "@/components/site/SectionHeading";
import { BookButton } from "@/components/site/BookButton";
import { DemoNotice } from "@/components/site/DemoNotice";
import { LoadingState, EmptyState } from "@/components/site/States";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { getBookingUrl, isConfigured } from "@/config";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/account")({
  ssr: false,
  head: () => {
    const m = pageMeta({ title: "Il mio account", description: "Area clienti WaveBarbershop.", path: "/account" });
    return { ...m, meta: [...m.meta, { name: "robots", content: "noindex" }] };
  },
  component: AccountPage,
});

const profileSchema = z.object({
  first_name: z.string().trim().min(2, "Inserisci il nome").max(60),
  last_name: z.string().trim().min(2, "Inserisci il cognome").max(60),
  phone: z.string().trim().regex(/^\+?[0-9 ]{8,16}$/, "Numero non valido").or(z.literal("")),
});

function AccountPage() {
  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth.loading && !auth.isAuthenticated) navigate({ to: "/login", replace: true });
  }, [auth.loading, auth.isAuthenticated, navigate]);

  if (auth.loading || !auth.isAuthenticated) return <LoadingState label="Caricamento account…" className="min-h-[50vh]" />;

  const bookingUrl = getBookingUrl();

  return (
    <section className="container-site py-12 sm:py-20">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <SectionHeading eyebrow={auth.user ? "Area clienti" : "Sessione ospite"} title={`Ciao, ${auth.displayName || "benvenuto"}`} />
        <Button
          variant="outline"
          onClick={async () => {
            await auth.signOut();
            toast.success("Sei uscito.");
            navigate({ to: "/", replace: true });
          }}
        >
          <LogOut aria-hidden="true" />
          Esci
        </Button>
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        <article className="card-premium p-6">
          <h2 className="flex items-center gap-2 font-display text-xl font-semibold">
            <CalendarDays className="size-5 text-gold" aria-hidden="true" />
            Le mie prenotazioni
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">Le prenotazioni sono gestite dal sistema ufficiale WaveBarbershop.</p>
          <div className="mt-5">
            {isConfigured(bookingUrl) ? (
              <Button asChild>
                <a href={bookingUrl} target="_blank" rel="noopener noreferrer">
                  Gestisci prenotazioni
                  <ExternalLink aria-hidden="true" />
                </a>
              </Button>
            ) : (
              <EmptyState
                title="Nessuna prenotazione da mostrare"
                description="Il collegamento al sistema di prenotazione non è ancora attivo."
                action={<BookButton size="sm" />}
                className="border-dashed shadow-none"
              />
            )}
            {!isConfigured(bookingUrl) && <DemoNotice className="mt-3">Sistema di prenotazione da collegare in configurazione.</DemoNotice>}
          </div>
        </article>

        <article className="card-premium p-6">
          <h2 className="flex items-center gap-2 font-display text-xl font-semibold">
            <UserRound className="size-5 text-gold" aria-hidden="true" />
            I miei dati
          </h2>
          {auth.user ? <ProfileForm key={auth.profile?.id ?? "p"} auth={auth} /> : <GuestSummary auth={auth} />}
        </article>
      </div>
    </section>
  );
}

function GuestSummary({ auth }: { auth: ReturnType<typeof useAuth> }) {
  const g = auth.guest!;
  return (
    <div className="mt-4 space-y-3 text-sm">
      <dl className="grid grid-cols-[100px_1fr] gap-y-2">
        <dt className="text-muted-foreground">Nome</dt><dd>{g.firstName} {g.lastName}</dd>
        <dt className="text-muted-foreground">Telefono</dt><dd>{g.phone}</dd>
      </dl>
      <p className="text-xs text-muted-foreground">Sessione temporanea: i dati non sono salvati su un account.</p>
      <Button asChild variant="outline-gold" size="sm">
        <Link to="/register">Crea un account</Link>
      </Button>
    </div>
  );
}

function ProfileForm({ auth }: { auth: ReturnType<typeof useAuth> }) {
  const [saving, setSaving] = useState(false);
  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      first_name: auth.profile?.first_name ?? "",
      last_name: auth.profile?.last_name ?? "",
      phone: auth.profile?.phone ?? "",
    },
  });

  const onSubmit = form.handleSubmit(async (v) => {
    setSaving(true);
    const { error } = await supabase.from("profiles").upsert({ id: auth.user!.id, email: auth.user!.email ?? null, ...v });
    setSaving(false);
    if (error) return toast.error("Salvataggio non riuscito.");
    await auth.refreshProfile();
    toast.success("Dati aggiornati.");
  });

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="mt-4 space-y-4" noValidate>
        <p className="text-sm text-muted-foreground">Email: {auth.user?.email}</p>
        <div className="grid grid-cols-2 gap-3">
          <FormField control={form.control} name="first_name" render={({ field }) => (
            <FormItem><FormLabel>Nome</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
          )} />
          <FormField control={form.control} name="last_name" render={({ field }) => (
            <FormItem><FormLabel>Cognome</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
          )} />
        </div>
        <FormField control={form.control} name="phone" render={({ field }) => (
          <FormItem><FormLabel>Telefono</FormLabel><FormControl><Input type="tel" inputMode="tel" {...field} /></FormControl><FormMessage /></FormItem>
        )} />
        <Button type="submit" disabled={saving}>Salva</Button>
      </form>
    </Form>
  );
}
