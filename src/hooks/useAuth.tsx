import { useCallback, useEffect, useState } from "react";
import type { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { clearGuestSession, getGuestSession, type GuestSession } from "@/lib/guest";

export interface Profile {
  id: string;
  first_name: string | null;
  last_name: string | null;
  phone: string | null;
  email: string | null;
}

export interface AuthState {
  loading: boolean;
  user: User | null;
  session: Session | null;
  profile: Profile | null;
  guest: GuestSession | null;
  isAuthenticated: boolean;
  displayName: string;
  refreshProfile: () => Promise<void>;
  signOut: () => Promise<void>;
}

/**
 * Stato di autenticazione lato client (account Cloud + sessione ospite).
 * Le letture dati passano sempre dal backend con le regole di accesso per utente.
 */
export function useAuth(): AuthState {
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [guest, setGuest] = useState<GuestSession | null>(null);

  const loadProfile = useCallback(async (userId: string | undefined) => {
    if (!userId) {
      setProfile(null);
      return;
    }
    const { data } = await supabase
      .from("profiles")
      .select("id, first_name, last_name, phone, email")
      .eq("id", userId)
      .maybeSingle();
    setProfile((data as Profile | null) ?? null);
  }, []);

  useEffect(() => {
    let active = true;
    const { data: sub } = supabase.auth.onAuthStateChange((_event, s) => {
      if (!active) return;
      setSession(s);
      setLoading(false);
      // Evita chiamate sincrone dentro il listener.
      setTimeout(() => void loadProfile(s?.user.id), 0);
    });
    supabase.auth.getSession().then(({ data }) => {
      if (!active) return;
      setSession(data.session);
      setLoading(false);
      void loadProfile(data.session?.user.id);
    });

    const syncGuest = () => setGuest(getGuestSession());
    syncGuest();
    window.addEventListener("wave:guest", syncGuest);
    return () => {
      active = false;
      sub.subscription.unsubscribe();
      window.removeEventListener("wave:guest", syncGuest);
    };
  }, [loadProfile]);

  const user = session?.user ?? null;
  const displayName =
    profile?.first_name ||
    (user?.user_metadata?.full_name as string | undefined)?.split(" ")[0] ||
    user?.email?.split("@")[0] ||
    guest?.firstName ||
    "";

  return {
    loading,
    user,
    session,
    profile,
    guest,
    isAuthenticated: !!user || !!guest,
    displayName,
    refreshProfile: () => loadProfile(user?.id),
    signOut: async () => {
      clearGuestSession();
      await supabase.auth.signOut();
    },
  };
}
