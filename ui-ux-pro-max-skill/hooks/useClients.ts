'use client'

import { useState, useEffect, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { Client, ClientStatus } from '@/lib/types'

export function useClients() {
  const [clients, setClients] = useState<Client[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchClients = useCallback(async () => {
    setLoading(true)
    const supabase = createClient()
    const { data, error: err } = await supabase
      .from('clients')
      .select('*, responsible:profiles(id, name, role)')
      .order('created_at', { ascending: false })

    if (err) {
      // Fallback: buscar sem join se o join falhar
      const { data: fallback } = await supabase
        .from('clients')
        .select('*')
        .order('created_at', { ascending: false })
      setClients(fallback || [])
      setError(null)
    } else {
      setClients(data || [])
      setError(null)
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    fetchClients()
  }, [fetchClients])

  async function addClient(data: {
    name: string
    niche?: string
    contact_email?: string
    contact_phone?: string
    responsible_id?: string
    notes?: string
  }) {
    const supabase = createClient()
    const { data: created, error: err } = await supabase
      .from('clients')
      .insert(data)
      .select()
      .single()

    if (err) throw new Error(err.message)
    await fetchClients()
    return created
  }

  async function updateClient(id: string, data: Partial<Client>) {
    const supabase = createClient()
    const { error: err } = await supabase
      .from('clients')
      .update(data)
      .eq('id', id)

    if (err) throw new Error(err.message)
    await fetchClients()
  }

  async function advancePhase(clientId: string, fromPhase: number, toPhase: number) {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()

    const { error: updateErr } = await supabase
      .from('clients')
      .update({ current_phase: toPhase })
      .eq('id', clientId)

    if (updateErr) throw new Error(updateErr.message)

    await supabase.from('phase_history').insert({
      client_id: clientId,
      from_phase: fromPhase,
      to_phase: toPhase,
      changed_by: user?.id ?? null,
    })

    await fetchClients()
  }

  return { clients, loading, error, refetch: fetchClients, addClient, updateClient, advancePhase }
}

export function useClient(id: string) {
  const [client, setClient] = useState<Client | null>(null)
  const [loading, setLoading] = useState(true)

  const fetchClient = useCallback(async () => {
    if (!id) return
    setLoading(true)
    const supabase = createClient()

    const { data, error: err } = await supabase
      .from('clients')
      .select('*, responsible:profiles(id, name, role)')
      .eq('id', id)
      .single()

    if (err) {
      // Fallback sem join
      const { data: fallback } = await supabase
        .from('clients')
        .select('*')
        .eq('id', id)
        .single()
      setClient(fallback)
    } else {
      setClient(data)
    }
    setLoading(false)
  }, [id])

  useEffect(() => {
    fetchClient()
  }, [fetchClient])

  return { client, loading, refetch: fetchClient }
}
