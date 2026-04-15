import { cache } from "react";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "./supabase-server";
import type { Database } from "@/types/database";

type Profile = Database["public"]["Tables"]["profiles"]["Row"];

/**
 * Verifies the current user session.
 * Redirects to /aanmelden if not authenticated.
 * Cached per request to avoid multiple DB calls.
 */
export const verifySession = cache(async () => {
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
 * Returns the current user's profile, or null if not authenticated.
 * Does NOT redirect — use in components where auth is optional.
 */
export const getOptionalUser = cache(async () => {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user ?? null;
});

/**
 * Returns the current user's profile from the profiles table.
 * Requires an authenticated session (calls verifySession internally).
 */
export const getUserProfile = cache(async (): Promise<Profile | null> => {
  const { user } = await verifySession();
  const supabase = await createSupabaseServerClient();

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  return profile;
});
