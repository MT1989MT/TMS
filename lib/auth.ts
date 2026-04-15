import { cache } from "react";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "./supabase-server";
import { isDemoMode, DEMO_PROFILE } from "./demo";
import type { Database } from "@/types/database";

type Profile = Database["public"]["Tables"]["profiles"]["Row"];

const DEMO_USER = { id: DEMO_PROFILE.id, email: "demo@breinvrij.nl" } as const;

/**
 * Verifies the current user session.
 * Redirects to /aanmelden if not authenticated.
 * In demo mode, always returns the demo user.
 */
export const verifySession = cache(async () => {
  if (isDemoMode()) return { user: DEMO_USER };

  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    redirect("/aanmelden");
  }

  return { user };
});

/**
 * Returns the current user, or null if not authenticated.
 * Does NOT redirect — use in components where auth is optional.
 */
export const getOptionalUser = cache(async () => {
  if (isDemoMode()) return DEMO_USER;

  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user ?? null;
});

/**
 * Returns the current user's profile from the profiles table.
 * In demo mode, returns the hardcoded demo profile.
 */
export const getUserProfile = cache(async (): Promise<Profile | null> => {
  if (isDemoMode()) return DEMO_PROFILE;

  const { user } = await verifySession();
  const supabase = await createSupabaseServerClient();

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  return profile;
});
