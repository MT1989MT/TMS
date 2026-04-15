"use server";

import { revalidatePath } from "next/cache";
import { createSupabaseServerClient } from "@/lib/supabase-server";
import { verifySession } from "@/lib/auth";

export interface EmotieState {
  error?: string;
  succes?: boolean;
}

export async function slaEmotieCheckInOp(
  _prev: EmotieState,
  formData: FormData
): Promise<EmotieState> {
  const { user } = await verifySession();

  const emoties = formData.getAll("emoties") as string[];
  const pijnReactie = formData.get("pijn_reactie") as string | null;
  const gejournald = formData.get("gejournald") === "true";
  const notities = (formData.get("notities") as string | null)?.trim() || null;

  if (emoties.length === 0) {
    return { error: "Selecteer minimaal één emotie." };
  }

  const supabase = await createSupabaseServerClient();

  // Upsert voor vandaag (één check-in per dag)
  const vandaag = new Date().toISOString().split("T")[0];
  const { error } = await supabase.from("emotion_checkins").upsert(
    {
      user_id: user.id,
      date: vandaag,
      emotions: emoties,
      pain_reaction: pijnReactie || null,
      journaled: gejournald,
      notes: notities,
    },
    { onConflict: "user_id,date" }
  );

  if (error) return { error: "Kon check-in niet opslaan. Probeer het opnieuw." };

  revalidatePath("/app/emoties");
  revalidatePath("/app");
  return { succes: true };
}

export async function slaVoortgangOp(
  contentId: number,
  duurMinuten: number
): Promise<void> {
  const { user } = await verifySession();
  const supabase = await createSupabaseServerClient();

  // Upsert voortgang
  await supabase.from("user_progress").upsert(
    { user_id: user.id, content_id: contentId },
    { onConflict: "user_id,content_id" }
  );

  // Update statistieken
  await supabase.rpc("increment_user_stats", {
    p_user_id: user.id,
    p_minutes: duurMinuten,
  });

  revalidatePath("/app/voortgang");
}
