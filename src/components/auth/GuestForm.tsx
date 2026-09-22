import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { guestSchema, setGuestSession } from "@/lib/guest";
import { setRemember } from "@/lib/remember";
import { useState } from "react";

/** Accesso ospite: nessun account, dati salvati solo nel browser per la sessione corrente. */
export function GuestForm() {
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof guestSchema>>({
    resolver: zodResolver(guestSchema),
    defaultValues: { firstName: "", lastName: "", phone: "" },
  });

  const onSubmit = form.handleSubmit((v) => {
    setRemember(remember);
    setGuestSession(v);
    toast.success(`Benvenuto, ${v.firstName}!`);
    navigate({ to: "/account" });
  });

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
            <FormControl><Input type="tel" inputMode="tel" autoComplete="tel" placeholder="+39 ..." {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <p className="text-xs text-muted-foreground">I dati restano solo su questo dispositivo e vengono cancellati alla chiusura del browser.</p>
        <Button type="submit" variant="outline-gold" size="lg" className="w-full">
          Continua come ospite
        </Button>
      </form>
    </Form>
  );
}
