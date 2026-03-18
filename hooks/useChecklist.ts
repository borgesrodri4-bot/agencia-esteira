'use client'

import { useState, useEffect, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { ChecklistItem, ChecklistResponse } from '@/lib/types'

export function useChecklist(clientId: string, phase: number) {
  const [items, setItems] = useState<ChecklistItem[]>([])
  const [responses, setResponses] = useState<ChecklistResponse[]>([])
  const [loading, setLoading] = useState(true)

  const fetchAll = useCallback(async () => {
    if (!clientId || !phase) return
    setLoading(true)
    const supabase = createClient()

    const [itemsResult, responsesResult] = await Promise.all([
      supabase
        .from('checklist_items')
        .select('*')
        .eq('phase', phase)
        .order('order_index'),
      supabase
        .from('checklist_responses')
        .select('*')
        .eq('client_id', clientId),
    ])

    setItems(itemsResult.data || [])
    setResponses(responsesResult.data || [])
    setLoading(false)
  }, [clientId, phase])

  useEffect(() => {
    fetchAll()
  }, [fetchAll])

  function getResponse(itemId: string): ChecklistResponse | undefined {
    return responses.find(r => r.checklist_item_id === itemId)
  }

  function isCompleted(itemId: string): boolean {
    return getResponse(itemId)?.completed ?? false
  }

  const completedCount = items.filter(item => isCompleted(item.id)).length
  const totalCount = items.length
  const allCompleted = totalCount > 0 && completedCount === totalCount

  async function toggleItem(itemId: string) {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    const existing = getResponse(itemId)
    const nowCompleted = !(existing?.completed ?? false)

    if (existing) {
      await supabase
        .from('checklist_responses')
        .update({
          completed: nowCompleted,
          completed_at: nowCompleted ? new Date().toISOString() : null,
          completed_by: nowCompleted ? (user?.id ?? null) : null,
        })
        .eq('id', existing.id)
    } else {
      await supabase.from('checklist_responses').insert({
        client_id: clientId,
        checklist_item_id: itemId,
        completed: true,
        completed_at: new Date().toISOString(),
        completed_by: user?.id ?? null,
      })
    }

    await fetchAll()
  }

  async function updateNote(itemId: string, note: string) {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    const existing = getResponse(itemId)

    if (existing) {
      await supabase.from('checklist_responses').update({ note }).eq('id', existing.id)
    } else {
      await supabase.from('checklist_responses').insert({
        client_id: clientId,
        checklist_item_id: itemId,
        completed: false,
        note,
        completed_by: user?.id ?? null,
      })
    }

    await fetchAll()
  }

  return {
    items, responses, loading,
    isCompleted, getResponse,
    toggleItem, updateNote,
    completedCount, totalCount, allCompleted,
  }
}
