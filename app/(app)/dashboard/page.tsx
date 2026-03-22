'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Header from '@/components/layout/Header'
import ClientCard from '@/components/clients/ClientCard'
import StatsBar from '@/components/dashboard/StatsBar'
import { useClients } from '@/hooks/useClients'
import { PHASES } from '@/lib/phases'
import { createClient } from '@/lib/supabase/client'

function getGreeting() {
  const h = new Date().getHours()
  if (h < 12) return 'Bom dia'
  if (h < 18) return 'Boa tarde'
  return 'Boa noite'
}

export default function DashboardPage() {
  const { clients, loading } = useClients()
  const [filterPhase, setFilterPhase]   = useState<number | null>(null)
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [userName, setUserName]         = useState('')

  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getUser().then(async ({ data: { user } }) => {
      if (!user) return
      const { data } = await supabase.from('profiles').select('name').eq('id', user.id).single()
      if (data?.name) setUserName(data.name.split(' ')[0])
    })
  }, [])

  const filtered = clients.filter(c => {
    if (filterPhase && c.current_phase !== filterPhase) return false
    if (filterStatus !== 'all' && c.status !== filterStatus) return false
    return true
  })

  const today = new Date().toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' })

  return (
    <div className="flex-1 flex flex-col overflow-y-auto">
      <Header title="Dashboard" subtitle="Visão geral de todos os clientes" />

      <main className="flex-1 p-6 space-y-6">

        {/* Banner de boas-vindas */}
        {!loading && (
          <div className="relative bg-brand-navy-card border border-white/8 rounded-2xl px-6 py-5 overflow-hidden">
            {/* Glow laranja */}
            <div className="absolute -top-8 -right-8 w-48 h-48 bg-brand-orange/8 rounded-full blur-2xl pointer-events-none" />
            <div className="relative flex items-center justify-between gap-4 flex-wrap">
              <div>
                <p className="text-white/40 text-xs mb-1 capitalize">{today}</p>
                <h2 className="text-white font-semibold text-xl leading-tight">
                  {getGreeting()}{userName ? `, ${userName}` : ''}!
                </h2>
                <p className="text-white/40 text-sm mt-0.5">
                  {clients.length === 0
                    ? 'Nenhum cliente ainda. Que tal começar?'
                    : `Você tem ${clients.filter(c => c.status === 'active').length} cliente${clients.filter(c => c.status === 'active').length !== 1 ? 's' : ''} ativo${clients.filter(c => c.status === 'active').length !== 1 ? 's' : ''} na esteira.`
                  }
                </p>
              </div>
              <Link href="/clientes/novo" className="btn-primary flex items-center gap-2 flex-shrink-0">
                <svg viewBox="0 0 16 16" fill="currentColor" className="w-3.5 h-3.5">
                  <path d="M8 2a1 1 0 011 1v4h4a1 1 0 110 2H9v4a1 1 0 11-2 0V9H3a1 1 0 110-2h4V3a1 1 0 011-1z" />
                </svg>
                Novo Cliente
              </Link>
            </div>
          </div>
        )}

        {/* Stats */}
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="bg-brand-navy-card border border-white/8 rounded-2xl p-4 animate-pulse">
                <div className="w-8 h-8 rounded-lg bg-white/5 mb-3" />
                <div className="h-8 w-12 rounded bg-white/5 mb-1" />
                <div className="h-3 w-16 rounded bg-white/5" />
              </div>
            ))}
          </div>
        ) : (
          <StatsBar clients={clients} />
        )}

        {/* Filtros */}
        {!loading && (
          <div className="flex items-center gap-2 flex-wrap">
            <div className="relative">
              <select
                value={filterPhase ?? ''}
                onChange={e => setFilterPhase(e.target.value ? Number(e.target.value) : null)}
                className="input w-auto text-xs py-2 pr-8 appearance-none cursor-pointer"
                aria-label="Filtrar por fase"
              >
                <option value="">Todas as fases</option>
                {PHASES.map(p => (
                  <option key={p.num} value={p.num}>Fase {p.num}: {p.label}</option>
                ))}
              </select>
              <svg className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3 h-3 text-white/30 pointer-events-none" viewBox="0 0 12 12" fill="currentColor">
                <path d="M6 8L1 3h10L6 8z" />
              </svg>
            </div>

            <div className="relative">
              <select
                value={filterStatus}
                onChange={e => setFilterStatus(e.target.value)}
                className="input w-auto text-xs py-2 pr-8 appearance-none cursor-pointer"
                aria-label="Filtrar por status"
              >
                <option value="all">Todos os status</option>
                <option value="active">Ativos</option>
                <option value="paused">Pausados</option>
                <option value="churned">Churn</option>
              </select>
              <svg className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3 h-3 text-white/30 pointer-events-none" viewBox="0 0 12 12" fill="currentColor">
                <path d="M6 8L1 3h10L6 8z" />
              </svg>
            </div>

            {(filterPhase || filterStatus !== 'all') && (
              <>
                <span className="text-white/25 text-xs">{filtered.length} de {clients.length}</span>
                <button
                  onClick={() => { setFilterPhase(null); setFilterStatus('all') }}
                  className="text-xs text-white/35 hover:text-brand-orange transition-colors px-2 py-1.5 rounded-lg hover:bg-brand-orange-muted cursor-pointer"
                >
                  Limpar
                </button>
              </>
            )}
          </div>
        )}

        {/* Grade de clientes */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-brand-navy-card border border-white/8 rounded-2xl p-5 animate-pulse">
                <div className="h-0.5 w-full bg-white/5 mb-5" />
                <div className="flex items-start justify-between mb-4">
                  <div className="space-y-2 flex-1">
                    <div className="h-4 w-3/4 rounded bg-white/5" />
                    <div className="h-3 w-1/2 rounded bg-white/5" />
                  </div>
                  <div className="h-5 w-14 rounded-full bg-white/5" />
                </div>
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: 7 }).map((_, j) => (
                    <div key={j} className="flex-1 h-1 rounded-full bg-white/5" />
                  ))}
                </div>
                <div className="h-3 w-1/3 rounded bg-white/5" />
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="bg-brand-navy-card border border-white/8 rounded-2xl p-16 text-center">
            <div className="w-14 h-14 rounded-2xl bg-brand-orange-muted border border-brand-orange/15 flex items-center justify-center mx-auto mb-4">
              <svg viewBox="0 0 20 20" fill="currentColor" className="w-7 h-7 text-brand-orange/50">
                <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
              </svg>
            </div>
            <p className="text-white/50 text-sm font-medium mb-1">
              {clients.length === 0 ? 'Nenhum cliente cadastrado' : 'Nenhum resultado'}
            </p>
            <p className="text-white/25 text-xs mb-5">
              {clients.length === 0 ? 'Comece cadastrando o primeiro cliente.' : 'Tente ajustar os filtros.'}
            </p>
            {clients.length === 0 && (
              <Link href="/clientes/novo" className="btn-primary inline-flex items-center gap-2">
                <svg viewBox="0 0 16 16" fill="currentColor" className="w-3.5 h-3.5">
                  <path d="M8 2a1 1 0 011 1v4h4a1 1 0 110 2H9v4a1 1 0 11-2 0V9H3a1 1 0 110-2h4V3a1 1 0 011-1z" />
                </svg>
                Cadastrar cliente
              </Link>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
            {filtered.map((client, i) => (
              <div
                key={client.id}
                className="animate-fadeIn"
                style={{ animationDelay: `${i * 40}ms`, animationFillMode: 'both' }}
              >
                <ClientCard client={client} />
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
