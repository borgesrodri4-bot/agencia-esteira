'use client'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html lang="pt-BR">
      <body style={{ background: '#1A1A1A', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', fontFamily: 'system-ui' }}>
        <div style={{ textAlign: 'center', color: '#fff', padding: '2rem' }}>
          <p style={{ color: '#C9A84C', fontSize: '2rem' }}>⚠</p>
          <h2 style={{ marginBottom: '1rem' }}>Erro crítico</h2>
          <p style={{ color: 'rgba(255,255,255,0.4)', marginBottom: '1.5rem' }}>{error.message}</p>
          <button
            onClick={reset}
            style={{ background: '#C9A84C', color: '#1A1A1A', padding: '0.5rem 1.5rem', borderRadius: '0.5rem', border: 'none', cursor: 'pointer', fontWeight: 600 }}
          >
            Recarregar
          </button>
        </div>
      </body>
    </html>
  )
}
