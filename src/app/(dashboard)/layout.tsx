import Sidebar from '@/components/dashboard/Sidebar'
import DashboardWrapper from '@/components/dashboard/DashboardWrapper'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <DashboardWrapper>
      {children}
    </DashboardWrapper>
  )
}