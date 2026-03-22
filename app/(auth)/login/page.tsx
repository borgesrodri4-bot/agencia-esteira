'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { createClient } from '@/lib/supabase/client'

export default function LoginPage() {
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading]   = useState(false)
  const [error, setError]       = useState('')
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
        {/* Glows */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-32 -left-32 w-64 h-64 bg-brand-orange/8 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-brand-terra/5 rounded-full blur-3xl" />
        </div>

        <div className="relative">
          {/* Logo */}
          <div className="mb-10 flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl overflow-hidden shadow-orange-lg flex-shrink-0 border border-brand-orange/20">
              <Image
                src="/onca-kolhey.jpg"
                alt="Logo Kolhey"
                width={48}
                height={48}
                className="w-full h-full object-cover"
                priority
              />
            </div>
            <div>
              <p className="font-display text-white font-bold text-2xl tracking-widest leading-none">
                K<span className="text-brand-orange">O</span>LHEY
              </p>
              <p className="text-white/35 text-[11px] italic font-light tracking-wide mt-0.5">
                Resultados que se cultivam
              </p>
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
                id="email" type="email" className="input"
                placeholder="seu@email.com" value={email}
                onChange={e => setEmail(e.target.value)}
                required autoComplete="email" autoFocus
              />
            </div>

            <div>
              <label htmlFor="password" className="label">Senha</label>
              <input
                id="password" type="password" className="input"
                placeholder="••••••••" value={password}
                onChange={e => setPassword(e.target.value)}
                required autoComplete="current-password"
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
              type="submit" disabled={loading}
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

      {/* ── Painel direito — onça Kolhey ── */}
      <div className="hidden lg:flex flex-1 relative items-center justify-center overflow-hidden border-l border-white/5 bg-brand-navy-soft">
        {/* Glow laranja de fundo */}
        <div className="absolute inset-0 bg-gradient-to-br from-brand-orange/5 via-transparent to-brand-navy pointer-events-none" />

        {/* Logo onça — centralizada e grande */}
        <div className="relative z-10 flex flex-col items-center gap-8">
          <div className="w-80 h-80 rounded-full overflow-hidden shadow-orange-lg border-2 border-brand-orange/20 ring-4 ring-brand-orange/8">
            <Image
              src="/onca-kolhey.jpg"
              alt="Onça Kolhey"
              width={320}
              height={320}
              className="w-full h-full object-cover"
              priority
            />
          </div>

          {/* Wordmark abaixo da logo */}
          <div className="text-center">
            <p className="font-display text-white/85 font-bold text-5xl tracking-[0.15em] leading-none">
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
