import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { AuthShell } from "@/components/auth/AuthShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/reset-password")({
  head: () => {
    const m = pageMeta({ title: "Reimposta password", description: "Imposta una nuova password.", path: "/reset-password" });
    return { ...m, meta: [...m.meta, { name: "robots", content: "noindex" }] };
  },
  component: ResetPasswordPage,
});

function ResetPasswordPage() {
  const navigate = useNavigate();
  const [ready, setReady] = useState(false);
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    const isRecovery = window.location.hash.includes("type=recovery");
    const { data } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY") setReady(true);
    });
    supabase.auth.getSession().then(({ data: s }) => {
      if (s.session && isRecovery) setReady(true);
    });
    return () => data.subscription.unsubscribe();
  }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 8) return toast.error("Minimo 8 caratteri.");
    setBusy(true);
    const { error } = await supabase.auth.updateUser({ password });
    setBusy(false);
    if (error) return toast.error("Impossibile aggiornare la password. Richiedi un nuovo link.");
    toast.success("Password aggiornata.");
    navigate({ to: "/account" });
  };

  return (
    <AuthShell eyebrow="Sicurezza" title="Nuova password" description={ready ? "Scegli una nuova password per il tuo account." : "Apri questa pagina dal link ricevuto via email."}>
      <form onSubmit={submit} className="space-y-4">
        <Label htmlFor="new-password">Nuova password</Label>
        <Input id="new-password" type="password" autoComplete="new-password" value={password} onChange={(e) => setPassword(e.target.value)} disabled={!ready} />
        <Button type="submit" size="lg" className="w-full" disabled={!ready || busy}>
          Salva password
        </Button>
      </form>
    </AuthShell>
  );
}
