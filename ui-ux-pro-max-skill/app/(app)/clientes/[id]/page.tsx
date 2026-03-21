'use client'

import { use, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Header from '@/components/layout/Header'
import PhaseProgressBar from '@/components/clients/PhaseProgressBar'
import { useClient, useClients } from '@/hooks/useClients'
import { PHASES } from '@/lib/phases'

interface Props {
  params: Promise<{ id: string }>
}

export default function ClientePage({ params }: Props) {
  const { id } = use(params)
  const { client, loading, refetch } = useClient(id)
  const { advancePhase, updateClient } = useClients()
  const [advancing, setAdvancing] = useState(false)
  const [editingStatus, setEditingStatus] = useState(false)
  const router = useRouter()

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <p className="text-white/40">Carregando...</p>
      </div>
    )
  }

  if (!client) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center gap-4">
        <p className="text-white/40">Cliente não encontrado.</p>
        <Link href="/clientes" className="btn-ghost">Voltar</Link>
      </div>
    )
  }

  const currentPhaseData = PHASES.find(p => p.num === client.current_phase)
  const canAdvance = client.current_phase < 7 && client.status === 'active'

  const statusOptions: { value: 'active' | 'paused' | 'churned'; label: string }[] = [
    { value: 'active', label: 'Ativo' },
    { value: 'paused', label: 'Pausado' },
    { value: 'churned', label: 'Churn' },
  ]

  async function handleAdvance() {
    if (!canAdvance) return
    setAdvancing(true)
    try {
      await advancePhase(id, client!.current_phase, client!.current_phase + 1)
      await refetch()
    } finally {
      setAdvancing(false)
    }
  }

  async function handleStatusChange(newStatus: 'active' | 'paused' | 'churned') {
    await updateClient(id, { status: newStatus })
    setEditingStatus(false)
    await refetch()
  }

  const responsible = client.responsible as { id: string; name: string } | null | undefined

  return (
    <div className="flex-1 flex flex-col overflow-y-auto">
      <Header title={client.name} subtitle={client.niche ?? 'Cliente da agência'} />

      <main className="flex-1 p-6 space-y-5">
        {/* Card principal */}
        <div className="card-gold">
          <div className="flex items-start justify-between gap-4 flex-wrap mb-4">
            <div>
              <p className="text-white/50 text-xs uppercase tracking-wide mb-1">Fase atual</p>
              <div className="flex items-center gap-2">
                <span className="text-2xl">{currentPhaseData?.icon}</span>
                <div>
                  <p className="text-brand-gold font-semibold">
                    Fase {client.current_phase}: {currentPhaseData?.label}
                  </p>
                  <p className="text-white/40 text-xs">SLA: {currentPhaseData?.sla}</p>
                </div>
              </div>
            </div>

            <div className="flex gap-2 flex-wrap">
              {editingStatus ? (
                <div className="flex gap-2 items-center flex-wrap">
                  {statusOptions.map(opt => (
                    <button
                      key={opt.value}
                      onClick={() => handleStatusChange(opt.value)}
                      className={`text-xs px-3 py-1.5 rounded-lg border transition-colors ${
                        client.status === opt.value
                          ? 'bg-brand-gold text-brand-black border-brand-gold'
                          : 'border-white/20 text-white/60 hover:border-brand-gold/40'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                  <button onClick={() => setEditingStatus(false)} className="text-xs text-white/40 px-2">✕</button>
                </div>
              ) : (
                <button onClick={() => setEditingStatus(true)} className="btn-ghost text-xs">
                  {statusOptions.find(o => o.value === client.status)?.label ?? client.status}
                </button>
              )}
              {canAdvance && (
                <button
                  onClick={handleAdvance}
                  disabled={advancing}
                  className="btn-primary text-xs disabled:opacity-50"
                >
                  {advancing ? '...' : `Avançar → Fase ${client.current_phase + 1}`}
                </button>
              )}
            </div>
          </div>

          <PhaseProgressBar currentPhase={client.current_phase} clientId={id} />
        </div>

        {/* Checklists */}
        <div>
          <h2 className="text-white/60 text-xs uppercase tracking-wide mb-3">Checklists por Fase</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2">
            {PHASES.map(phase => {
              const isAccessible = phase.num <= client.current_phase
              return (
                <Link
                  key={phase.num}
                  href={isAccessible ? `/clientes/${id}/${phase.slug}` : '#'}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg border transition-colors duration-200 ${
                    isAccessible
                      ? 'border-white/10 hover:border-brand-gold/30 hover:bg-brand-gold-muted'
                      : 'border-white/5 opacity-30 cursor-not-allowed pointer-events-none'
                  }`}
                >
                  <span className="text-lg">{phase.icon}</span>
                  <div className="min-w-0">
                    <p className={`text-sm font-medium ${phase.num === client.current_phase ? 'text-brand-gold' : 'text-white'}`}>
                      Fase {phase.num}: {phase.label}
                    </p>
                    <p className="text-white/30 text-xs">SLA: {phase.sla}</p>
                  </div>
                  {isAccessible && <span className="ml-auto text-white/20 text-xs">→</span>}
                </Link>
              )
            })}
          </div>
        </div>

        {/* Informações */}
        <div className="card">
          <h2 className="text-white/60 text-xs uppercase tracking-wide mb-3">Informações</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            {client.contact_email && (
              <div><span className="text-white/40">E-mail: </span><span className="text-white">{client.contact_email}</span></div>
            )}
            {client.contact_phone && (
              <div><span className="text-white/40">Telefone: </span><span className="text-white">{client.contact_phone}</span></div>
            )}
            {responsible?.name && (
              <div><span className="text-white/40">Responsável: </span><span className="text-white">{responsible.name}</span></div>
            )}
            <div>
              <span className="text-white/40">Início: </span>
              <span className="text-white">{new Date(client.started_at).toLocaleDateString('pt-BR')}</span>
            </div>
          </div>
          {client.notes && (
            <div className="mt-3 pt-3 border-t border-white/5">
              <p className="text-white/40 text-xs uppercase tracking-wide mb-1">Observações</p>
              <p className="text-white/70 text-sm">{client.notes}</p>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
