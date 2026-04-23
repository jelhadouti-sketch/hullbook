// ============================================================================
// Database types — manually maintained to match supabase/migrations/*.
// Regenerate with: npx supabase gen types typescript --local > types.ts
// ============================================================================

export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
  public: {
    Tables: {
      waitlist: {
        Row: {
          id: string;
          email: string;
          locale: string;
          currency: string;
          source: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          email: string;
          locale?: string;
          currency?: string;
          source?: string | null;
          created_at?: string;
        };
        Update: Partial<Database['public']['Tables']['waitlist']['Insert']>;
      };
      profiles: {
        Row: {
          id: string; // matches auth.users.id
          email: string;
          full_name: string | null;
          locale: string;
          currency: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          full_name?: string | null;
          locale?: string;
          currency?: string;
        };
        Update: Partial<Database['public']['Tables']['profiles']['Insert']>;
      };
      boats: {
        Row: {
          id: string;
          user_id: string;
          name: string;
          type: 'sailboat' | 'powerboat' | 'trawler' | 'pontoon' | 'jetski' | 'other';
          length_ft: number | null;
          year: number | null;
          make: string | null;
          model: string | null;
          purchase_value_minor: number | null;
          purchase_date: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          name: string;
          type?: Database['public']['Tables']['boats']['Row']['type'];
          length_ft?: number | null;
          year?: number | null;
          make?: string | null;
          model?: string | null;
          purchase_value_minor?: number | null;
          purchase_date?: string | null;
        };
        Update: Partial<Database['public']['Tables']['boats']['Insert']>;
      };
      entries: {
        Row: {
          id: string;
          boat_id: string;
          user_id: string;
          kind: 'expense' | 'trip' | 'service';
          occurred_on: string;
          category: string;
          merchant: string | null;
          note: string | null;
          amount_minor: number;
          currency: string;
          engine_hours_delta: number | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          boat_id: string;
          user_id: string;
          kind: Database['public']['Tables']['entries']['Row']['kind'];
          occurred_on: string;
          category: string;
          merchant?: string | null;
          note?: string | null;
          amount_minor: number;
          currency: string;
          engine_hours_delta?: number | null;
        };
        Update: Partial<Database['public']['Tables']['entries']['Insert']>;
      };
      service_schedules: {
        Row: {
          id: string;
          boat_id: string;
          user_id: string;
          name: string;
          category: string;
          interval_hours: number | null;
          interval_months: number | null;
          last_performed_on: string | null;
          last_performed_hours: number | null;
          expected_cost_minor: number | null;
          expected_cost_currency: string | null;
          notes: string | null;
          archived: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          boat_id: string;
          user_id: string;
          name: string;
          category?: string;
          interval_hours?: number | null;
          interval_months?: number | null;
          last_performed_on?: string | null;
          last_performed_hours?: number | null;
          expected_cost_minor?: number | null;
          expected_cost_currency?: string | null;
          notes?: string | null;
          archived?: boolean;
        };
        Update: Partial<Database['public']['Tables']['service_schedules']['Insert']>;
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
  };
}
