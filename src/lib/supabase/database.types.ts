/**
 * Manually aligned intermediate Supabase database types for the current MVP schema.
 *
 * Source of truth:
 * - supabase/migrations/20260323230000_mvp_core_schema.sql
 * - supabase/migrations/20260324103000_security_rls_and_chat_integrity.sql
 * - supabase/migrations/20260324120000_profiles_add_mvp_fields.sql
 *
 * Replace with generated types when Supabase project access is available:
 * npx supabase gen types typescript --project-id <your-project-id> > src/lib/supabase/database.types.ts
 */

type Timestamp = string;
type UUID = string;

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: UUID;
          user_id: UUID;
          display_name: string;
          dota_nickname: string | null;
          preferred_roles: string[];
          skill_bracket: string | null;
          language: string | null;
          region: string | null;
          bio: string | null;
          is_available: boolean;
          last_active_at: Timestamp | null;
          created_at: Timestamp;
          updated_at: Timestamp;
        };
        Insert: {
          id?: UUID;
          user_id: UUID;
          display_name: string;
          dota_nickname?: string | null;
          preferred_roles?: string[];
          skill_bracket?: string | null;
          language?: string | null;
          region?: string | null;
          bio?: string | null;
          is_available?: boolean;
          last_active_at?: Timestamp | null;
          created_at?: Timestamp;
          updated_at?: Timestamp;
        };
        Update: {
          id?: UUID;
          user_id?: UUID;
          display_name?: string;
          dota_nickname?: string | null;
          preferred_roles?: string[];
          skill_bracket?: string | null;
          language?: string | null;
          region?: string | null;
          bio?: string | null;
          is_available?: boolean;
          last_active_at?: Timestamp | null;
          created_at?: Timestamp;
          updated_at?: Timestamp;
        };
        Relationships: [
          {
            foreignKeyName: "profiles_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: true;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      patches: {
        Row: {
          id: UUID;
          slug: string;
          title_ru: string;
          content_ru: string;
          published_at: Timestamp | null;
          is_published: boolean;
          created_at: Timestamp;
          updated_at: Timestamp;
        };
        Insert: {
          id?: UUID;
          slug: string;
          title_ru: string;
          content_ru: string;
          published_at?: Timestamp | null;
          is_published?: boolean;
          created_at?: Timestamp;
          updated_at?: Timestamp;
        };
        Update: {
          id?: UUID;
          slug?: string;
          title_ru?: string;
          content_ru?: string;
          published_at?: Timestamp | null;
          is_published?: boolean;
          created_at?: Timestamp;
          updated_at?: Timestamp;
        };
        Relationships: [];
      };
      conversations: {
        Row: {
          id: UUID;
          created_at: Timestamp;
          updated_at: Timestamp;
          last_message_at: Timestamp | null;
          participant_one_user_id: UUID | null;
          participant_two_user_id: UUID | null;
        };
        Insert: {
          id?: UUID;
          created_at?: Timestamp;
          updated_at?: Timestamp;
          last_message_at?: Timestamp | null;
          participant_one_user_id?: UUID | null;
          participant_two_user_id?: UUID | null;
        };
        Update: {
          id?: UUID;
          created_at?: Timestamp;
          updated_at?: Timestamp;
          last_message_at?: Timestamp | null;
          participant_one_user_id?: UUID | null;
          participant_two_user_id?: UUID | null;
        };
        Relationships: [
          {
            foreignKeyName: "conversations_participant_one_user_id_fkey";
            columns: ["participant_one_user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "conversations_participant_two_user_id_fkey";
            columns: ["participant_two_user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      conversation_participants: {
        Row: {
          id: UUID;
          conversation_id: UUID;
          user_id: UUID;
          joined_at: Timestamp;
          last_read_message_id: UUID | null;
        };
        Insert: {
          id?: UUID;
          conversation_id: UUID;
          user_id: UUID;
          joined_at?: Timestamp;
          last_read_message_id?: UUID | null;
        };
        Update: {
          id?: UUID;
          conversation_id?: UUID;
          user_id?: UUID;
          joined_at?: Timestamp;
          last_read_message_id?: UUID | null;
        };
        Relationships: [
          {
            foreignKeyName: "conversation_participants_conversation_id_fkey";
            columns: ["conversation_id"];
            isOneToOne: false;
            referencedRelation: "conversations";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "conversation_participants_last_read_message_fk";
            columns: ["last_read_message_id"];
            isOneToOne: false;
            referencedRelation: "messages";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "conversation_participants_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      messages: {
        Row: {
          id: UUID;
          conversation_id: UUID;
          sender_user_id: UUID;
          body: string;
          created_at: Timestamp;
          edited_at: Timestamp | null;
        };
        Insert: {
          id?: UUID;
          conversation_id: UUID;
          sender_user_id: UUID;
          body: string;
          created_at?: Timestamp;
          edited_at?: Timestamp | null;
        };
        Update: {
          id?: UUID;
          conversation_id?: UUID;
          sender_user_id?: UUID;
          body?: string;
          created_at?: Timestamp;
          edited_at?: Timestamp | null;
        };
        Relationships: [
          {
            foreignKeyName: "messages_conversation_id_fkey";
            columns: ["conversation_id"];
            isOneToOne: false;
            referencedRelation: "conversations";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "messages_sender_must_be_participant";
            columns: ["conversation_id", "sender_user_id"];
            isOneToOne: false;
            referencedRelation: "conversation_participants";
            referencedColumns: ["conversation_id", "user_id"];
          },
          {
            foreignKeyName: "messages_sender_user_id_fkey";
            columns: ["sender_user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Views: Record<string, never>;
    Functions: {
      set_updated_at: {
        Args: Record<string, never>;
        Returns: unknown;
      };
      sync_direct_conversation_pair: {
        Args: Record<string, never>;
        Returns: unknown;
      };
    };
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};
