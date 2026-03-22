import { PHASES } from '@/lib/phases'
import Link from 'next/link'

interface PhaseProgressBarProps {
  currentPhase: number
  clientId?: string
  compact?: boolean
}

export default function PhaseProgressBar({ currentPhase, clientId, compact = false }: PhaseProgressBarProps) {
  if (compact) {
    return (
      <div className="flex gap-0.5">
        {PHASES.map(phase => (
          <div
            key={phase.num}
            className={`flex-1 h-1 rounded-full transition-all duration-300 ${
              phase.num < currentPhase
                ? 'bg-brand-orange'
                : phase.num === currentPhase
                ? 'bg-brand-orange/50'
                : 'bg-white/8'
            }`}
            title={`Fase ${phase.num}: ${phase.label}`}
          />
        ))}
      </div>
    )
  }

  return (
    <div className="relative">
      {/* Linha conectora de fundo */}
      <div className="absolute top-4 left-4 right-4 h-px bg-white/8 z-0" />

      {/* Linha de progresso preenchida */}
      <div
        className="absolute top-4 left-4 h-px bg-orange-gradient z-0 transition-all duration-700"
        style={{ width: `calc(${((currentPhase - 1) / 6) * 100}% - 8px)` }}
      />

      <div className="relative z-10 flex items-start justify-between gap-1 overflow-x-auto pb-2">
        {PHASES.map(phase => {
          const isDone    = phase.num < currentPhase
          const isActive  = phase.num === currentPhase
          const isPending = phase.num > currentPhase
          const isClickable = clientId && (isDone || isActive)

          const dot = (
            <div className={`
              w-8 h-8 rounded-full flex items-center justify-center text-sm flex-shrink-0
              border-2 transition-all duration-300
              ${isDone    ? 'bg-brand-orange border-brand-orange shadow-orange'       : ''}
              ${isActive  ? 'bg-brand-navy border-brand-orange shadow-orange scale-110' : ''}
              ${isPending ? 'bg-brand-navy-card border-white/10'                      : ''}
            `}>
              {isDone ? (
                <svg viewBox="0 0 16 16" fill="currentColor" className="w-3.5 h-3.5 text-white">
                  <path fillRule="evenodd" d="M12.416 3.376a.75.75 0 01.208 1.04l-5 7.5a.75.75 0 01-1.154.114l-3-3a.75.75 0 011.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 011.04-.207z" clipRule="evenodd"/>
                </svg>
              ) : (
                <span className={`text-[10px] font-bold ${isActive ? 'text-brand-orange' : 'text-white/20'}`}>
                  {phase.num}
                </span>
              )}
            </div>
          )

          return (
            <div key={phase.num} className="flex flex-col items-center gap-2 min-w-[44px]">
              {isClickable ? (
                <Link
                  href={`/clientes/${clientId}/${phase.slug}`}
                  className="group flex flex-col items-center gap-2 focus-visible:outline-none"
                  aria-label={`Fase ${phase.num}: ${phase.label}`}
                >
                  <div className="group-hover:scale-110 transition-transform duration-200">{dot}</div>
                  <div className="text-center">
                    <p className={`text-[9px] font-semibold leading-tight ${isDone ? 'text-brand-orange/70' : 'text-brand-orange'}`}>
                      {phase.label}
                    </p>
                  </div>
                </Link>
              ) : (
                <div className="flex flex-col items-center gap-2">
                  {dot}
                  <p className={`text-[9px] font-medium leading-tight text-center ${isPending ? 'text-white/20' : 'text-white/50'}`}>
                    {phase.label}
                  </p>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
