"use server";

import { revalidatePath } from "next/cache";
import { createSupabaseServerClient } from "@/lib/supabase-server";
import { getUserProfile } from "@/lib/auth";

export interface ProfielState {
  succes?: boolean;
  error?: string;
}

export async function slaReminderTijdOp(
  _prevState: ProfielState,
  formData: FormData
): Promise<ProfielState> {
  const reminderTime = formData.get("reminder_time") as string;

  if (!reminderTime) {
    return { error: "Voer een geldige tijd in." };
  }

  // Validate HH:mm format
  if (!/^\d{2}:\d{2}$/.test(reminderTime)) {
    return { error: "Ongeldige tijdnotatie." };
  }

  const profile = await getUserProfile();
  if (!profile) return { error: "Niet ingelogd." };

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase
    .from("profiles")
    .update({ reminder_time: reminderTime })
    .eq("id", profile.id);

  if (error) {
    return { error: "Kon tijd niet opslaan. Probeer het opnieuw." };
  }

  revalidatePath("/app/profiel");
  return { succes: true };
}
