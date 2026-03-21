'use client'

import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Header from '@/components/layout/Header'
import ChecklistItem from '@/components/checklist/ChecklistItem'
import PhaseProgressBar from '@/components/clients/PhaseProgressBar'
import { useChecklist } from '@/hooks/useChecklist'
import { useClient } from '@/hooks/useClients'
import { getPhaseBySlug, PHASES } from '@/lib/phases'

interface Props {
  params: { id: string; fase: string }
}

export default function ChecklistPage({ params }: Props) {
  const { id, fase } = params
  const phaseData = getPhaseBySlug(fase)
  const { client, loading: clientLoading, advancePhase } = useClient(id)
  const {
    items, loading, getResponse,
    toggleItem, updateNote,
    completedCount, totalCount, allCompleted,
  } = useChecklist(id, phaseData?.num ?? 0)
  const router = useRouter()

  if (!phaseData) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <p className="text-white/40">Fase não encontrada.</p>
      </div>
    )
  }

  if (clientLoading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <p className="text-white/40">Carregando...</p>
      </div>
    )
  }

  const isCurrentPhase = client?.current_phase === phaseData.num
  const canAdvance = isCurrentPhase && allCompleted && phaseData.num < 7 && client?.status === 'active'
  const nextPhase = PHASES.find(p => p.num === phaseData.num + 1)

  async function handleAdvance() {
    if (!canAdvance || !client) return
    await advancePhase(client.current_phase, client.current_phase + 1)
    router.push(`/clientes/${id}`)
  }

  return (
    <div className="flex-1 flex flex-col overflow-y-auto">
      <Header
        title={`${phaseData.icon} Fase ${phaseData.num}: ${phaseData.label}`}
        subtitle={client?.name ?? ''}
      />

      <main className="flex-1 p-6 max-w-3xl space-y-5">
        {/* Barra de progresso */}
        {client && <PhaseProgressBar currentPhase={client.current_phase} clientId={id} />}

        {/* Info da fase */}
        <div className="card-gold">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <p className="text-white/40 text-xs uppercase tracking-wide mb-1">SLA</p>
              <p className="text-brand-orange font-medium">{phaseData.sla}</p>
            </div>
            <div>
              <p className="text-white/40 text-xs uppercase tracking-wide mb-1">Responsável</p>
              <p className="text-white">{phaseData.responsavel}</p>
            </div>
            <div>
              <p className="text-white/40 text-xs uppercase tracking-wide mb-1">Progresso</p>
              <div className="flex items-center gap-2">
                <div className="flex-1 h-1.5 bg-brand-navy-soft rounded-full overflow-hidden">
                  <div
                    className="h-full bg-brand-orange rounded-full transition-all duration-500"
                    style={{ width: totalCount > 0 ? `${(completedCount / totalCount) * 100}%` : '0%' }}
                  />
                </div>
                <span className="text-white text-xs flex-shrink-0">{completedCount}/{totalCount}</span>
              </div>
            </div>
          </div>
          <p className="text-white/60 text-sm mt-3 pt-3 border-t border-white/10">{phaseData.objetivo}</p>
        </div>

        {/* Checklist */}
        {loading ? (
          <div className="flex items-center justify-center h-24">
            <p className="text-white/40 text-sm">Carregando itens...</p>
          </div>
        ) : items.length === 0 ? (
          <div className="card text-center py-8">
            <p className="text-white/30 text-sm">Nenhum item de checklist para esta fase.</p>
          </div>
        ) : (
          <div className="space-y-2">
            {items.map(item => (
              <ChecklistItem
                key={item.id}
                item={item}
                response={getResponse(item.id)}
                onToggle={toggleItem}
                onNoteUpdate={updateNote}
              />
            ))}
          </div>
        )}

        {/* Avançar fase */}
        {allCompleted && isCurrentPhase && (
          <div className="card-gold">
            {canAdvance ? (
              <div className="flex items-center justify-between gap-4 flex-wrap">
                <div>
                  <p className="text-brand-orange font-semibold">Todos os itens concluídos!</p>
                  <p className="text-white/50 text-sm mt-0.5">
                    Pronto para avançar para {nextPhase?.label}.
                  </p>
                </div>
                <button onClick={handleAdvance} className="btn-primary flex-shrink-0">
                  Avançar para Fase {phaseData.num + 1} →
                </button>
              </div>
            ) : phaseData.num === 7 ? (
              <div className="text-center">
                <p className="text-brand-orange font-semibold">Esteira completa!</p>
                <p className="text-white/50 text-sm mt-1">Este cliente concluiu todas as 7 fases.</p>
              </div>
            ) : null}
          </div>
        )}

        {/* Entregas e atenção */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="card">
            <p className="text-white/60 text-xs uppercase tracking-wide mb-3">Entregas da Fase</p>
            <ul className="space-y-1.5">
              {phaseData.entregas.map((e, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-white/70">
                  <span className="text-brand-orange mt-0.5 flex-shrink-0">◆</span> {e}
                </li>
              ))}
            </ul>
          </div>
          <div className="card border-status-warning/20">
            <p className="text-status-warning text-xs uppercase tracking-wide mb-3">Atenção</p>
            <p className="text-white/70 text-sm">{phaseData.atencao}</p>
          </div>
        </div>

        <Link href={`/clientes/${id}`} className="btn-ghost inline-block">
          ← Voltar para o cliente
        </Link>
      </main>
    </div>
  )
}
