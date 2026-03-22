'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import JaguarSVG from '@/components/icons/JaguarSVG'

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
    <div className="min-h-screen bg-brand-navy flex">
      {/* ── Painel esquerdo — formulário ── */}
      <div className="relative flex flex-col justify-center w-full max-w-md px-10 py-12 z-10">
        {/* Glow sutil */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-32 -left-32 w-64 h-64 bg-brand-orange/8 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-brand-terra/5 rounded-full blur-3xl" />
        </div>

        <div className="relative">
          {/* Logo */}
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-11 h-11 bg-orange-gradient rounded-xl flex items-center justify-center shadow-orange-lg flex-shrink-0">
                <span className="font-display text-white font-bold text-xl leading-none">K</span>
              </div>
              <div>
                {/* KOLHEY com "O" laranja — fiel ao manual */}
                <p className="font-display text-white font-bold text-2xl tracking-widest leading-none">
                  K<span className="text-brand-orange">O</span>LHEY
                </p>
                <p className="text-white/35 text-[11px] italic font-light tracking-wide mt-0.5">
                  Resultados que se cultivam
                </p>
              </div>
            </div>
          </div>

          {/* Cabeçalho do form */}
          <div className="mb-8">
            <h1 className="text-white font-semibold text-2xl leading-tight mb-1">
              Bem-vindo de volta
            </h1>
            <p className="text-white/40 text-sm">
              Entre com sua conta para acessar o painel
            </p>
          </div>

          {/* Formulário */}
          <form onSubmit={handleLogin} className="space-y-4" noValidate>
            <div>
              <label htmlFor="email" className="label">E-mail</label>
              <input
                id="email"
                type="email"
                className="input"
                placeholder="seu@email.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                autoComplete="email"
                autoFocus
              />
            </div>

            <div>
              <label htmlFor="password" className="label">Senha</label>
              <input
                id="password"
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
              <div className="flex items-center gap-2 bg-status-danger/10 border border-status-danger/25 rounded-lg px-3 py-2.5" role="alert">
                <svg viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 text-status-danger flex-shrink-0">
                  <path d="M8 1a7 7 0 100 14A7 7 0 008 1zm0 3a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 018 4zm0 8a1 1 0 110-2 1 1 0 010 2z" />
                </svg>
                <p className="text-status-danger text-sm">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full justify-center py-3 mt-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {loading ? (
                <>
                  <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Entrando...
                </>
              ) : 'Entrar'}
            </button>
          </form>

          <p className="text-center text-white/25 text-xs mt-8">
            Sem acesso? Fale com o administrador da Kolhey.
          </p>
        </div>
      </div>

      {/* ── Painel direito — visual da marca ── */}
      <div className="hidden lg:flex flex-1 relative bg-brand-navy-soft items-center justify-center overflow-hidden border-l border-white/5">
        {/* Círculo de fundo — igual ao manual de marca */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/4 w-[600px] h-[600px] rounded-full bg-brand-navy/60 border border-white/5" />

        {/* Onça-pintada — mascote da Kolhey */}
        <div className="relative z-10 flex flex-col items-center justify-center gap-8 px-16">
          <JaguarSVG className="w-80 h-auto" opacity={0.12} />

          {/* Wordmark Kolhey — fiel ao manual */}
          <div className="text-center">
            <p className="font-display text-white/80 font-bold text-5xl tracking-[0.15em] leading-none">
              K<span className="text-brand-orange">O</span>LHEY
            </p>
            <p className="text-white/30 text-sm italic font-light tracking-widest mt-3">
              Resultados que se cultivam
            </p>
          </div>
        </div>

        {/* Assinatura */}
        <p className="absolute bottom-6 right-8 text-white/15 text-xs italic font-light">
          By Kolhey
        </p>
      </div>
    </div>
  )
}
