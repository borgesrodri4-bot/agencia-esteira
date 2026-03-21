'use client'

import { useEffect } from 'react'
import Link from 'next/link'

export default function AppError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex-1 flex items-center justify-center p-6">
      <div className="card-gold text-center max-w-md w-full">
        <p className="text-brand-gold text-3xl mb-3">⚠</p>
        <h2 className="text-white font-semibold text-lg mb-2">Algo deu errado</h2>
        <p className="text-white/40 text-sm mb-5">{error.message || 'Erro inesperado na página.'}</p>
        <div className="flex gap-3 justify-center">
          <button onClick={reset} className="btn-primary">Tentar novamente</button>
          <Link href="/dashboard" className="btn-ghost">Ir ao Dashboard</Link>
        </div>
      </div>
    </div>
  )
}
