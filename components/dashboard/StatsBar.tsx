import type { Client } from '@/lib/types'

interface StatsBarProps {
  clients: Client[]
}

export default function StatsBar({ clients }: StatsBarProps) {
  const active  = clients.filter(c => c.status === 'active').length
  const paused  = clients.filter(c => c.status === 'paused').length
  const churned = clients.filter(c => c.status === 'churned').length

  // Clientes com SLA vencido (simplificado)
  const slaMap: Record<number, number> = {
    1: 24, 2: 72, 3: 168, 4: 360, 5: 720, 6: 120, 7: 720,
  }
  const late = clients.filter(c => {
    if (c.status !== 'active') return false
    const hours = slaMap[c.current_phase]
    if (!hours) return false
    const elapsed = (Date.now() - new Date(c.updated_at || c.started_at).getTime()) / 3600000
    return elapsed > hours
  }).length

  const stats = [
    { label: 'Total de Clientes', value: clients.length, color: 'text-white' },
    { label: 'Ativos', value: active, color: 'text-status-ok' },
    { label: 'Em Atraso', value: late, color: late > 0 ? 'text-status-danger' : 'text-white/40' },
    { label: 'Pausados', value: paused, color: 'text-status-paused' },
    { label: 'Churn', value: churned, color: churned > 0 ? 'text-status-danger' : 'text-white/40' },
  ]

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 mb-6">
      {stats.map(s => (
        <div key={s.label} className="card text-center">
          <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
          <p className="text-white/40 text-xs mt-1">{s.label}</p>
        </div>
      ))}
    </div>
  )
}
