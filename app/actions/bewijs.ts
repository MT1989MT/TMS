"use server";

import { revalidatePath } from "next/cache";
import { createSupabaseServerClient } from "@/lib/supabase-server";
import { verifySession } from "@/lib/auth";

export interface BewijsState {
  error?: string;
  succes?: boolean;
}

export async function voegBewijsToe(
  _prev: BewijsState,
  formData: FormData
): Promise<BewijsState> {
  const { user } = await verifySession();
  const tekst = (formData.get("tekst") as string)?.trim();
  const categorie = formData.get("categorie") as string | null;

  if (!tekst || tekst.length < 5) {
    return { error: "Beschrijf je bewijs in minimaal 5 tekens." };
  }
  if (tekst.length > 500) {
    return { error: "Maximaal 500 tekens per bewijs-item." };
  }

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.from("evidence_list").insert({
    user_id: user.id,
    text: tekst,
    category: categorie || null,
  });

  if (error) return { error: "Kon bewijs niet opslaan. Probeer het opnieuw." };

  revalidatePath("/app/bewijs");
  return { succes: true };
}

export async function verwijderBewijs(id: number): Promise<void> {
  const { user } = await verifySession();
  const supabase = await createSupabaseServerClient();
  await supabase.from("evidence_list").delete().eq("id", id).eq("user_id", user.id);
  revalidatePath("/app/bewijs");
}
