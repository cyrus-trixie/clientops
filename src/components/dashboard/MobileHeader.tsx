'use client'

import { usePathname } from 'next/navigation'

type Props = {
  onMenuClick: () => void
}

const pageTitles: Record<string, string> = {
  '/dashboard': 'Dashboard',
  '/clients': 'Clients',
  '/projects': 'Projects',
  '/payments': 'Payments',
  '/activity': 'Activity',
  '/settings': 'Settings',
}

export default function MobileHeader({ onMenuClick }: Props) {
  const pathname = usePathname()
  const pageTitle = pageTitles[pathname] || 'ClientOps'

  return (
    <header className="md:hidden bg-white border-b border-slate-200 px-4 py-3 flex items-center gap-3 sticky top-0 z-30">
      <button
        onClick={onMenuClick}
        className="p-2 -ml-2 text-slate-600 hover:bg-slate-50 rounded-lg transition-colors"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
      <h1 className="text-lg font-semibold text-slate-900">{pageTitle}</h1>
    </header>
  )
}