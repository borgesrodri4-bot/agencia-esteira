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
      <Header title="Clientes" subtitle={`${clients.length} clientes cadastrados`} />

      <main className="flex-1 p-6">
        {/* Barra de busca e filtros */}
        <div className="flex items-center gap-3 mb-6 flex-wrap">
          <input
            type="text"
            className="input flex-1 min-w-48"
            placeholder="Buscar por nome ou nicho..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <select
            value={filterPhase ?? ''}
            onChange={e => setFilterPhase(e.target.value ? Number(e.target.value) : null)}
            className="input w-auto text-xs"
          >
            <option value="">Todas as fases</option>
            {PHASES.map(p => (
              <option key={p.num} value={p.num}>Fase {p.num}: {p.label}</option>
            ))}
          </select>
          <select
            value={filterStatus}
            onChange={e => setFilterStatus(e.target.value)}
            className="input w-auto text-xs"
          >
            <option value="all">Todos os status</option>
            <option value="active">Ativos</option>
            <option value="paused">Pausados</option>
            <option value="churned">Churn</option>
          </select>
          <Link href="/clientes/novo" className="btn-primary flex-shrink-0">
            + Novo Cliente
          </Link>
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-32">
            <p className="text-white/40 text-sm">Carregando...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="card text-center py-12">
            <p className="text-white/30 text-sm">
              {clients.length === 0
                ? 'Nenhum cliente cadastrado ainda.'
                : 'Nenhum cliente encontrado.'}
            </p>
            {clients.length === 0 && (
              <Link href="/clientes/novo" className="btn-primary inline-block mt-4">
                Cadastrar primeiro cliente
              </Link>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
            {filtered.map(client => (
              <ClientCard key={client.id} client={client} />
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
