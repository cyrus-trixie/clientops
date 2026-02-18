'use client'

import { Activity } from '@/types/activity.types'
import ActivityItem from './ActivityItem'

type Props = {
  activities: Activity[]
}

export default function ActivityFeed({ activities }: Props) {
  if (activities.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-16 text-center">
        <svg className="w-12 h-12 text-slate-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
        <h3 className="text-sm font-medium text-slate-900 mb-1">No activity yet</h3>
        <p className="text-sm text-slate-500">
          Start creating clients and projects to see your activity timeline
        </p>
      </div>
    )
  }

  // Group activities by date
  const groupedActivities = activities.reduce((groups, activity) => {
    const date = new Date(activity.created_at).toDateString()
    if (!groups[date]) {
      groups[date] = []
    }
    groups[date].push(activity)
    return groups
  }, {} as Record<string, Activity[]>)

  return (
    <div className="space-y-8">
      {Object.entries(groupedActivities).map(([date, dayActivities]) => (
        <div key={date}>
          {/* Date Header */}
          <div className="flex items-center gap-4 mb-4">
            <h2 className="text-sm font-semibold text-slate-900">
              {formatDateHeader(date)}
            </h2>
            <div className="flex-1 h-px bg-slate-200" />
          </div>

          {/* Activities */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="divide-y divide-slate-100">
              {dayActivities.map((activity, index) => (
                <ActivityItem 
                  key={activity.id} 
                  activity={activity}
                  isLast={index === dayActivities.length - 1}
                />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

function formatDateHeader(dateString: string): string {
  const date = new Date(dateString)
  const today = new Date()
  const yesterday = new Date(today)
  yesterday.setDate(yesterday.getDate() - 1)

  if (date.toDateString() === today.toDateString()) {
    return 'Today'
  } else if (date.toDateString() === yesterday.toDateString()) {
    return 'Yesterday'
  } else {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      month: 'long', 
      day: 'numeric',
      year: date.getFullYear() !== today.getFullYear() ? 'numeric' : undefined
    })
  }
}