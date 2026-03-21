'use client'

import { useEffect } from 'react'

export default function Error({
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
    <div className="min-h-screen bg-brand-navy flex items-center justify-center p-4">
      <div className="card-gold text-center max-w-md w-full">
        <p className="text-brand-orange text-3xl mb-3">⚠</p>
        <h2 className="text-white font-semibold text-lg mb-2">Algo deu errado</h2>
        <p className="text-white/40 text-sm mb-5">{error.message || 'Erro inesperado.'}</p>
        <button onClick={reset} className="btn-primary">
          Tentar novamente
        </button>
      </div>
    </div>
  )
}
