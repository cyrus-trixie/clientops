export type Project = {
  id: string
  client_id: string
  title: string
  status: 'draft' | 'in_progress' | 'review' | 'completed' | 'cancelled'
  price: number
  created_at: string
  updated_at: string
  clients: {
    name: string
  } | null
}

export type ProjectWithClient = Project & {
  clientName: string
}