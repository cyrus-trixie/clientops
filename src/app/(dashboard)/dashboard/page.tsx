import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

type Client = { name: string }
type Project = {
  id: string
  title: string
  status: string
  price: number
  created_at: string
  clients: Client | Client[] | null
}

const statusStyles: Record<string, string> = {
  draft: 'bg-slate-100 text-slate-600 border-slate-200',
  in_progress: 'bg-amber-50 text-amber-700 border-amber-100',
  review: 'bg-blue-50 text-blue-700 border-blue-100',
  completed: 'bg-emerald-50 text-emerald-700 border-emerald-100',
  cancelled: 'bg-red-50 text-red-700 border-red-100',
}

const statusLabels: Record<string, string> = {
  draft: 'Draft',
  in_progress: 'In Progress',
  review: 'Review',
  completed: 'Completed',
  cancelled: 'Cancelled',
}

function getClientName(clients: Client | Client[] | null): string {
  if (!clients) return 'Unknown'
  if (Array.isArray(clients)) return clients[0]?.name ?? 'Unknown'
  return clients.name ?? 'Unknown'
}

export default async function DashboardPage() {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const [clientsResult, projectsResult, paymentsResult] = await Promise.all([
    supabase.from('clients').select('id', { count: 'exact' }),
    supabase.from('projects').select('id, status, price', { count: 'exact' }),
    supabase.from('payments').select('amount, paid'),
  ])

  const totalClients = clientsResult.count ?? 0
  const totalProjects = projectsResult.count ?? 0
  const activeProjects = projectsResult.data?.filter(p => p.status === 'in_progress').length ?? 0

  const totalRevenue = paymentsResult.data
    ?.filter(p => p.paid)
    .reduce((sum, p) => sum + Number(p.amount), 0) ?? 0

  const pendingPayments = paymentsResult.data
    ?.filter(p => !p.paid)
    .reduce((sum, p) => sum + Number(p.amount), 0) ?? 0

  const { data: recentProjects } = await supabase
    .from('projects')
    .select(`
      id,
      title,
      status,
      price,
      created_at,
      clients (
        name
      )
    `)
    .order('created_at', { ascending: false })
    .limit(5)

  const stats = [
    {
      label: 'Active Projects',
      value: activeProjects,
      color: 'bg-indigo-50 text-indigo-600',
      icon: 'M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z',
    },
    {
      label: 'Total Clients',
      value: totalClients,
      color: 'bg-slate-100 text-slate-600',
      icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z',
    },
    {
      label: 'Revenue (Total)',
      value: `$${totalRevenue.toLocaleString()}`,
      color: 'bg-emerald-50 text-emerald-600',
      icon: 'M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z',
    },
    {
      label: 'Pending Payments',
      value: `$${pendingPayments.toLocaleString()}`,
      color: 'bg-amber-50 text-amber-600',
      icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
    },
  ]

  return (
    <div className="flex-1 overflow-y-auto bg-slate-50 p-6 sm:p-8">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* Page Header */}
        <div>
          <h1 className="text-2xl font-medium tracking-tight text-slate-900">Overview</h1>
          <p className="text-sm text-slate-500 mt-1">
            Track your business performance and active projects.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="flex justify-between items-start mb-4">
                <div className={`p-2 rounded-lg ${stat.color}`}>
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.5}
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d={stat.icon} />
                  </svg>
                </div>
              </div>
              <p className="text-sm font-medium text-slate-500">{stat.label}</p>
              <h3 className="text-2xl font-medium tracking-tight text-slate-900 mt-1">
                {stat.value}
              </h3>
            </div>
          ))}
        </div>

        {/* Recent Projects Table */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
            <h3 className="text-base font-medium text-slate-900">Recent Projects</h3>
            <a
              href="/projects"
              className="text-sm text-indigo-600 hover:text-indigo-700 font-medium"
            >
              View All
            </a>
          </div>

          {recentProjects && recentProjects.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50">
                    <th className="px-6 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">
                      Project
                    </th>
                    <th className="px-6 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">
                      Client
                    </th>
                    <th className="px-6 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider text-right">
                      Value
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {(recentProjects as unknown as Project[]).map((project) => {
                    const clientName = getClientName(project.clients)
                    return (
                      <tr
                        key={project.id}
                        className="hover:bg-slate-50 transition-colors cursor-pointer group"
                      >
                        <td className="px-6 py-4">
                          <p className="text-sm font-medium text-slate-900 group-hover:text-indigo-600 transition-colors">
                            {project.title}
                          </p>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <div className="w-5 h-5 rounded-full bg-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-600">
                              {clientName[0]?.toUpperCase() ?? '?'}
                            </div>
                            <span className="text-sm text-slate-600">{clientName}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${statusStyles[project.status] ?? statusStyles.draft}`}
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-current opacity-70" />
                            {statusLabels[project.status] ?? project.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <span className="text-sm font-medium text-slate-900">
                            ${Number(project.price).toLocaleString()}
                          </span>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="px-6 py-16 text-center">
              <p className="text-sm text-slate-400">No projects yet.</p>
              <a
                href="/projects"
                className="mt-3 inline-block text-sm text-indigo-600 hover:text-indigo-700 font-medium"
              >
                Create your first project
              </a>
            </div>
          )}
        </div>

      </div>
    </div>
  )
}