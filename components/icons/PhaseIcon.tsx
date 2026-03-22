interface PhaseIconProps {
  num: number
  className?: string
}

const icons: Record<number, JSX.Element> = {
  1: ( // Captação — alvo
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full">
      <circle cx="10" cy="10" r="7" />
      <circle cx="10" cy="10" r="4" />
      <circle cx="10" cy="10" r="1.5" fill="currentColor" stroke="none" />
      <line x1="10" y1="3" x2="10" y2="1" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="10" y1="19" x2="10" y2="17" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="3" y1="10" x2="1" y2="10" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="19" y1="10" x2="17" y2="10" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  2: ( // Diagnóstico — lupa
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full">
      <circle cx="8.5" cy="8.5" r="5.5" />
      <line x1="12.5" y1="12.5" x2="17" y2="17" strokeLinecap="round" strokeWidth="2" />
    </svg>
  ),
  3: ( // Onboarding — foguete
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full">
      <path d="M10 2C10 2 14 4 14 9C14 12 12 14 10 15C8 14 6 12 6 9C6 4 10 2 10 2Z" />
      <circle cx="10" cy="9" r="1.5" fill="currentColor" stroke="none" />
      <path d="M7 13L5 17L8 16L10 18L12 16L15 17L13 13" strokeLinejoin="round" />
    </svg>
  ),
  4: ( // Planejamento — calendário
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full">
      <rect x="3" y="4" width="14" height="13" rx="2" />
      <line x1="3" y1="8" x2="17" y2="8" />
      <line x1="7" y1="2" x2="7" y2="6" strokeLinecap="round" />
      <line x1="13" y1="2" x2="13" y2="6" strokeLinecap="round" />
      <rect x="6.5" y="11" width="2" height="2" rx="0.5" fill="currentColor" stroke="none" />
      <rect x="11" y="11" width="2" height="2" rx="0.5" fill="currentColor" stroke="none" />
    </svg>
  ),
  5: ( // Produção — engrenagem
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full">
      <circle cx="10" cy="10" r="3" />
      <path d="M10 2v2M10 16v2M2 10h2M16 10h2M4.22 4.22l1.42 1.42M14.36 14.36l1.42 1.42M4.22 15.78l1.42-1.42M14.36 5.64l1.42-1.42" strokeLinecap="round" />
    </svg>
  ),
  6: ( // Relatório — gráfico
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full">
      <rect x="3" y="3" width="14" height="14" rx="2" />
      <line x1="7" y1="14" x2="7" y2="10" strokeLinecap="round" strokeWidth="2" />
      <line x1="10" y1="14" x2="10" y2="7" strokeLinecap="round" strokeWidth="2" />
      <line x1="13" y1="14" x2="13" y2="11" strokeLinecap="round" strokeWidth="2" />
    </svg>
  ),
  7: ( // Retenção — estrela/diamante
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full">
      <path d="M10 2L12.5 7.5L18 8.2L14 12L15.1 17.5L10 14.8L4.9 17.5L6 12L2 8.2L7.5 7.5Z" strokeLinejoin="round" />
    </svg>
  ),
}

export default function PhaseIcon({ num, className = 'w-4 h-4' }: PhaseIconProps) {
  return (
    <span className={className}>
      {icons[num] ?? (
        <svg viewBox="0 0 20 20" fill="currentColor" className="w-full h-full">
          <circle cx="10" cy="10" r="8" opacity="0.3" />
          <text x="10" y="14" textAnchor="middle" fontSize="9" fill="currentColor">{num}</text>
        </svg>
      )}
    </span>
  )
}
