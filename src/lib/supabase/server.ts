import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function createClient() {
  const cookieStore = await cookies()

  // Turbopack workaround - fallback to hardcoded values in dev
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://cjextamcfnirjixomsrm.supabase.co'
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNqZXh0YW1jZm5pcmppeG9tc3JtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA0ODEyNTksImV4cCI6MjA4NjA1NzI1OX0.5cDPifGnYh76k9K6Re3a9-V6A75U0C8agT4LxxLV0SA'

  return createServerClient(
    supabaseUrl,
    supabaseKey,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    }
  )
}