export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          display_name: string | null;
          pain_type: string[] | null;
          pain_duration: string | null;
          tms_score: number | null;
          current_day: number;
          onboarding_completed: boolean;
          reminder_time: string | null;
          subscription_status: string;
          stripe_customer_id: string | null;
          created_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["profiles"]["Row"], "created_at">;
        Update: Partial<Database["public"]["Tables"]["profiles"]["Insert"]>;
      };
      selftest_questions: {
        Row: {
          id: number;
          question_text: string;
          sort_order: number | null;
          weight: number;
        };
        Insert: Omit<Database["public"]["Tables"]["selftest_questions"]["Row"], "id">;
        Update: Partial<Database["public"]["Tables"]["selftest_questions"]["Insert"]>;
      };
      selftest_answers: {
        Row: {
          id: number;
          question_id: number;
          answer_text: string;
          score: number;
        };
        Insert: Omit<Database["public"]["Tables"]["selftest_answers"]["Row"], "id">;
        Update: Partial<Database["public"]["Tables"]["selftest_answers"]["Insert"]>;
      };
      program_days: {
        Row: {
          id: number;
          day_number: number;
          phase: string;
          title: string;
          description: string | null;
          education_id: number | null;
          exercise_id: number | null;
          journal_prompt: string | null;
          reminder_text: string | null;
        };
        Insert: Omit<Database["public"]["Tables"]["program_days"]["Row"], "id">;
        Update: Partial<Database["public"]["Tables"]["program_days"]["Insert"]>;
      };
      content: {
        Row: {
          id: number;
          type: string;
          title: string;
          description: string | null;
          duration_minutes: number | null;
          audio_url: string | null;
          transcript: string | null;
          phase: string | null;
          sort_order: number | null;
          is_free: boolean;
          created_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["content"]["Row"], "id" | "created_at">;
        Update: Partial<Database["public"]["Tables"]["content"]["Insert"]>;
      };
      daily_reminders: {
        Row: {
          id: number;
          reminder_number: number;
          text_nl: string;
          audio_url: string | null;
          explanation: string | null;
        };
        Insert: Omit<Database["public"]["Tables"]["daily_reminders"]["Row"], "id">;
        Update: Partial<Database["public"]["Tables"]["daily_reminders"]["Insert"]>;
      };
      user_progress: {
        Row: {
          id: number;
          user_id: string;
          content_id: number;
          completed_at: string;
          is_favorite: boolean;
        };
        Insert: Omit<Database["public"]["Tables"]["user_progress"]["Row"], "id" | "completed_at">;
        Update: Partial<Database["public"]["Tables"]["user_progress"]["Insert"]>;
      };
      evidence_list: {
        Row: {
          id: number;
          user_id: string;
          text: string;
          category: string | null;
          created_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["evidence_list"]["Row"], "id" | "created_at">;
        Update: Partial<Database["public"]["Tables"]["evidence_list"]["Insert"]>;
      };
      emotion_checkins: {
        Row: {
          id: number;
          user_id: string;
          date: string;
          emotions: string[] | null;
          pain_reaction: string | null;
          journaled: boolean;
          notes: string | null;
          created_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["emotion_checkins"]["Row"], "id" | "created_at">;
        Update: Partial<Database["public"]["Tables"]["emotion_checkins"]["Insert"]>;
      };
      user_stats: {
        Row: {
          id: number;
          user_id: string;
          current_streak: number;
          longest_streak: number;
          total_exercises: number;
          total_journal_sessions: number;
          total_minutes: number;
          last_activity_date: string | null;
        };
        Insert: Omit<Database["public"]["Tables"]["user_stats"]["Row"], "id">;
        Update: Partial<Database["public"]["Tables"]["user_stats"]["Insert"]>;
      };
    };
  };
}
