import Link from 'next/link'
import PhaseProgressBar from './PhaseProgressBar'
import { PHASES } from '@/lib/phases'
import type { Client } from '@/lib/types'

interface ClientCardProps {
  client: Client
}

const slaMap: Record<number, number> = {
  1: 24, 2: 72, 3: 168, 4: 360, 5: 720, 6: 120, 7: 720,
}

function getSlaStatus(client: Client): { label: string; cls: string } | null {
  if (client.status !== 'active') return null
  const slaHours = slaMap[client.current_phase]
  if (!slaHours) return null

  const startDate = new Date(client.updated_at || client.started_at)
  const hoursElapsed = (Date.now() - startDate.getTime()) / 3600000
  const pct = hoursElapsed / slaHours

  if (pct >= 1) return { label: 'SLA vencido', cls: 'badge-danger' }
  if (pct >= 0.75) return { label: 'SLA próximo', cls: 'badge-warning' }
  return { label: 'No prazo', cls: 'badge-ok' }
}

const statusBadges: Record<string, { label: string; cls: string }> = {
  active:  { label: 'Ativo', cls: 'badge-ok' },
  paused:  { label: 'Pausado', cls: 'badge-paused' },
  churned: { label: 'Churn', cls: 'badge-danger' },
}

export default function ClientCard({ client }: ClientCardProps) {
  const phase = PHASES.find(p => p.num === client.current_phase)
  const sla = getSlaStatus(client)
  const statusBadge = statusBadges[client.status] ?? { label: client.status, cls: 'badge-paused' }
  const responsible = client.responsible as { name: string } | null | undefined

  return (
    <Link
      href={`/clientes/${client.id}`}
      className="card hover:border-brand-orange/40 hover:shadow-orange-lg transition-all duration-200 block"
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="min-w-0">
          <h3 className="text-white font-semibold text-sm truncate">{client.name}</h3>
          {client.niche && (
            <p className="text-white/40 text-xs mt-0.5 truncate">{client.niche}</p>
          )}
        </div>
        <div className="flex gap-1.5 flex-shrink-0 flex-wrap justify-end">
          <span className={statusBadge.cls}>{statusBadge.label}</span>
          {sla && <span className={sla.cls}>{sla.label}</span>}
        </div>
      </div>

      <div className="mb-3">
        <PhaseProgressBar currentPhase={client.current_phase} compact />
      </div>

      <div className="flex items-center justify-between text-xs text-white/40">
        <span>{phase?.icon} Fase {client.current_phase}: {phase?.label}</span>
        {responsible?.name && <span>👤 {responsible.name}</span>}
      </div>
    </Link>
  )
}
