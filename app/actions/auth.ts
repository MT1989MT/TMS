"use server";

import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase-server";

export interface AuthState {
  error?: string;
  message?: string;
}

export async function aanmeldenMetEmail(
  _prevState: AuthState,
  formData: FormData
): Promise<AuthState> {
  const email = formData.get("email") as string;
  const wachtwoord = formData.get("wachtwoord") as string;
  const naam = formData.get("naam") as string | null;
  const modus = formData.get("modus") as "inloggen" | "registreren";

  if (!email || !wachtwoord) {
    return { error: "Vul je e-mailadres en wachtwoord in." };
  }

  const supabase = await createSupabaseServerClient();

  if (modus === "registreren") {
    if (!naam?.trim()) {
      return { error: "Vul je naam in." };
    }
    if (wachtwoord.length < 8) {
      return { error: "Je wachtwoord moet minimaal 8 tekens bevatten." };
    }

    const { error } = await supabase.auth.signUp({
      email,
      password: wachtwoord,
      options: {
        data: { display_name: naam.trim() },
      },
    });

    if (error) {
      if (error.message.includes("already registered")) {
        return { error: "Dit e-mailadres is al in gebruik. Probeer in te loggen." };
      }
      return { error: "Er ging iets mis. Probeer het opnieuw." };
    }

    return {
      message:
        "Controleer je e-mail om je account te bevestigen. Daarna kun je inloggen.",
    };
  }

  // Sign in
  const { error } = await supabase.auth.signInWithPassword({ email, password: wachtwoord });

  if (error) {
    if (error.message.includes("Invalid login")) {
      return { error: "Onjuist e-mailadres of wachtwoord." };
    }
    return { error: "Er ging iets mis. Probeer het opnieuw." };
  }

  redirect("/app");
}

export async function uitloggen(): Promise<void> {
  const supabase = await createSupabaseServerClient();
  await supabase.auth.signOut();
  redirect("/");
}
