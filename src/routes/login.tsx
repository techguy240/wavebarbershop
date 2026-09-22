import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { AuthShell, Divider } from "@/components/auth/AuthShell";
import { GoogleButton } from "@/components/auth/GoogleButton";
import { LoginForm } from "@/components/auth/EmailPasswordForm";
import { GuestForm } from "@/components/auth/GuestForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/hooks/useAuth";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/login")({
  head: () => ({
    ...pageMeta({ title: "Accedi", description: "Accedi alla tua area clienti WaveBarbershop con email, Google o come ospite.", path: "/login" }),
    meta: [...pageMeta({ title: "Accedi", description: "Area clienti WaveBarbershop.", path: "/login" }).meta, { name: "robots", content: "noindex" }],
  }),
  component: LoginPage,
});

function LoginPage() {
  const auth = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (!auth.loading && auth.user) navigate({ to: "/account", replace: true });
  }, [auth.loading, auth.user, navigate]);

  const tab = "rounded-full px-4 py-2 text-xs font-display data-[state=active]:bg-primary data-[state=active]:text-primary-foreground";

  return (
    <AuthShell eyebrow="Accedi" title="Bentornato" description="Scegli come accedere alla tua area clienti.">
      <GoogleButton />
      <Divider />
      <Tabs defaultValue="email">
        <TabsList className="grid h-auto w-full grid-cols-2 rounded-full bg-surface p-1">
          <TabsTrigger value="email" className={tab}>Email</TabsTrigger>
          <TabsTrigger value="guest" className={tab}>Ospite</TabsTrigger>
        </TabsList>
        <TabsContent value="email" className="mt-6"><LoginForm /></TabsContent>
        <TabsContent value="guest" className="mt-6"><GuestForm /></TabsContent>
      </Tabs>
      <p className="mt-8 text-center text-sm text-muted-foreground">
        Non hai un account?{" "}
        <Link to="/register" className="text-gold underline-offset-4 hover:underline">
          Registrati
        </Link>
      </p>
    </AuthShell>
  );
}
