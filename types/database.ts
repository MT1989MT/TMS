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
        Insert: {
          id: string;
          display_name?: string | null;
          pain_type?: string[] | null;
          pain_duration?: string | null;
          tms_score?: number | null;
          current_day?: number;
          onboarding_completed?: boolean;
          reminder_time?: string | null;
          subscription_status?: string;
          stripe_customer_id?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          display_name?: string | null;
          pain_type?: string[] | null;
          pain_duration?: string | null;
          tms_score?: number | null;
          current_day?: number;
          onboarding_completed?: boolean;
          reminder_time?: string | null;
          subscription_status?: string;
          stripe_customer_id?: string | null;
          created_at?: string;
        };
        Relationships: [];
      };
      selftest_questions: {
        Row: {
          id: number;
          question_text: string;
          sort_order: number | null;
          weight: number;
        };
        Insert: {
          id?: number;
          question_text: string;
          sort_order?: number | null;
          weight?: number;
        };
        Update: {
          id?: number;
          question_text?: string;
          sort_order?: number | null;
          weight?: number;
        };
        Relationships: [];
      };
      selftest_answers: {
        Row: {
          id: number;
          question_id: number;
          answer_text: string;
          score: number;
        };
        Insert: {
          id?: number;
          question_id: number;
          answer_text: string;
          score?: number;
        };
        Update: {
          id?: number;
          question_id?: number;
          answer_text?: string;
          score?: number;
        };
        Relationships: [];
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
        Insert: {
          id?: number;
          day_number: number;
          phase: string;
          title: string;
          description?: string | null;
          education_id?: number | null;
          exercise_id?: number | null;
          journal_prompt?: string | null;
          reminder_text?: string | null;
        };
        Update: {
          id?: number;
          day_number?: number;
          phase?: string;
          title?: string;
          description?: string | null;
          education_id?: number | null;
          exercise_id?: number | null;
          journal_prompt?: string | null;
          reminder_text?: string | null;
        };
        Relationships: [];
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
        Insert: {
          id?: number;
          type: string;
          title: string;
          description?: string | null;
          duration_minutes?: number | null;
          audio_url?: string | null;
          transcript?: string | null;
          phase?: string | null;
          sort_order?: number | null;
          is_free?: boolean;
          created_at?: string;
        };
        Update: {
          id?: number;
          type?: string;
          title?: string;
          description?: string | null;
          duration_minutes?: number | null;
          audio_url?: string | null;
          transcript?: string | null;
          phase?: string | null;
          sort_order?: number | null;
          is_free?: boolean;
          created_at?: string;
        };
        Relationships: [];
      };
      daily_reminders: {
        Row: {
          id: number;
          reminder_number: number;
          text_nl: string;
          audio_url: string | null;
          explanation: string | null;
        };
        Insert: {
          id?: number;
          reminder_number: number;
          text_nl: string;
          audio_url?: string | null;
          explanation?: string | null;
        };
        Update: {
          id?: number;
          reminder_number?: number;
          text_nl?: string;
          audio_url?: string | null;
          explanation?: string | null;
        };
        Relationships: [];
      };
      user_progress: {
        Row: {
          id: number;
          user_id: string;
          content_id: number;
          completed_at: string;
          is_favorite: boolean;
        };
        Insert: {
          id?: number;
          user_id: string;
          content_id: number;
          completed_at?: string;
          is_favorite?: boolean;
        };
        Update: {
          id?: number;
          user_id?: string;
          content_id?: number;
          completed_at?: string;
          is_favorite?: boolean;
        };
        Relationships: [];
      };
      evidence_list: {
        Row: {
          id: number;
          user_id: string;
          text: string;
          category: string | null;
          created_at: string;
        };
        Insert: {
          id?: number;
          user_id: string;
          text: string;
          category?: string | null;
          created_at?: string;
        };
        Update: {
          id?: number;
          user_id?: string;
          text?: string;
          category?: string | null;
          created_at?: string;
        };
        Relationships: [];
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
        Insert: {
          id?: number;
          user_id: string;
          date: string;
          emotions?: string[] | null;
          pain_reaction?: string | null;
          journaled?: boolean;
          notes?: string | null;
          created_at?: string;
        };
        Update: {
          id?: number;
          user_id?: string;
          date?: string;
          emotions?: string[] | null;
          pain_reaction?: string | null;
          journaled?: boolean;
          notes?: string | null;
          created_at?: string;
        };
        Relationships: [];
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
        Insert: {
          id?: number;
          user_id: string;
          current_streak?: number;
          longest_streak?: number;
          total_exercises?: number;
          total_journal_sessions?: number;
          total_minutes?: number;
          last_activity_date?: string | null;
        };
        Update: {
          id?: number;
          user_id?: string;
          current_streak?: number;
          longest_streak?: number;
          total_exercises?: number;
          total_journal_sessions?: number;
          total_minutes?: number;
          last_activity_date?: string | null;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: {
      increment_user_stats: {
        Args: {
          p_user_id: string;
          p_minutes: number;
        };
        Returns: undefined;
      };
    };
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}
