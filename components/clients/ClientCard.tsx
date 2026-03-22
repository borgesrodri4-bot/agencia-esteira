import Link from 'next/link'
import { PHASES } from '@/lib/phases'
import type { Client } from '@/lib/types'
import PhaseIcon from '@/components/icons/PhaseIcon'

interface ClientCardProps {
  client: Client
}

const slaMap: Record<number, number> = {
  1: 24, 2: 72, 3: 168, 4: 360, 5: 720, 6: 120, 7: 720,
}

function getSlaStatus(client: Client): { label: string; cls: string; dot: string } | null {
  if (client.status !== 'active') return null
  const slaHours = slaMap[client.current_phase]
  if (!slaHours) return null

  const elapsed = (Date.now() - new Date(client.updated_at || client.started_at).getTime()) / 3600000
  const pct = elapsed / slaHours

  if (pct >= 1)    return { label: 'SLA vencido', cls: 'text-status-danger bg-status-danger/10 border-status-danger/20',  dot: 'bg-status-danger' }
  if (pct >= 0.75) return { label: 'SLA próximo', cls: 'text-status-warning bg-status-warning/10 border-status-warning/20', dot: 'bg-status-warning animate-pulse' }
  return { label: 'No prazo', cls: 'text-status-ok bg-status-ok/10 border-status-ok/20', dot: 'bg-status-ok' }
}

const statusConfig: Record<string, { label: string; cls: string; dot: string }> = {
  active:  { label: 'Ativo',   cls: 'text-status-ok bg-status-ok/10 border-status-ok/20',         dot: 'bg-status-ok' },
  paused:  { label: 'Pausado', cls: 'text-status-paused bg-status-paused/10 border-status-paused/20', dot: 'bg-status-paused' },
  churned: { label: 'Churn',   cls: 'text-status-danger bg-status-danger/10 border-status-danger/20', dot: 'bg-status-danger' },
}

export default function ClientCard({ client }: ClientCardProps) {
  const phase       = PHASES.find(p => p.num === client.current_phase)
  const sla         = getSlaStatus(client)
  const status      = statusConfig[client.status] ?? statusConfig.paused
  const responsible = client.responsible as { name: string } | null | undefined
  const progress    = (client.current_phase - 1) / 6

  return (
    <Link
      href={`/clientes/${client.id}`}
      className="group relative flex flex-col bg-brand-navy-card border border-white/8 rounded-2xl overflow-hidden
        transition-all duration-300 hover:border-brand-orange/25 hover:shadow-orange-lg hover:-translate-y-0.5
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange/50"
    >
      {/* Barra de progresso no topo — laranja gradiente */}
      <div className="h-0.5 w-full bg-white/5">
        <div
          className="h-full bg-orange-gradient transition-all duration-700"
          style={{ width: `${progress * 100}%` }}
        />
      </div>

      <div className="p-5 flex flex-col flex-1 gap-4">
        {/* Linha 1: Nome + Status */}
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <h3 className="text-white font-semibold text-sm leading-snug truncate group-hover:text-brand-orange transition-colors duration-200">
              {client.name}
            </h3>
            {client.niche && (
              <p className="text-white/35 text-xs mt-0.5 truncate">{client.niche}</p>
            )}
          </div>
          <span className={`inline-flex items-center gap-1.5 text-[10px] font-semibold px-2 py-1 rounded-full border flex-shrink-0 ${status.cls}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
            {status.label}
          </span>
        </div>

        {/* Linha 2: Fase atual */}
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-brand-orange-muted border border-brand-orange/20 rounded-xl flex items-center justify-center flex-shrink-0 text-brand-orange
            group-hover:bg-brand-orange group-hover:border-brand-orange group-hover:text-white transition-all duration-300">
            <PhaseIcon num={client.current_phase} className="w-3.5 h-3.5" />
          </div>
          <div className="min-w-0">
            <p className="text-white text-xs font-medium leading-tight">
              Fase {client.current_phase} · {phase?.label}
            </p>
            <p className="text-white/25 text-[10px] mt-0.5">{phase?.sla}</p>
          </div>
        </div>

        {/* Linha 3: Mini barra das 7 fases */}
        <div className="flex gap-0.5">
          {PHASES.map(p => (
            <div
              key={p.num}
              title={`Fase ${p.num}: ${p.label}`}
              className={`flex-1 h-1 rounded-full transition-all duration-300 ${
                p.num < client.current_phase  ? 'bg-brand-orange' :
                p.num === client.current_phase ? 'bg-brand-orange/40' :
                'bg-white/8'
              }`}
            />
          ))}
        </div>

        {/* Linha 4: Rodapé — responsável + SLA */}
        <div className="flex items-center justify-between pt-1 border-t border-white/5">
          <div className="flex items-center gap-1.5 text-[10px] text-white/30">
            {responsible?.name ? (
              <>
                <svg viewBox="0 0 16 16" fill="currentColor" className="w-3 h-3 flex-shrink-0">
                  <path d="M8 8a3 3 0 100-6 3 3 0 000 6zM3 14a5 5 0 0110 0H3z" />
                </svg>
                <span className="truncate max-w-24">{responsible.name}</span>
              </>
            ) : (
              <span className="italic text-white/20">Sem responsável</span>
            )}
          </div>

          {sla ? (
            <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[10px] font-medium border ${sla.cls}`}>
              <span className={`w-1 h-1 rounded-full ${sla.dot}`} />
              {sla.label}
            </span>
          ) : null}
        </div>
      </div>

      {/* Seta hover */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-200 translate-x-1 group-hover:translate-x-0 pointer-events-none">
        <svg viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 text-brand-orange">
          <path fillRule="evenodd" d="M6.22 3.22a.75.75 0 011.06 0l4.25 4.25a.75.75 0 010 1.06l-4.25 4.25a.75.75 0 01-1.06-1.06L9.94 8 6.22 4.28a.75.75 0 010-1.06z" clipRule="evenodd" />
        </svg>
      </div>
    </Link>
  )
}
