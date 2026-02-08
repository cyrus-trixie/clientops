export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          role: 'user' | 'admin'
          created_at: string
        }
        Insert: {
          id: string
          email: string
          role?: 'user' | 'admin'
          created_at?: string
        }
        Update: {
          id?: string
          email?: string
          role?: 'user' | 'admin'
          created_at?: string
        }
      }
      clients: {
        Row: {
          id: string
          owner_id: string
          name: string
          email: string | null
          phone: string | null
          created_at: string
        }
        Insert: {
          id?: string
          owner_id: string
          name: string
          email?: string | null
          phone?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          owner_id?: string
          name?: string
          email?: string | null
          phone?: string | null
          created_at?: string
        }
      }
      projects: {
        Row: {
          id: string
          client_id: string
          owner_id: string
          title: string
          status: 'draft' | 'in_progress' | 'review' | 'completed' | 'cancelled'
          price: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          client_id: string
          owner_id: string
          title: string
          status?: 'draft' | 'in_progress' | 'review' | 'completed' | 'cancelled'
          price?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          client_id?: string
          owner_id?: string
          title?: string
          status?: 'draft' | 'in_progress' | 'review' | 'completed' | 'cancelled'
          price?: number
          created_at?: string
          updated_at?: string
        }
      }
      payments: {
        Row: {
          id: string
          project_id: string
          amount: number
          paid: boolean
          created_at: string
        }
        Insert: {
          id?: string
          project_id: string
          amount: number
          paid?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          project_id?: string
          amount?: number
          paid?: boolean
          created_at?: string
        }
      }
      activity_logs: {
        Row: {
          id: string
          user_id: string
          action: string
          entity_type: string
          entity_id: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          action: string
          entity_type: string
          entity_id?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          action?: string
          entity_type?: string
          entity_id?: string | null
          created_at?: string
        }
      }
    }
  }
}