export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      "cart-items": {
        Row: {
          "additional-options": Json | null
          created_at: string
          id: number
          item: number
          name: string
          "order-id": number | null
          price: number
          profile: string
        }
        Insert: {
          "additional-options"?: Json | null
          created_at?: string
          id?: number
          item: number
          name: string
          "order-id"?: number | null
          price: number
          profile: string
        }
        Update: {
          "additional-options"?: Json | null
          created_at?: string
          id?: number
          item?: number
          name?: string
          "order-id"?: number | null
          price?: number
          profile?: string
        }
        Relationships: [
          {
            foreignKeyName: "cart-items_item_fkey"
            columns: ["item"]
            isOneToOne: false
            referencedRelation: "items"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cart-items_order_fkey"
            columns: ["order-id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cart-items_profile_fkey"
            columns: ["profile"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      collections: {
        Row: {
          created_at: string
          description: string
          id: number
          name: string
          season: number | null
        }
        Insert: {
          created_at?: string
          description: string
          id?: number
          name: string
          season?: number | null
        }
        Update: {
          created_at?: string
          description?: string
          id?: number
          name?: string
          season?: number | null
        }
        Relationships: []
      }
      governorates: {
        Row: {
          created_at: string
          enabled: boolean
          fee: number | null
          id: number
          name: string | null
        }
        Insert: {
          created_at?: string
          enabled?: boolean
          fee?: number | null
          id?: number
          name?: string | null
        }
        Update: {
          created_at?: string
          enabled?: boolean
          fee?: number | null
          id?: number
          name?: string | null
        }
        Relationships: []
      }
      items: {
        Row: {
          created_at: string
          feature: string
          id: number
          price: number
          product: number
          quantity: number
        }
        Insert: {
          created_at?: string
          feature: string
          id?: number
          price: number
          product: number
          quantity: number
        }
        Update: {
          created_at?: string
          feature?: string
          id?: number
          price?: number
          product?: number
          quantity?: number
        }
        Relationships: [
          {
            foreignKeyName: "items_product_fkey"
            columns: ["product"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      orders: {
        Row: {
          created_at: string
          "extra-shipping-info": string | null
          id: number
          profile: string
          "shipping-address": string
          "shipping-fee": number
          "shipping-to": number
          status: Database["public"]["Enums"]["OrderStatus"]
          subtotal: number
          tax: number
          "tax-rate": number
          total: number
        }
        Insert: {
          created_at?: string
          "extra-shipping-info"?: string | null
          id?: number
          profile: string
          "shipping-address": string
          "shipping-fee": number
          "shipping-to": number
          status?: Database["public"]["Enums"]["OrderStatus"]
          subtotal: number
          tax: number
          "tax-rate": number
          total: number
        }
        Update: {
          created_at?: string
          "extra-shipping-info"?: string | null
          id?: number
          profile?: string
          "shipping-address"?: string
          "shipping-fee"?: number
          "shipping-to"?: number
          status?: Database["public"]["Enums"]["OrderStatus"]
          subtotal?: number
          tax?: number
          "tax-rate"?: number
          total?: number
        }
        Relationships: [
          {
            foreignKeyName: "orders_profile_fkey"
            columns: ["profile"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orders_shipping-to_fkey"
            columns: ["shipping-to"]
            isOneToOne: false
            referencedRelation: "governorates"
            referencedColumns: ["id"]
          },
        ]
      }
      products: {
        Row: {
          collection: number | null
          created_at: string
          description: string | null
          id: number
          name: string
          preview: string | null
          price: number
          release_date: string
          thumbnail: string | null
        }
        Insert: {
          collection?: number | null
          created_at?: string
          description?: string | null
          id?: number
          name: string
          preview?: string | null
          price: number
          release_date: string
          thumbnail?: string | null
        }
        Update: {
          collection?: number | null
          created_at?: string
          description?: string | null
          id?: number
          name?: string
          preview?: string | null
          price?: number
          release_date?: string
          thumbnail?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "products_collection_fkey"
            columns: ["collection"]
            isOneToOne: false
            referencedRelation: "collections"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          cart: number[] | null
          full_name: string | null
          id: string
          updated_at: string | null
          username: string | null
          website: string | null
        }
        Insert: {
          avatar_url?: string | null
          cart?: number[] | null
          full_name?: string | null
          id: string
          updated_at?: string | null
          username?: string | null
          website?: string | null
        }
        Update: {
          avatar_url?: string | null
          cart?: number[] | null
          full_name?: string | null
          id?: string
          updated_at?: string | null
          username?: string | null
          website?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      OrderStatus:
        | "awaiting-aproval"
        | "approved"
        | "declined"
        | "cancelled"
        | "preparing"
        | "shipped"
        | "delivered"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
