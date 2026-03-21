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

      <main className="flex-1 p-6">
        {loading ? (
          <div className="flex items-center justify-center h-32">
            <p className="text-white/40 text-sm">Carregando...</p>
          </div>
        ) : (
          <>
            <StatsBar clients={clients} />

            {/* Filtros + botão novo */}
            <div className="flex items-center justify-between gap-3 mb-4 flex-wrap">
              <div className="flex items-center gap-2 flex-wrap">
                <select
                  value={filterPhase ?? ''}
                  onChange={e => setFilterPhase(e.target.value ? Number(e.target.value) : null)}
                  className="input w-auto text-xs py-1.5"
                >
                  <option value="">Todas as fases</option>
                  {PHASES.map(p => (
                    <option key={p.num} value={p.num}>Fase {p.num}: {p.label}</option>
                  ))}
                </select>

                <select
                  value={filterStatus}
                  onChange={e => setFilterStatus(e.target.value)}
                  className="input w-auto text-xs py-1.5"
                >
                  <option value="all">Todos os status</option>
                  <option value="active">Ativos</option>
                  <option value="paused">Pausados</option>
                  <option value="churned">Churn</option>
                </select>
              </div>

              <Link href="/clientes/novo" className="btn-primary">
                + Novo Cliente
              </Link>
            </div>

            {/* Grade de clientes */}
            {filtered.length === 0 ? (
              <div className="card text-center py-12">
                <p className="text-white/30 text-sm">
                  {clients.length === 0
                    ? 'Nenhum cliente cadastrado. Clique em "+ Novo Cliente" para começar.'
                    : 'Nenhum cliente encontrado para os filtros selecionados.'}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
                {filtered.map(client => (
                  <ClientCard key={client.id} client={client} />
                ))}
              </div>
            )}
          </>
        )}
      </main>
    </div>
  )
}
