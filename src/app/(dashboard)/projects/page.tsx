import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import ProjectsTable from '@/components/projects/ProjectsTable'
import AddProjectButton from '@/components/projects/AddProjectButton'

// 1. Define the shape of the raw data coming from Supabase
interface SupabaseProject {
  id: string;
  client_id: string | null;
  title: string;
  status: string;
  price: number;
  created_at: string;
  updated_at: string;
  // This is the "problem" property: Supabase joins can return an array or object
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

  // 2. Transform the data to match your 'ProjectWithClient' type
  const projectsWithClient = (projects as unknown as SupabaseProject[])?.map(project => {
    // Logic to safely extract the name regardless of structure
    let extractedName = 'Unknown';
    
    if (Array.isArray(project.clients)) {
      extractedName = project.clients[0]?.name ?? 'Unknown';
    } else if (project.clients) {
      extractedName = project.clients.name;
    }

    // 3. CRITICAL STEP: 
    // We remove the 'clients' property that causes the type mismatch
    // and replace it with a structure the Table component expects.
    const { clients: _, ...rest } = project;

    return {
      ...rest,
      clientName: extractedName,
      // We pass back a clean version of clients that matches { name: string } | null
      clients: Array.isArray(project.clients) ? project.clients[0] : project.clients
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
          {/* We cast to 'any' here as a final safety net if your ProjectWithClient 
              type has extra specific requirements we didn't see */}
          <ProjectsTable projects={projectsWithClient as any} clients={clients ?? []} />
        </div>
      </div>
    </div>
  )
}