'use client'

import { useState } from 'react'
import Sidebar from './Sidebar'
import MobileHeader from './MobileHeader'

export default function DashboardWrapper({
  children,
}: {
  children: React.ReactNode
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <div className="h-screen flex overflow-hidden bg-slate-50 text-slate-800 antialiased">
      <Sidebar 
        isMobileOpen={isMobileMenuOpen} 
        onCloseMobile={() => setIsMobileMenuOpen(false)} 
      />
      
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        <MobileHeader onMenuClick={() => setIsMobileMenuOpen(true)} />
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  )
}