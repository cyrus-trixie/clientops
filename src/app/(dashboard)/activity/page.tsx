import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import ActivityFeed from '@/components/activity/ActivityFeed'

export default async function ActivityPage() {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // Fetch activity logs
  const { data: activities } = await supabase
    .from('activity_logs')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(50)

  return (
    <div className="flex-1 overflow-y-auto bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-6 sm:px-8 py-6">
        <div>
          <h1 className="text-2xl font-medium tracking-tight text-slate-900">Activity Log</h1>
          <p className="text-sm text-slate-500 mt-1">
            Track all actions and changes in your workspace
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 sm:p-8">
        <div className="max-w-4xl mx-auto">
          <ActivityFeed activities={activities ?? []} />
        </div>
      </div>
    </div>
  )
}