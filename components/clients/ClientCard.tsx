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

  if (pct >= 1) return { label: 'SLA vencido', cls: 'text-status-danger bg-status-danger/10', dot: 'bg-status-danger' }
  if (pct >= 0.75) return { label: 'SLA próximo', cls: 'text-status-warning bg-status-warning/10', dot: 'bg-status-warning animate-pulse' }
  return { label: 'No prazo', cls: 'text-status-ok bg-status-ok/10', dot: 'bg-status-ok' }
}

const statusConfig: Record<string, { label: string; cls: string; bar: string }> = {
  active:  { label: 'Ativo',    cls: 'text-status-ok bg-status-ok/10',       bar: 'bg-status-ok' },
  paused:  { label: 'Pausado',  cls: 'text-status-paused bg-status-paused/10', bar: 'bg-status-paused' },
  churned: { label: 'Churn',    cls: 'text-status-danger bg-status-danger/10', bar: 'bg-status-danger' },
}

export default function ClientCard({ client }: ClientCardProps) {
  const phase   = PHASES.find(p => p.num === client.current_phase)
  const sla     = getSlaStatus(client)
  const status  = statusConfig[client.status] ?? statusConfig.paused
  const responsible = client.responsible as { name: string } | null | undefined
  const progress = Math.round(((client.current_phase - 1) / 6) * 100)

  return (
    <Link
      href={`/clientes/${client.id}`}
      className="group relative bg-brand-navy-card border border-white/8 rounded-2xl p-5 block
        transition-all duration-300 hover:border-brand-orange/30 hover:shadow-orange-lg hover:-translate-y-0.5
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange/50"
    >
      {/* Barra de progresso no topo */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-white/5 rounded-t-2xl overflow-hidden">
        <div
          className="h-full bg-orange-gradient rounded-t-2xl transition-all duration-700"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Header do card */}
      <div className="flex items-start justify-between gap-3 mb-4 mt-1">
        <div className="min-w-0 flex-1">
          <h3 className="text-white font-semibold text-sm leading-snug truncate group-hover:text-brand-orange transition-colors duration-200">
            {client.name}
          </h3>
          {client.niche && (
            <p className="text-white/40 text-xs mt-0.5 truncate">{client.niche}</p>
          )}
        </div>

        {/* Status badge */}
        <span className={`inline-flex items-center gap-1.5 text-[10px] font-semibold px-2 py-1 rounded-full flex-shrink-0 ${status.cls}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${status.bar}`} />
          {status.label}
        </span>
      </div>

      {/* Fase atual */}
      <div className="flex items-center gap-2 mb-4">
        <div className="w-7 h-7 bg-brand-orange-muted border border-brand-orange/20 rounded-lg flex items-center justify-center flex-shrink-0 text-brand-orange">
          <PhaseIcon num={client.current_phase} className="w-3.5 h-3.5" />
        </div>
        <div className="min-w-0">
          <p className="text-white text-xs font-medium leading-none">
            Fase {client.current_phase} · {phase?.label}
          </p>
          <p className="text-white/30 text-[10px] mt-0.5">{phase?.sla}</p>
        </div>
      </div>

      {/* Barra de progresso das fases */}
      <div className="flex gap-0.5 mb-4">
        {PHASES.map(p => (
          <div
            key={p.num}
            className={`flex-1 h-1 rounded-full transition-all duration-300 ${
              p.num < client.current_phase
                ? 'bg-brand-orange'
                : p.num === client.current_phase
                ? 'bg-brand-orange/50'
                : 'bg-white/8'
            }`}
          />
        ))}
      </div>

      {/* Rodapé */}
      <div className="flex items-center justify-between text-[10px] text-white/30">
        <div className="flex items-center gap-1">
          {responsible?.name && (
            <>
              <svg viewBox="0 0 16 16" fill="currentColor" className="w-3 h-3">
                <path d="M8 8a3 3 0 100-6 3 3 0 000 6zM3 14a5 5 0 0110 0H3z" />
              </svg>
              <span>{responsible.name}</span>
            </>
          )}
        </div>

        {sla && (
          <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[10px] font-medium ${sla.cls}`}>
            <span className={`w-1 h-1 rounded-full ${sla.dot}`} />
            {sla.label}
          </span>
        )}
      </div>

      {/* Seta de navegação */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-200 translate-x-1 group-hover:translate-x-0">
        <svg viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 text-brand-orange">
          <path fillRule="evenodd" d="M6.22 3.22a.75.75 0 011.06 0l4.25 4.25a.75.75 0 010 1.06l-4.25 4.25a.75.75 0 01-1.06-1.06L9.94 8 6.22 4.28a.75.75 0 010-1.06z" clipRule="evenodd" />
        </svg>
      </div>
    </Link>
  )
}
