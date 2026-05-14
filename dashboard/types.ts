export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      cctv_cameras: {
        Row: {
          corredor: string
          created_at: string
          id: string
          lat: number
          lng: number
          name: string
          status: string
        }
        Insert: {
          corredor: string
          created_at?: string
          id?: string
          lat: number
          lng: number
          name: string
          status?: string
        }
        Update: {
          corredor?: string
          created_at?: string
          id?: string
          lat?: number
          lng?: number
          name?: string
          status?: string
        }
        Relationships: []
      }
      corredores: {
        Row: {
          created_at: string
          id: string
          name: string
          sort_order: number
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          sort_order?: number
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          sort_order?: number
        }
        Relationships: []
      }
      hourly_demand: {
        Row: {
          hour: string
          id: string
          occupancy: number
          sort_order: number
        }
        Insert: {
          hour: string
          id?: string
          occupancy: number
          sort_order?: number
        }
        Update: {
          hour?: string
          id?: string
          occupancy?: number
          sort_order?: number
        }
        Relationships: []
      }
      incidents: {
        Row: {
          created_at: string
          icon: string
          id: string
          level: string
          location: string
          time_label: string
          title: string
        }
        Insert: {
          created_at?: string
          icon: string
          id?: string
          level?: string
          location: string
          time_label: string
          title: string
        }
        Update: {
          created_at?: string
          icon?: string
          id?: string
          level?: string
          location?: string
          time_label?: string
          title?: string
        }
        Relationships: []
      }
      lines: {
        Row: {
          color: string
          id: string
          load: number
          name: string
          riders: string
          sort_order: number
          status: string
        }
        Insert: {
          color: string
          id?: string
          load: number
          name: string
          riders: string
          sort_order?: number
          status: string
        }
        Update: {
          color?: string
          id?: string
          load?: number
          name?: string
          riders?: string
          sort_order?: number
          status?: string
        }
        Relationships: []
      }
      mode_split: {
        Row: {
          color: string
          id: string
          name: string
          sort_order: number
          value: number
        }
        Insert: {
          color: string
          id?: string
          name: string
          sort_order?: number
          value: number
        }
        Update: {
          color?: string
          id?: string
          name?: string
          sort_order?: number
          value?: number
        }
        Relationships: []
      }
      ridership: {
        Row: {
          day: string
          id: string
          metro: number
          metroplus: number
          sort_order: number
        }
        Insert: {
          day: string
          id?: string
          metro: number
          metroplus: number
          sort_order?: number
        }
        Update: {
          day?: string
          id?: string
          metro?: number
          metroplus?: number
          sort_order?: number
        }
        Relationships: []
      }
      road_incidents: {
        Row: {
          comuna: string
          crash_type: string
          created_at: string
          fatalities: number
          id: string
          lat: number
          lng: number
          severity: string
          transport_mode: string
          year: number
        }
        Insert: {
          comuna: string
          crash_type: string
          created_at?: string
          fatalities?: number
          id?: string
          lat: number
          lng: number
          severity?: string
          transport_mode: string
          year: number
        }
        Update: {
          comuna?: string
          crash_type?: string
          created_at?: string
          fatalities?: number
          id?: string
          lat?: number
          lng?: number
          severity?: string
          transport_mode?: string
          year?: number
        }
        Relationships: []
      }
      stats: {
        Row: {
          accent: string
          delta: number
          icon: string
          id: string
          label: string
          sort_order: number
          updated_at: string
          value: string
        }
        Insert: {
          accent?: string
          delta?: number
          icon: string
          id?: string
          label: string
          sort_order?: number
          updated_at?: string
          value: string
        }
        Update: {
          accent?: string
          delta?: number
          icon?: string
          id?: string
          label?: string
          sort_order?: number
          updated_at?: string
          value?: string
        }
        Relationships: []
      }
      velocidad_intensidad_vehicular: {
        Row: {
          corredor: string
          flujo_libre: number
          id: string
          intensidad_vehicular: number
          nivel_servicio: string
          sort_order: number
          updated_at: string
          velocidad_promedio: number
        }
        Insert: {
          corredor: string
          flujo_libre?: number
          id?: string
          intensidad_vehicular: number
          nivel_servicio?: string
          sort_order?: number
          updated_at?: string
          velocidad_promedio: number
        }
        Update: {
          corredor?: string
          flujo_libre?: number
          id?: string
          intensidad_vehicular?: number
          nivel_servicio?: string
          sort_order?: number
          updated_at?: string
          velocidad_promedio?: number
        }
        Relationships: []
      }
      velocidad_tiempo_viaje: {
        Row: {
          corredor: string
          id: string
          sort_order: number
          tiempo_viaje_pico: number | null
          tiempo_viaje_valle: number | null
          updated_at: string
          velocidad_pico: number
          velocidad_valle: number
        }
        Insert: {
          corredor: string
          id?: string
          sort_order?: number
          tiempo_viaje_pico?: number | null
          tiempo_viaje_valle?: number | null
          updated_at?: string
          velocidad_pico: number
          velocidad_valle: number
        }
        Update: {
          corredor?: string
          id?: string
          sort_order?: number
          tiempo_viaje_pico?: number | null
          tiempo_viaje_valle?: number | null
          updated_at?: string
          velocidad_pico?: number
          velocidad_valle?: number
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
