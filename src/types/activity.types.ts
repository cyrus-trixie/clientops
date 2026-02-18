export type Activity = {
  id: string
  user_id: string
  action: string
  entity_type: string
  entity_id: string | null
  created_at: string
}

export type ActivityWithDetails = Activity & {
  icon: string
  color: string
  title: string
  description: string
}