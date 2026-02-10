import Sidebar from '@/components/dashboard/Sidebar'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="h-screen flex overflow-hidden bg-slate-50 text-slate-800 antialiased">
      <Sidebar />
      <main className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        {children}
      </main>
    </div>
  )
}