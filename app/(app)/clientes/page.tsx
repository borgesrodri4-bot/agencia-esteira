'use client'

import { useState } from 'react'
import Link from 'next/link'
import Header from '@/components/layout/Header'
import ClientCard from '@/components/clients/ClientCard'
import { useClients } from '@/hooks/useClients'
import { PHASES } from '@/lib/phases'

export default function ClientesPage() {
  const { clients, loading } = useClients()
  const [search, setSearch] = useState('')
  const [filterPhase, setFilterPhase] = useState<number | null>(null)
  const [filterStatus, setFilterStatus] = useState<string>('all')

  const filtered = clients.filter(c => {
    if (search && !c.name.toLowerCase().includes(search.toLowerCase()) &&
        !c.niche?.toLowerCase().includes(search.toLowerCase())) return false
    if (filterPhase && c.current_phase !== filterPhase) return false
    if (filterStatus !== 'all' && c.status !== filterStatus) return false
    return true
  })

  return (
    <div className="flex-1 flex flex-col overflow-y-auto">
      <Header title="Clientes" subtitle={`${clients.length} cliente${clients.length !== 1 ? 's' : ''} cadastrado${clients.length !== 1 ? 's' : ''}`} />

      <main className="flex-1 p-6 space-y-4">
        {/* Barra de busca e filtros */}
        <div className="flex items-center gap-3 flex-wrap">
          {/* Busca */}
          <div className="relative flex-1 min-w-48">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 pointer-events-none" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
            </svg>
            <input
              type="text"
              className="input pl-9"
              placeholder="Buscar por nome ou nicho..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              aria-label="Buscar clientes"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white transition-colors cursor-pointer"
                aria-label="Limpar busca"
              >
                <svg viewBox="0 0 16 16" fill="currentColor" className="w-3.5 h-3.5">
                  <path d="M4.646 4.646a.5.5 0 01.708 0L8 7.293l2.646-2.647a.5.5 0 01.708.708L8.707 8l2.647 2.646a.5.5 0 01-.708.708L8 8.707l-2.646 2.647a.5.5 0 01-.708-.708L7.293 8 4.646 5.354a.5.5 0 010-.708z"/>
                </svg>
              </button>
            )}
          </div>

          {/* Fase */}
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

          {/* Status */}
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

          <Link href="/clientes/novo" className="btn-primary flex items-center gap-2 flex-shrink-0">
            <svg viewBox="0 0 16 16" fill="currentColor" className="w-3.5 h-3.5">
              <path d="M8 2a1 1 0 011 1v4h4a1 1 0 110 2H9v4a1 1 0 11-2 0V9H3a1 1 0 110-2h4V3a1 1 0 011-1z"/>
            </svg>
            Novo Cliente
          </Link>
        </div>

        {/* Info de resultados */}
        {(search || filterPhase || filterStatus !== 'all') && !loading && (
          <div className="flex items-center justify-between">
            <p className="text-white/30 text-xs">
              {filtered.length} de {clients.length} clientes
            </p>
            <button
              onClick={() => { setSearch(''); setFilterPhase(null); setFilterStatus('all') }}
              className="text-xs text-white/30 hover:text-brand-orange transition-colors cursor-pointer"
            >
              Limpar filtros
            </button>
          </div>
        )}

        {/* Conteúdo */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-brand-navy-card border border-white/8 rounded-2xl p-5 animate-pulse">
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
                ? 'Cadastre o primeiro cliente da Kolhey.'
                : 'Tente outros termos ou filtros.'}
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
      </main>
    </div>
  )
}
