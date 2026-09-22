import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { AuthShell, Divider } from "@/components/auth/AuthShell";
import { GoogleButton } from "@/components/auth/GoogleButton";
import { RegisterForm } from "@/components/auth/EmailPasswordForm";
import { useAuth } from "@/hooks/useAuth";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/register")({
  head: () => {
    const m = pageMeta({ title: "Registrati", description: "Crea il tuo account WaveBarbershop.", path: "/register" });
    return { ...m, meta: [...m.meta, { name: "robots", content: "noindex" }] };
  },
  component: RegisterPage,
});

function RegisterPage() {
  const auth = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (!auth.loading && auth.user) navigate({ to: "/account", replace: true });
  }, [auth.loading, auth.user, navigate]);

  return (
    <AuthShell eyebrow="Registrati" title="Crea il tuo account" description="Salva i tuoi dati per prenotare più velocemente.">
      <GoogleButton label="Registrati con Google" />
      <Divider />
      <RegisterForm />
      <p className="mt-8 text-center text-sm text-muted-foreground">
        Hai già un account?{" "}
        <Link to="/login" className="text-gold underline-offset-4 hover:underline">
          Accedi
        </Link>
      </p>
    </AuthShell>
  );
}
