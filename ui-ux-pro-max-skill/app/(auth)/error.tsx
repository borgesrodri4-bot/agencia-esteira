'use client'

import { useEffect } from 'react'

export default function AuthError({
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
    <div className="min-h-screen bg-brand-black flex items-center justify-center p-4">
      <div className="card-gold text-center max-w-md w-full">
        <p className="text-brand-gold text-3xl mb-3">⚠</p>
        <h2 className="text-white font-semibold text-lg mb-2">Erro de autenticação</h2>
        <p className="text-white/40 text-sm mb-5">{error.message}</p>
        <button onClick={reset} className="btn-primary">Tentar novamente</button>
      </div>
    </div>
  )
}
