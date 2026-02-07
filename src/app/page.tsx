import { createClient } from '@/lib/supabase/server'

export default async function HomePage() {
  const supabase = await createClient()
  const { data } = await supabase.auth.getSession()
  
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold">ClientOps</h1>
        <p className="mt-4 text-gray-600">
          Supabase connected: {data.session ? '✅ Yes' : '❌ No session'}
        </p>
      </div>
    </div>
  )
}