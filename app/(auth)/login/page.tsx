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
    <div className="min-h-screen flex" style={{ backgroundColor: '#0f2f48' }}>

      {/* ── PAINEL ESQUERDO — formulário ── */}
      <div className="relative flex flex-col justify-between w-full max-w-[480px] px-12 py-10 z-10 flex-shrink-0">

        {/* Topo: wordmark */}
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 overflow-hidden border border-brand-orange/25"
              style={{ backgroundColor: '#081e30' }}>
              <Image src="/onca-transparent.png" alt="Kolhey" width={40} height={40} className="w-full h-full object-contain p-0.5" priority />
            </div>
            <div>
              <p className="font-display text-white font-bold text-xl tracking-[0.2em] leading-none">
                K<span className="text-brand-orange">O</span>LHEY
              </p>
              <p className="text-white/30 text-[10px] italic font-light tracking-widest mt-0.5">
                Resultad<span className="text-brand-orange">o</span>s que se cultivam
              </p>
            </div>
          </div>
        </div>

        {/* Centro: form */}
        <div className="flex-1 flex flex-col justify-center py-12">
          {/* Título */}
          <div className="mb-8">
            <h1 className="font-display text-white font-bold text-3xl tracking-wide leading-tight mb-2">
              Bem-vindo<br />de volta
            </h1>
            <div className="w-8 h-0.5 bg-brand-orange rounded-full mb-4" />
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
        </div>

        {/* Rodapé */}
        <p className="text-white/20 text-xs">
          Sem acesso? Fale com o administrador da Kolhey.
        </p>
      </div>

      {/* ── PAINEL DIREITO — identidade visual ── */}
      <div className="hidden lg:flex flex-1 relative overflow-hidden" style={{ backgroundColor: '#0a2236' }}>

        {/* Linha divisória laranja */}
        <div className="absolute left-0 top-0 bottom-0 w-px bg-brand-orange/20" />

        {/* Círculo de fundo — elemento compositivo */}
        <div className="absolute right-[-20%] top-1/2 -translate-y-1/2 w-[110%] aspect-square rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.015) 50%, transparent 70%)' }} />

        {/* Jaguar — tratamento dark/monolítico como na identidade visual */}
        <div className="absolute right-[-8%] top-1/2 -translate-y-[52%] w-[82%] aspect-square pointer-events-none select-none">
          <Image
            src="/onca-transparent.png"
            alt=""
            fill
            className="object-contain"
            style={{
              filter: 'brightness(0.22) sepia(1) hue-rotate(188deg) saturate(2.5)',
              opacity: 0.95,
            }}
            aria-hidden="true"
            priority
          />
        </div>

        {/* Wordmark principal — editorial, grande */}
        <div className="absolute bottom-16 left-12 z-10">
          <p className="font-display text-white font-bold leading-none tracking-[0.12em]"
            style={{ fontSize: 'clamp(3.5rem, 6vw, 5.5rem)' }}>
            K<span className="text-brand-orange">O</span>LHEY
          </p>
          <p className="text-white/40 text-base italic font-light tracking-widest mt-3">
            Resultad<span className="text-brand-orange">o</span>s que se cultivam
          </p>
        </div>

        {/* Assinatura script */}
        <p className="absolute bottom-6 right-8 text-white/15 text-xs italic font-light" style={{ fontFamily: 'cursive' }}>
          By Kolhey
        </p>
      </div>

    </div>
  )
}
