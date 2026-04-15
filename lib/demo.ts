import type { Database } from "@/types/database";

type Profile = Database["public"]["Tables"]["profiles"]["Row"];

export const isDemoMode = () =>
  process.env.NEXT_PUBLIC_DEMO_MODE === "true";

export const DEMO_PROFILE: Profile = {
  id: "demo-user-id",
  display_name: "Demo Gebruiker",
  pain_type: ["rug", "nek", "schouders"],
  pain_duration: "2–5 jaar",
  tms_score: 38,
  current_day: 12,
  onboarding_completed: true,
  reminder_time: "08:00",
  subscription_status: "pro",
  stripe_customer_id: null,
  created_at: new Date().toISOString(),
};

export const DEMO_STATS = {
  current_streak: 5,
  longest_streak: 12,
  total_exercises: 24,
  total_journal_sessions: 9,
  total_minutes: 318,
  last_activity_date: new Date().toISOString().split("T")[0] as string | null,
};
