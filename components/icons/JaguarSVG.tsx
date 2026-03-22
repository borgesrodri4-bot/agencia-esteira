interface JaguarSVGProps {
  className?: string
  opacity?: number
}

export default function JaguarSVG({ className = '', opacity = 0.07 }: JaguarSVGProps) {
  return (
    <svg
      viewBox="0 0 480 560"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ opacity }}
      aria-hidden="true"
    >
      {/* Orelha esquerda */}
      <path d="M120 130 L80 45 L165 95 Z" fill="white" />
      <path d="M120 122 L92 58 L155 100 Z" fill="#0f2f48" />

      {/* Orelha direita */}
      <path d="M310 110 L360 30 L395 110 Z" fill="white" />
      <path d="M318 105 L358 46 L385 105 Z" fill="#0f2f48" />

      {/* Cabeça principal */}
      <ellipse cx="245" cy="240" rx="165" ry="155" fill="white" />

      {/* Focinho / muzzle */}
      <ellipse cx="245" cy="310" rx="75" ry="55" fill="white" />
      <ellipse cx="245" cy="318" rx="60" ry="42" fill="#1a3d54" opacity="0.3" />

      {/* Nariz */}
      <path d="M230 285 Q245 275 260 285 Q252 298 238 298 Z" fill="white" opacity="0.6" />

      {/* Linhas do focinho */}
      <line x1="245" y1="298" x2="245" y2="325" stroke="white" strokeWidth="2" opacity="0.4" />
      <line x1="245" y1="312" x2="210" y2="322" stroke="white" strokeWidth="1.5" opacity="0.3" />
      <line x1="245" y1="312" x2="280" y2="322" stroke="white" strokeWidth="1.5" opacity="0.3" />

      {/* Bigodes */}
      <line x1="175" y1="308" x2="215" y2="318" stroke="white" strokeWidth="1.5" opacity="0.4" />
      <line x1="168" y1="320" x2="212" y2="322" stroke="white" strokeWidth="1.5" opacity="0.4" />
      <line x1="172" y1="332" x2="213" y2="328" stroke="white" strokeWidth="1.5" opacity="0.4" />
      <line x1="278" y1="318" x2="316" y2="308" stroke="white" strokeWidth="1.5" opacity="0.4" />
      <line x1="280" y1="322" x2="320" y2="320" stroke="white" strokeWidth="1.5" opacity="0.4" />
      <line x1="279" y1="328" x2="316" y2="332" stroke="white" strokeWidth="1.5" opacity="0.4" />

      {/* Olho esquerdo */}
      <ellipse cx="185" cy="218" rx="28" ry="20" fill="#0f2f48" />
      <ellipse cx="185" cy="218" rx="22" ry="15" fill="white" opacity="0.15" />
      <ellipse cx="185" cy="218" rx="12" ry="14" fill="#0f2f48" />
      <ellipse cx="185" cy="218" rx="8" ry="10" fill="white" opacity="0.08" />
      <ellipse cx="179" cy="213" rx="3" ry="3" fill="white" opacity="0.5" />

      {/* Olho direito */}
      <ellipse cx="305" cy="218" rx="28" ry="20" fill="#0f2f48" />
      <ellipse cx="305" cy="218" rx="22" ry="15" fill="white" opacity="0.15" />
      <ellipse cx="305" cy="218" rx="12" ry="14" fill="#0f2f48" />
      <ellipse cx="305" cy="218" rx="8" ry="10" fill="white" opacity="0.08" />
      <ellipse cx="299" cy="213" rx="3" ry="3" fill="white" opacity="0.5" />

      {/* Marcas da testa — listras centrais */}
      <path d="M235 130 Q240 115 245 130" stroke="white" strokeWidth="3" fill="none" opacity="0.5" />
      <path d="M245 130 Q250 115 255 130" stroke="white" strokeWidth="3" fill="none" opacity="0.5" />
      <path d="M225 145 Q232 128 240 145" stroke="white" strokeWidth="2.5" fill="none" opacity="0.4" />
      <path d="M250 145 Q258 128 265 145" stroke="white" strokeWidth="2.5" fill="none" opacity="0.4" />

      {/* Manchas roseta — característica da onça-pintada */}
      {/* Lado esquerdo */}
      <ellipse cx="145" cy="178" rx="16" ry="11" fill="#0f2f48" opacity="0.5" />
      <ellipse cx="145" cy="178" rx="10" ry="6" fill="#0f2f48" opacity="0.3" />

      <ellipse cx="148" cy="262" rx="18" ry="13" fill="#0f2f48" opacity="0.45" />
      <ellipse cx="148" cy="262" rx="10" ry="7" fill="#0f2f48" opacity="0.25" />

      <ellipse cx="170" cy="320" rx="14" ry="10" fill="#0f2f48" opacity="0.4" />

      {/* Lado direito */}
      <ellipse cx="345" cy="178" rx="16" ry="11" fill="#0f2f48" opacity="0.5" />
      <ellipse cx="345" cy="178" rx="10" ry="6" fill="#0f2f48" opacity="0.3" />

      <ellipse cx="342" cy="262" rx="18" ry="13" fill="#0f2f48" opacity="0.45" />
      <ellipse cx="342" cy="262" rx="10" ry="7" fill="#0f2f48" opacity="0.25" />

      <ellipse cx="320" cy="320" rx="14" ry="10" fill="#0f2f48" opacity="0.4" />

      {/* Manchas superiores */}
      <ellipse cx="210" cy="163" rx="13" ry="9" fill="#0f2f48" opacity="0.4" />
      <ellipse cx="280" cy="163" rx="13" ry="9" fill="#0f2f48" opacity="0.4" />

      {/* Pescoço / corpo */}
      <path d="M130 360 Q135 410 160 440 Q200 480 245 490 Q290 480 330 440 Q355 410 360 360 Q330 390 245 395 Q160 390 130 360 Z" fill="white" opacity="0.9" />

      {/* Manchas no pescoço */}
      <ellipse cx="192" cy="395" rx="15" ry="10" fill="#0f2f48" opacity="0.35" />
      <ellipse cx="245" cy="420" rx="18" ry="11" fill="#0f2f48" opacity="0.3" />
      <ellipse cx="298" cy="395" rx="15" ry="10" fill="#0f2f48" opacity="0.35" />

      {/* Contorno da cabeça */}
      <ellipse cx="245" cy="240" rx="165" ry="155" stroke="white" strokeWidth="1.5" fill="none" opacity="0.3" />

      {/* Linha do queixo */}
      <path d="M185 355 Q245 380 305 355" stroke="white" strokeWidth="1.5" fill="none" opacity="0.3" />
    </svg>
  )
}
