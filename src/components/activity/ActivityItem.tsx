'use client'

import { Activity } from '@/types/activity.types'

type Props = {
  activity: Activity
  isLast: boolean
}

const activityConfig: Record<string, { icon: string; color: string; bgColor: string; title: (type: string) => string }> = {
  created: {
    icon: 'M12 4v16m8-8H4',
    color: 'text-indigo-600',
    bgColor: 'bg-indigo-50',
    title: (type) => `Created new ${type}`,
  },
  updated: {
    icon: 'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    title: (type) => `Updated ${type}`,
  },
  deleted: {
    icon: 'M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16',
    color: 'text-red-600',
    bgColor: 'bg-red-50',
    title: (type) => `Deleted ${type}`,
  },
  payment_received: {
    icon: 'M9 8h6m-5 0a3 3 0 110 6H9l3 3m-3-6h6m6 1a9 9 0 11-18 0 9 9 0 0118 0z',
    color: 'text-emerald-600',
    bgColor: 'bg-emerald-50',
    title: () => 'Payment received',
  },
  signed_contract: {
    icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
    title: () => 'Contract signed',
  },
  downloaded_report: {
    icon: 'M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4',
    color: 'text-slate-600',
    bgColor: 'bg-slate-50',
    title: () => 'Downloaded report',
  },
}

export default function ActivityItem({ activity, isLast }: Props) {
  const config = activityConfig[activity.action] ?? {
    icon: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
    color: 'text-slate-600',
    bgColor: 'bg-slate-50',
    title: () => activity.action.replace('_', ' '),
  }

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    })
  }

  return (
    <div className="px-6 py-4 hover:bg-slate-50 transition-colors">
      <div className="flex items-start gap-4">
        {/* Icon */}
        <div className={`w-10 h-10 rounded-full ${config.bgColor} flex items-center justify-center flex-shrink-0`}>
          <svg className={`w-5 h-5 ${config.color}`} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d={config.icon} />
          </svg>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-slate-900">
            {config.title(activity.entity_type)}
          </p>
          <p className="text-xs text-slate-500 mt-1">
            {formatTime(activity.created_at)}
          </p>
        </div>
      </div>
    </div>
  )
}