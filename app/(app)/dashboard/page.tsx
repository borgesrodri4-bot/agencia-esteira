'use client'

import { useState } from 'react'
import Link from 'next/link'
import Header from '@/components/layout/Header'
import ClientCard from '@/components/clients/ClientCard'
import StatsBar from '@/components/dashboard/StatsBar'
import { useClients } from '@/hooks/useClients'
import { PHASES } from '@/lib/phases'

export default function DashboardPage() {
  const { clients, loading } = useClients()
  const [filterPhase, setFilterPhase] = useState<number | null>(null)
  const [filterStatus, setFilterStatus] = useState<string>('all')

  const filtered = clients.filter(c => {
    if (filterPhase && c.current_phase !== filterPhase) return false
    if (filterStatus !== 'all' && c.status !== filterStatus) return false
    return true
  })

  return (
    <div className="flex-1 flex flex-col overflow-y-auto">
      <Header title="Dashboard" subtitle="Visão geral de todos os clientes" />

      <main className="flex-1 p-6 space-y-6">
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
          <>
            <StatsBar clients={clients} />

            {/* Filtros */}
            <div className="flex items-center justify-between gap-3 flex-wrap">
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
                    <path d="M6 8L1 3h10L6 8z"/>
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
                    <path d="M6 8L1 3h10L6 8z"/>
                  </svg>
                </div>

                {(filterPhase || filterStatus !== 'all') && (
                  <button
                    onClick={() => { setFilterPhase(null); setFilterStatus('all') }}
                    className="text-xs text-white/40 hover:text-white transition-colors px-2 py-1.5 rounded-lg hover:bg-white/5 cursor-pointer"
                  >
                    Limpar filtros
                  </button>
                )}
              </div>

              <Link
                href="/clientes/novo"
                className="btn-primary flex items-center gap-2 flex-shrink-0"
              >
                <svg viewBox="0 0 16 16" fill="currentColor" className="w-3.5 h-3.5">
                  <path d="M8 2a1 1 0 011 1v4h4a1 1 0 110 2H9v4a1 1 0 11-2 0V9H3a1 1 0 110-2h4V3a1 1 0 011-1z"/>
                </svg>
                Novo Cliente
              </Link>
            </div>

            {/* Contador de resultados */}
            {(filterPhase || filterStatus !== 'all') && (
              <p className="text-white/30 text-xs -mt-3">
                {filtered.length} de {clients.length} clientes
              </p>
            )}

            {/* Grade de clientes */}
            {filtered.length === 0 ? (
              <div className="bg-brand-navy-card border border-white/8 rounded-2xl p-12 text-center">
                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mx-auto mb-4">
                  <svg viewBox="0 0 20 20" fill="currentColor" className="w-6 h-6 text-white/20">
                    <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                  </svg>
                </div>
                <p className="text-white/40 text-sm mb-1">
                  {clients.length === 0 ? 'Nenhum cliente cadastrado' : 'Nenhum resultado encontrado'}
                </p>
                <p className="text-white/20 text-xs mb-4">
                  {clients.length === 0
                    ? 'Comece cadastrando o primeiro cliente da Kolhey.'
                    : 'Tente ajustar os filtros.'}
                </p>
                {clients.length === 0 && (
                  <Link href="/clientes/novo" className="btn-primary inline-flex items-center gap-2">
                    <svg viewBox="0 0 16 16" fill="currentColor" className="w-3.5 h-3.5">
                      <path d="M8 2a1 1 0 011 1v4h4a1 1 0 110 2H9v4a1 1 0 11-2 0V9H3a1 1 0 110-2h4V3a1 1 0 011-1z"/>
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
          </>
        )}
      </main>
    </div>
  )
}
