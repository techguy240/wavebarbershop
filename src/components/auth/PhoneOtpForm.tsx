import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Loader2, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { DemoNotice } from "@/components/site/DemoNotice";
import { siteConfig } from "@/config";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "@tanstack/react-router";

const RESEND_SECONDS = 60;
const MAX_ATTEMPTS = 5;

/**
 * Accesso con SMS OTP. Attivo solo se siteConfig.auth.phoneOtp = true
 * (richiede un provider SMS collegato al backend). L'interfaccia è completa
 * e pronta: in modalità disattivata mostra uno stato chiaro.
 */
export function PhoneOtpForm() {
  const navigate = useNavigate();
  const enabled = siteConfig.auth.phoneOtp;
  const [phone, setPhone] = useState("");
  const [step, setStep] = useState<"phone" | "code">("phone");
  const [code, setCode] = useState("");
  const [busy, setBusy] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const [attempts, setAttempts] = useState(0);

  useEffect(() => {
    if (cooldown <= 0) return;
    const id = window.setTimeout(() => setCooldown((c) => c - 1), 1000);
    return () => window.clearTimeout(id);
  }, [cooldown]);

  const normalized = phone.replace(/\s+/g, "");
  const validPhone = /^\+[0-9]{9,15}$/.test(normalized);

  const send = async () => {
    if (!validPhone) {
      toast.error("Inserisci il numero in formato internazionale (+39...).");
      return;
    }
    setBusy(true);
    const { error } = await supabase.auth.signInWithOtp({ phone: normalized });
    setBusy(false);
    if (error) {
      toast.error("Invio del codice non riuscito. Riprova più tardi.");
      return;
    }
    setStep("code");
    setCooldown(RESEND_SECONDS);
    setAttempts(0);
  };

  const verify = async () => {
    if (attempts >= MAX_ATTEMPTS) {
      toast.error("Troppi tentativi. Richiedi un nuovo codice.");
      return;
    }
    setBusy(true);
    const { error } = await supabase.auth.verifyOtp({ phone: normalized, token: code, type: "sms" });
    setBusy(false);
    if (error) {
      setAttempts((a) => a + 1);
      toast.error("Codice non valido o scaduto.");
      return;
    }
    navigate({ to: "/account" });
  };

  if (!enabled) {
    return (
      <div className="space-y-3">
        <div className="space-y-2 opacity-60" aria-disabled="true">
          <Label htmlFor="otp-phone">Numero di telefono</Label>
          <Input id="otp-phone" type="tel" placeholder="+39 ..." disabled />
          <Button size="lg" className="w-full" disabled>
            <Smartphone aria-hidden="true" />
            Invia codice SMS
          </Button>
        </div>
        <DemoNotice>Accesso via SMS da configurare: richiede un provider SMS collegato al backend. Nel frattempo usa email, Google o l'accesso ospite.</DemoNotice>
      </div>
    );
  }

  if (step === "phone") {
    return (
      <div className="space-y-3">
        <Label htmlFor="otp-phone">Numero di telefono</Label>
        <Input id="otp-phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="+39 ..." value={phone} onChange={(e) => setPhone(e.target.value)} />
        <Button size="lg" className="w-full" onClick={send} disabled={busy || !validPhone}>
          {busy ? <Loader2 className="animate-spin" aria-hidden="true" /> : <Smartphone aria-hidden="true" />}
          Invia codice SMS
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">Inserisci il codice a 6 cifre inviato a {phone}.</p>
      <InputOTP maxLength={6} value={code} onChange={setCode} aria-label="Codice di verifica">
        <InputOTPGroup className="mx-auto">
          {Array.from({ length: 6 }).map((_, i) => (
            <InputOTPSlot key={i} index={i} className="size-12 text-lg" />
          ))}
        </InputOTPGroup>
      </InputOTP>
      <Button size="lg" className="w-full" onClick={verify} disabled={busy || code.length !== 6}>
        {busy && <Loader2 className="animate-spin" aria-hidden="true" />}
        Verifica
      </Button>
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <button type="button" className="hover:text-gold" onClick={() => setStep("phone")}>
          Cambia numero
        </button>
        <button type="button" className="hover:text-gold disabled:opacity-50" onClick={send} disabled={cooldown > 0}>
          {cooldown > 0 ? `Reinvia tra ${cooldown}s` : "Reinvia codice"}
        </button>
      </div>
    </div>
  );
}
