'use client'

import { useState, useEffect } from 'react'
import type { ChecklistItem as ChecklistItemType, ChecklistResponse } from '@/lib/types'

interface Props {
  item: ChecklistItemType
  response?: ChecklistResponse
  onToggle: (itemId: string) => Promise<void>
  onNoteUpdate: (itemId: string, note: string) => Promise<void>
}

export default function ChecklistItem({ item, response, onToggle, onNoteUpdate }: Props) {
  const [toggling, setToggling] = useState(false)
  const [showNote, setShowNote] = useState(!!response?.note)
  const [noteValue, setNoteValue] = useState(response?.note ?? '')
  const [savingNote, setSavingNote] = useState(false)
  const completed = response?.completed ?? false

  // Sincroniza estado local quando response muda após re-fetch
  useEffect(() => {
    setNoteValue(response?.note ?? '')
    if (response?.note) setShowNote(true)
  }, [response?.note])

  async function handleToggle() {
    setToggling(true)
    await onToggle(item.id)
    setToggling(false)
  }

  async function handleNoteSave() {
    setSavingNote(true)
    await onNoteUpdate(item.id, noteValue)
    setSavingNote(false)
  }

  // Indicador de SLA
  let slaLabel = ''
  if (item.sla_hours && !completed) {
    if (item.sla_hours < 24) slaLabel = `${item.sla_hours}h`
    else if (item.sla_hours < 48) slaLabel = `${item.sla_hours}h`
    else slaLabel = `${Math.round(item.sla_hours / 24)}d`
  }

  return (
    <div className={`p-4 rounded-lg border transition-colors duration-200 ${
      completed
        ? 'bg-brand-orange-muted border-brand-orange/20'
        : 'bg-brand-navy-card border-white/10 hover:border-white/20'
    }`}>
      <div className="flex items-start gap-3">
        <button
          onClick={handleToggle}
          disabled={toggling}
          className={`flex-shrink-0 w-5 h-5 rounded border-2 mt-0.5 transition-all duration-200 flex items-center justify-center ${
            completed
              ? 'bg-brand-orange border-brand-orange'
              : 'border-white/30 hover:border-brand-orange'
          } disabled:opacity-50`}
        >
          {completed && <span className="text-white text-xs font-bold">✓</span>}
        </button>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <p className={`text-sm ${completed ? 'text-white/60 line-through' : 'text-white'}`}>
              {item.title}
            </p>
            {slaLabel && (
              <span className="text-xs px-1.5 py-0.5 rounded bg-brand-navy-soft text-white/40 flex-shrink-0">
                SLA {slaLabel}
              </span>
            )}
          </div>

          {/* Nota */}
          {showNote ? (
            <div className="mt-2 space-y-1.5">
              <textarea
                className="input text-xs min-h-16 resize-y w-full"
                placeholder="Adicionar observação..."
                value={noteValue}
                onChange={e => setNoteValue(e.target.value)}
              />
              <div className="flex gap-2">
                <button
                  onClick={handleNoteSave}
                  disabled={savingNote}
                  className="text-xs px-2.5 py-1 bg-brand-orange text-white rounded font-medium disabled:opacity-50"
                >
                  {savingNote ? '...' : 'Salvar'}
                </button>
                <button
                  onClick={() => setShowNote(false)}
                  className="text-xs px-2.5 py-1 text-white/40 hover:text-white"
                >
                  Cancelar
                </button>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-3 mt-1">
              {response?.note && (
                <p className="text-xs text-white/40 italic truncate">"{response.note}"</p>
              )}
              <button
                onClick={() => setShowNote(true)}
                className="text-xs text-white/20 hover:text-brand-orange transition-colors flex-shrink-0"
              >
                {response?.note ? 'Editar nota' : '+ Nota'}
              </button>
              {response?.completed_at && (
                <span className="text-xs text-white/20 ml-auto flex-shrink-0">
                  {new Date(response.completed_at).toLocaleDateString('pt-BR')}
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
