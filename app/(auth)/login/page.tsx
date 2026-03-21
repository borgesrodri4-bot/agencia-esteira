'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const supabase = createClient()
    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      setError('E-mail ou senha incorretos. Tente novamente.')
      setLoading(false)
      return
    }

    router.push('/dashboard')
    router.refresh()
  }

  return (
    <div className="min-h-screen bg-brand-navy flex items-center justify-center p-4">
      {/* Fundo decorativo */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-brand-orange/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-brand-terra/5 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-md">
        {/* Logo / Header */}
        <div className="text-center mb-8">
          <div className="inline-flex flex-col items-center gap-3 mb-4">
            <div className="w-14 h-14 bg-orange-gradient rounded-2xl flex items-center justify-center shadow-orange-lg">
              <span className="font-display text-white font-bold text-2xl">K</span>
            </div>
            <div>
              <p className="font-display text-white font-semibold text-2xl tracking-widest">KOLHEY</p>
              <p className="text-white/50 text-xs italic mt-0.5">Resultados que se cultivam</p>
            </div>
          </div>
          <h1 className="text-xl font-semibold text-white mb-1">Bem-vindo de volta</h1>
          <p className="text-white/50 text-sm">Entre com sua conta para acessar o painel</p>
        </div>

        {/* Card de login */}
        <div className="card-gold">
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="label">E-mail</label>
              <input
                type="email"
                className="input"
                placeholder="seu@email.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                autoComplete="email"
              />
            </div>

            <div>
              <label className="label">Senha</label>
              <input
                type="password"
                className="input"
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                autoComplete="current-password"
              />
            </div>

            {error && (
              <div className="bg-status-danger/10 border border-status-danger/30 rounded-lg px-3 py-2">
                <p className="text-status-danger text-sm">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full justify-center py-2.5 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Entrando...' : 'Entrar'}
            </button>
          </form>
        </div>

        <p className="text-center text-white/30 text-xs mt-6">
          Sem acesso? Fale com o administrador da Kolhey.
        </p>
      </div>
    </div>
  )
}
