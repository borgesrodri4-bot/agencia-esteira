import { PHASES } from '@/lib/phases'
import Link from 'next/link'

interface PhaseProgressBarProps {
  currentPhase: number
  clientId?: string  // Se fornecido, as fases viram links clicáveis
  compact?: boolean
}

export default function PhaseProgressBar({ currentPhase, clientId, compact = false }: PhaseProgressBarProps) {
  return (
    <div className="overflow-x-auto -mx-1 px-1">
    <div className={`flex items-center gap-1 ${compact ? 'flex-wrap' : 'min-w-max'}`}>
      {PHASES.map((phase, idx) => {
        const isDone = phase.num < currentPhase
        const isActive = phase.num === currentPhase
        const isPending = phase.num > currentPhase

        const cls = `
          ${compact ? 'px-2 py-1 text-xs' : 'px-3 py-2 text-xs'}
          rounded-lg font-medium transition-all duration-200 whitespace-nowrap
          ${isDone ? 'phase-done' : ''}
          ${isActive ? 'phase-active' : ''}
          ${isPending ? 'phase-pending' : ''}
        `

        const content = (
          <>
            {!compact && <span className="mr-1 opacity-70">{phase.icon}</span>}
            {compact ? `F${phase.num}` : phase.label}
          </>
        )

        if (clientId && (isDone || isActive)) {
          return (
            <Link key={phase.num} href={`/clientes/${clientId}/${phase.slug}`} className={cls}>
              {content}
            </Link>
          )
        }

        return (
          <div key={phase.num} className={cls}>
            {content}
          </div>
        )
      })}
    </div>
    </div>
  )
}
