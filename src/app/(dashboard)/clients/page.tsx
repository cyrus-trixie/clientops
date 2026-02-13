import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import ClientsTable from '@/components/clients/ClientsTable'
import AddClientButton from '@/components/clients/AddClientButton'

export default async function ClientsPage() {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // Fetch all clients with project count
  const { data: clients } = await supabase
    .from('clients')
    .select(`
      id,
      name,
      email,
      phone,
      created_at,
      projects (
        id
      )
    `)
    .order('created_at', { ascending: false })

  // Transform data to include project count
  const clientsWithCount = clients?.map(client => ({
    ...client,
    projectCount: Array.isArray(client.projects) ? client.projects.length : 0,
  })) ?? []

  return (
    <div className="flex-1 overflow-y-auto bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-6 sm:px-8 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-medium tracking-tight text-slate-900">Clients</h1>
            <p className="text-sm text-slate-500 mt-1">
              Manage your client relationships and contacts
            </p>
          </div>
          <AddClientButton />
        </div>
      </div>

      {/* Content */}
      <div className="p-6 sm:p-8">
        <div className="max-w-7xl mx-auto">
          <ClientsTable clients={clientsWithCount} />
        </div>
      </div>
    </div>
  )
}