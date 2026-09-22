import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { Loader2, MailCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";

const loginSchema = z.object({
  email: z.string().trim().email("Email non valida").max(255),
  password: z.string().min(8, "Minimo 8 caratteri").max(128),
  remember: z.boolean(),
});

const registerSchema = loginSchema.omit({ remember: true }).extend({
  firstName: z.string().trim().min(2, "Inserisci il nome").max(60),
  lastName: z.string().trim().min(2, "Inserisci il cognome").max(60),
  phone: z.string().trim().regex(/^\+?[0-9 ]{8,16}$/, "Numero non valido"),
  privacy: z.literal(true, { message: "Devi accettare l'informativa privacy" }),
});

const friendly = (msg: string) => {
  const m = msg.toLowerCase();
  if (m.includes("invalid login")) return "Email o password non corretti.";
  if (m.includes("already registered")) return "Esiste già un account con questa email.";
  if (m.includes("email not confirmed")) return "Conferma prima la tua email dal link ricevuto.";
  if (m.includes("rate limit") || m.includes("too many")) return "Troppi tentativi. Riprova tra qualche minuto.";
  return "Operazione non riuscita. Riprova.";
};

export function LoginForm() {
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof loginSchema>>({ resolver: zodResolver(loginSchema), defaultValues: { email: "", password: "", remember: true } });
  const [resetSent, setResetSent] = useState(false);

  const onSubmit = form.handleSubmit(async ({ email, password, remember }) => {
    setRemember(remember);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      toast.error(friendly(error.message));
      return;
    }
    toast.success("Bentornato!");
    navigate({ to: "/account" });
  });

  const reset = async () => {
    const email = form.getValues("email");
    if (!z.string().email().safeParse(email).success) return form.setError("email", { message: "Inserisci la tua email per il recupero" });
    const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo: `${window.location.origin}/reset-password` });
    if (error) return toast.error(friendly(error.message));
    setResetSent(true);
  };

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="space-y-4" noValidate>
        <FormField control={form.control} name="email" render={({ field }) => (
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl><Input type="email" autoComplete="email" inputMode="email" placeholder="nome@esempio.it" {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={form.control} name="password" render={({ field }) => (
          <FormItem>
            <FormLabel>Password</FormLabel>
            <FormControl><Input type="password" autoComplete="current-password" {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <div className="flex justify-end">
          <button type="button" onClick={reset} className="text-xs text-muted-foreground underline-offset-4 hover:text-gold hover:underline">
            Password dimenticata?
          </button>
        </div>
        {resetSent && (
          <p className="flex items-center gap-2 rounded-xl bg-success/10 px-3 py-2 text-sm text-success" role="status">
            <MailCheck className="size-4" aria-hidden="true" /> Se l'email esiste, riceverai un link per reimpostare la password.
          </p>
        )}
        <Button type="submit" size="lg" className="w-full" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting && <Loader2 className="animate-spin" aria-hidden="true" />}
          Accedi
        </Button>
      </form>
    </Form>
  );
}

export function RegisterForm() {
  const [done, setDone] = useState(false);
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: { firstName: "", lastName: "", phone: "", email: "", password: "", privacy: undefined as unknown as true },
  });

  const onSubmit = form.handleSubmit(async (v) => {
    const { error } = await supabase.auth.signUp({
      email: v.email,
      password: v.password,
      options: {
        emailRedirectTo: `${window.location.origin}/account`,
        data: { first_name: v.firstName, last_name: v.lastName, phone: v.phone },
      },
    });
    if (error) {
      toast.error(friendly(error.message));
      return;
    }
    setDone(true);
  });

  if (done) {
    return (
      <div className="rounded-2xl border border-success/30 bg-success/10 p-5 text-center" role="status">
        <MailCheck className="mx-auto size-8 text-success" aria-hidden="true" />
        <h3 className="mt-3 font-display text-lg font-semibold">Controlla la tua email</h3>
        <p className="mt-1 text-sm text-muted-foreground">Ti abbiamo inviato un link per confermare l'account.</p>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="space-y-4" noValidate>
        <div className="grid grid-cols-2 gap-3">
          <FormField control={form.control} name="firstName" render={({ field }) => (
            <FormItem>
              <FormLabel>Nome</FormLabel>
              <FormControl><Input autoComplete="given-name" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <FormField control={form.control} name="lastName" render={({ field }) => (
            <FormItem>
              <FormLabel>Cognome</FormLabel>
              <FormControl><Input autoComplete="family-name" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />
        </div>
        <FormField control={form.control} name="phone" render={({ field }) => (
          <FormItem>
            <FormLabel>Telefono</FormLabel>
            <FormControl><Input type="tel" autoComplete="tel" inputMode="tel" placeholder="+39 ..." {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={form.control} name="email" render={({ field }) => (
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl><Input type="email" autoComplete="email" inputMode="email" {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={form.control} name="password" render={({ field }) => (
          <FormItem>
            <FormLabel>Password</FormLabel>
            <FormControl><Input type="password" autoComplete="new-password" {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={form.control} name="privacy" render={({ field }) => (
          <FormItem>
            <label className="flex items-start gap-3 text-xs text-muted-foreground">
              <input type="checkbox" className="mt-0.5 size-4 accent-[var(--gold)]" checked={!!field.value} onChange={(e) => field.onChange(e.target.checked ? true : undefined)} />
              <span>
                Ho letto l'<a href="/privacy" className="text-gold underline-offset-4 hover:underline">informativa privacy</a> e acconsento al trattamento dei dati per la gestione dell'account.
              </span>
            </label>
            <FormMessage />
          </FormItem>
        )} />
        <Button type="submit" size="lg" className="w-full" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting && <Loader2 className="animate-spin" aria-hidden="true" />}
          Crea account
        </Button>
      </form>
    </Form>
  );
}
