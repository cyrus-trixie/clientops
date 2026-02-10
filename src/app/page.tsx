import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export default async function HomePage() {
  const supabase = await createClient()
  const { data: { session } } = await supabase.auth.getSession()

  // If logged in, go to dashboard
  if (session) {
    redirect('/dashboard')
  }

  // If not logged in, go to login
  redirect('/login')
}