export type UserRole = 'admin' | 'member'

export interface Profile {
  id: string
  name: string
  role: UserRole
  created_at: string
}

export type ClientStatus = 'active' | 'paused' | 'churned'

export interface Client {
  id: string
  name: string
  niche: string | null
  contact_email: string | null
  contact_phone: string | null
  current_phase: number
  status: ClientStatus
  responsible_id: string | null
  notes: string | null
  started_at: string
  created_at: string
  updated_at: string
  // joins
  responsible?: Profile | null
}

export interface ChecklistItem {
  id: string
  phase: number
  phase_slug: string
  order_index: number
  title: string
  sla_hours: number | null
  created_at: string
}

export interface ChecklistResponse {
  id: string
  client_id: string
  checklist_item_id: string
  completed: boolean
  completed_at: string | null
  completed_by: string | null
  note: string | null
  // join
  checklist_items?: ChecklistItem
  profiles?: Pick<Profile, 'id' | 'name'> | null
}

export interface PhaseHistory {
  id: string
  client_id: string
  from_phase: number | null
  to_phase: number
  changed_by: string | null
  changed_at: string
  note: string | null
  profiles?: Pick<Profile, 'id' | 'name'> | null
}
