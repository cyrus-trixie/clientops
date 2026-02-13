import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import ProjectsTable from '@/components/projects/ProjectsTable'
import AddProjectButton from '@/components/projects/AddProjectButton'

// This interface tells TypeScript exactly what to expect from the Supabase join
interface SupabaseProject {
  id: any;
  client_id: any;
  title: any;
  status: any;
  price: any;
  created_at: any;
  updated_at: any;
  clients: { name: string } | { name: string }[] | null;
}

export default async function ProjectsPage() {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // Fetch all projects with client names
  const { data: projects } = await supabase
    .from('projects')
    .select(`
      id,
      client_id,
      title,
      status,
      price,
      created_at,
      updated_at,
      clients (
        name
      )
    `)
    .order('created_at', { ascending: false })

  // Fetch all clients for the add/edit modals
  const { data: clients } = await supabase
    .from('clients')
    .select('id, name')
    .order('name')

  // Transform projects to include clientName safely
  const projectsWithClient = (projects as SupabaseProject[] | null)?.map(project => {
    let clientName = 'Unknown';
    
    if (Array.isArray(project.clients)) {
      clientName = project.clients[0]?.name ?? 'Unknown';
    } else if (project.clients) {
      clientName = project.clients.name;
    }

    return {
      ...project,
      clientName
    };
  }) ?? []

  return (
    <div className="flex-1 overflow-y-auto bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-6 sm:px-8 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-medium tracking-tight text-slate-900">Projects</h1>
            <p className="text-sm text-slate-500 mt-1">
              Track and manage all your client projects
            </p>
          </div>
          <AddProjectButton clients={clients ?? []} />
        </div>
      </div>

      {/* Content */}
      <div className="p-6 sm:p-8">
        <div className="max-w-7xl mx-auto">
          <ProjectsTable projects={projectsWithClient} clients={clients ?? []} />
        </div>
      </div>
    </div>
  )
}