'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Header from '@/components/layout/Header'
import PhaseProgressBar from '@/components/clients/PhaseProgressBar'
import PhaseIcon from '@/components/icons/PhaseIcon'
import { useClient, useClients } from '@/hooks/useClients'
import { PHASES } from '@/lib/phases'

interface Props {
  params: { id: string }
}

export default function ClientePage({ params }: Props) {
  const { id } = params
  const router = useRouter()
  const { client, loading, advancePhase, regressPhase, updateStatus } = useClient(id)
  const { deleteClient } = useClients()

  const [advancing, setAdvancing] = useState(false)
  const [editingStatus, setEditingStatus] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showRegressModal, setShowRegressModal] = useState(false)
  const [actionLoading, setActionLoading] = useState(false)
  const [actionError, setActionError] = useState<string | null>(null)

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
  const canRegress = client.current_phase > 1 && client.status === 'active'

  const statusOptions: { value: 'active' | 'paused' | 'churned'; label: string }[] = [
    { value: 'active', label: 'Ativo' },
    { value: 'paused', label: 'Pausado' },
    { value: 'churned', label: 'Churn' },
  ]

  async function handleAdvance() {
    if (!canAdvance) return
    setAdvancing(true)
    try {
      await advancePhase(client!.current_phase, client!.current_phase + 1)
    } catch (e) {
      console.error('Erro ao avançar fase:', e)
    } finally {
      setAdvancing(false)
    }
  }

  async function handleStatusChange(newStatus: 'active' | 'paused' | 'churned') {
    await updateStatus(newStatus)
    setEditingStatus(false)
  }

  async function handleRegress() {
    if (!client) return
    setActionLoading(true)
    setActionError(null)
    try {
      await regressPhase(client.current_phase, client.current_phase - 1)
      setShowRegressModal(false)
    } catch (e: any) {
      setActionError(e.message)
    } finally {
      setActionLoading(false)
    }
  }

  async function handleDelete() {
    setActionLoading(true)
    setActionError(null)
    try {
      await deleteClient(id)
      router.push('/clientes')
    } catch (e: any) {
      setActionError(e.message)
      setActionLoading(false)
    }
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
                <div className="w-9 h-9 bg-brand-orange-muted border border-brand-orange/20 rounded-lg flex items-center justify-center text-brand-orange flex-shrink-0">
                  <PhaseIcon num={client.current_phase} className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-brand-orange font-semibold">
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
                          ? 'bg-brand-orange text-white border-brand-orange'
                          : 'border-white/20 text-white/60 hover:border-brand-orange/40'
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

              {canRegress && (
                <button
                  onClick={() => setShowRegressModal(true)}
                  className="btn-ghost text-xs"
                >
                  ← Voltar fase
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
                      ? 'border-white/10 hover:border-brand-orange/30 hover:bg-brand-orange-muted'
                      : 'border-white/5 opacity-30 cursor-not-allowed pointer-events-none'
                  }`}
                >
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 ${phase.num === client.current_phase ? 'bg-brand-orange-muted text-brand-orange' : 'bg-white/5 text-white/30'}`}>
                    <PhaseIcon num={phase.num} className="w-3.5 h-3.5" />
                  </div>
                  <div className="min-w-0">
                    <p className={`text-sm font-medium ${phase.num === client.current_phase ? 'text-brand-orange' : 'text-white'}`}>
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
              <span className="text-white">{new Date(client.started_at + 'T12:00:00').toLocaleDateString('pt-BR')}</span>
            </div>
          </div>
          {client.notes && (
            <div className="mt-3 pt-3 border-t border-white/5">
              <p className="text-white/40 text-xs uppercase tracking-wide mb-1">Observações</p>
              <p className="text-white/70 text-sm">{client.notes}</p>
            </div>
          )}
        </div>

        {/* Zona de perigo */}
        <section className="border border-dashed border-red-800/40 rounded-lg p-4">
          <p className="text-red-400/70 text-xs uppercase tracking-wide mb-3">Zona de perigo</p>
          <button
            onClick={() => { setActionError(null); setShowDeleteModal(true) }}
            className="text-xs border border-red-500/50 text-red-400 hover:bg-red-500/10 px-4 py-2 rounded-lg transition-colors"
          >
            Excluir cliente
          </button>
        </section>
      </main>

      {/* Modal — Voltar fase */}
      {showRegressModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-brand-navy-soft border border-white/10 rounded-xl p-6 max-w-sm w-full space-y-4">
            <h3 className="text-white font-semibold">Voltar fase</h3>
            <p className="text-white/60 text-sm">
              Deseja retroceder <strong className="text-white">{client.name}</strong> da{' '}
              <strong className="text-brand-orange">
                Fase {client.current_phase}: {PHASES.find(p => p.num === client.current_phase)?.label}
              </strong>{' '}
              para a{' '}
              <strong className="text-white/80">
                Fase {client.current_phase - 1}: {PHASES.find(p => p.num === client.current_phase - 1)?.label}
              </strong>?
            </p>
            {actionError && <p className="text-red-400 text-xs">{actionError}</p>}
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowRegressModal(false)}
                className="btn-ghost text-xs"
              >
                Cancelar
              </button>
              <button
                onClick={handleRegress}
                disabled={actionLoading}
                className="text-xs bg-yellow-600/20 border border-yellow-600/40 text-yellow-400 hover:bg-yellow-600/30 px-4 py-2 rounded-lg transition-colors disabled:opacity-50"
              >
                {actionLoading ? '...' : 'Voltar fase'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal — Excluir cliente */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-brand-navy-soft border border-white/10 rounded-xl p-6 max-w-sm w-full space-y-4">
            <h3 className="text-white font-semibold">Excluir cliente</h3>
            <p className="text-white/60 text-sm">
              Tem certeza que deseja excluir{' '}
              <strong className="text-white">{client.name}</strong>?{' '}
              Esta ação não pode ser desfeita.
            </p>
            {actionError && <p className="text-red-400 text-xs">{actionError}</p>}
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="btn-ghost text-xs"
              >
                Cancelar
              </button>
              <button
                onClick={handleDelete}
                disabled={actionLoading}
                className="text-xs bg-red-600/20 border border-red-500/50 text-red-400 hover:bg-red-600/30 px-4 py-2 rounded-lg transition-colors disabled:opacity-50"
              >
                {actionLoading ? '...' : 'Excluir'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
