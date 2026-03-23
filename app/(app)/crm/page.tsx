'use client'

import { useState, useMemo } from 'react'
import Header from '@/components/layout/Header'

interface Client {
  id: string
  name: string
  status: 'prospect' | 'active' | 'paused' | 'churn'
  phase: 'lead' | 'negotiation' | 'contract' | 'active'
  value: number
}

const mockClients: Client[] = [
  { id: '1', name: 'Tech Solutions', status: 'active', phase: 'active', value: 15000 },
  { id: '2', name: 'Digital Agency', status: 'active', phase: 'contract', value: 8500 },
  { id: '3', name: 'E-commerce Pro', status: 'prospect', phase: 'negotiation', value: 12000 },
  { id: '4', name: 'Marketing Hub', status: 'active', phase: 'active', value: 9800 },
  { id: '5', name: 'Startup XYZ', status: 'paused', phase: 'lead', value: 5000 },
  { id: '6', name: 'Enterprise Corp', status: 'active', phase: 'active', value: 25000 },
  { id: '7', name: 'Growth Labs', status: 'prospect', phase: 'lead', value: 7500 },
  { id: '8', name: 'Innovation Inc', status: 'active', phase: 'contract', value: 18000 },
]

const phases = [
  { id: 'lead', label: 'LEADS', color: 'from-blue-600 to-blue-700' },
  { id: 'negotiation', label: 'NEGOCIAÇÃO', color: 'from-purple-600 to-purple-700' },
  { id: 'contract', label: 'CONTRATO', color: 'from-orange-600 to-orange-700' },
  { id: 'active', label: 'ATIVO', color: 'from-green-600 to-green-700' },
]

const statusColors = {
  prospect: { bg: 'bg-blue-500', text: 'text-blue-100', badge: '🔵' },
  active: { bg: 'bg-green-500', text: 'text-green-100', badge: '🟢' },
  paused: { bg: 'bg-yellow-500', text: 'text-yellow-100', badge: '🟡' },
  churn: { bg: 'bg-red-500', text: 'text-red-100', badge: '🔴' },
}

export default function CRMPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedPhase, setSelectedPhase] = useState<string | null>(null)
  const [viewMode, setViewMode] = useState<'kanban' | 'list'>('kanban')

  const filteredClients = useMemo(() => {
    return mockClients.filter(client => {
      const matchesSearch = client.name.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesPhase = !selectedPhase || client.phase === selectedPhase
      return matchesSearch && matchesPhase
    })
  }, [searchTerm, selectedPhase])

  const stats = useMemo(() => ({
    total: mockClients.length,
    active: mockClients.filter(c => c.status === 'active').length,
    pipeline: mockClients.reduce((sum, c) => sum + c.value, 0),
  }), [])

  const clientsByPhase = useMemo(() => {
    return phases.map(phase => ({
      ...phase,
      clients: filteredClients.filter(c => c.phase === phase.id),
    }))
  }, [filteredClients])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900">
      <Header />
      
      <main className="p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-7xl font-black text-white mb-2 tracking-tighter" style={{ letterSpacing: '-0.02em' }}>
              CRM KANBAN
            </h1>
            <div className="h-1 w-40 bg-gradient-to-r from-orange-500 to-orange-600 mb-6"></div>
            <p className="text-white/70 text-lg font-medium">Gestão de pipeline de vendas em tempo real</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 mb-12">
            {[
              { label: 'TOTAL DE CLIENTES', value: stats.total, icon: '👥' },
              { label: 'CLIENTES ATIVOS', value: stats.active, icon: '🚀' },
              { label: 'PIPELINE', value: `R$ ${(stats.pipeline / 1000).toFixed(0)}K`, icon: '💰' },
            ].map((stat, i) => (
              <div
                key={i}
                className="border-4 border-orange-500 bg-gradient-to-br from-slate-800 to-slate-900 p-8 hover:shadow-2xl hover:shadow-orange-500/20 transition-all duration-300 transform hover:scale-105"
              >
                <div className="text-5xl mb-4">{stat.icon}</div>
                <p className="text-white/60 text-sm font-black tracking-widest mb-3">{stat.label}</p>
                <p className="text-5xl font-black text-white tracking-tighter">{stat.value}</p>
              </div>
            ))}
          </div>

          {/* Controls */}
          <div className="mb-8 space-y-4">
            {/* Search */}
            <div className="relative">
              <input
                type="text"
                placeholder="BUSCAR CLIENTE..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-slate-800 border-4 border-orange-500 text-white placeholder-white/40 px-6 py-4 font-black tracking-wider focus:outline-none focus:shadow-lg focus:shadow-orange-500/30 transition-all"
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 text-2xl">🔍</div>
            </div>

            {/* Phase Filter */}
            <div className="flex gap-3 flex-wrap">
              <button
                onClick={() => setSelectedPhase(null)}
                className={`px-6 py-3 font-black tracking-wider border-3 transition-all ${
                  selectedPhase === null
                    ? 'bg-white text-slate-950 border-white'
                    : 'bg-slate-800 text-white border-white/30 hover:border-white'
                }`}
              >
                TODAS AS FASES
              </button>
              {phases.map(phase => (
                <button
                  key={phase.id}
                  onClick={() => setSelectedPhase(phase.id)}
                  className={`px-6 py-3 font-black tracking-wider border-3 transition-all ${
                    selectedPhase === phase.id
                      ? `bg-gradient-to-r ${phase.color} text-white border-white`
                      : 'bg-slate-800 text-white border-white/30 hover:border-white'
                  }`}
                >
                  {phase.label}
                </button>
              ))}
            </div>

            {/* View Mode */}
            <div className="flex gap-3">
              {[
                { mode: 'kanban', label: '📊 KANBAN' },
                { mode: 'list', label: '📋 LISTA' },
              ].map(({ mode, label }) => (
                <button
                  key={mode}
                  onClick={() => setViewMode(mode as 'kanban' | 'list')}
                  className={`px-6 py-3 font-black tracking-wider border-3 transition-all ${
                    viewMode === mode
                      ? 'bg-orange-500 text-white border-orange-600'
                      : 'bg-slate-800 text-white border-white/30 hover:border-white'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Kanban View */}
          {viewMode === 'kanban' && (
            <div className="grid grid-cols-4 gap-6">
              {clientsByPhase.map(phase => (
                <div key={phase.id} className="space-y-4">
                  {/* Column Header */}
                  <div className={`bg-gradient-to-r ${phase.color} p-4 border-4 border-white`}>
                    <h2 className="text-white font-black text-lg tracking-wider">{phase.label}</h2>
                    <p className="text-white/80 font-black text-2xl mt-2">{phase.clients.length}</p>
                  </div>

                  {/* Cards */}
                  <div className="space-y-3">
                    {phase.clients.map(client => (
                      <div
                        key={client.id}
                        className="bg-slate-800 border-4 border-orange-500 p-4 hover:shadow-xl hover:shadow-orange-500/40 transition-all transform hover:scale-105 cursor-pointer group relative overflow-hidden"
                      >
                        {/* Animated background line */}
                        <div className="absolute inset-0 h-1 bg-gradient-to-r from-orange-500 to-orange-600 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>

                        <div className="relative">
                          <div className="flex items-start justify-between mb-3">
                            <h3 className="font-black text-white text-sm tracking-wider flex-1">{client.name}</h3>
                            <span className="text-2xl">{statusColors[client.status].badge}</span>
                          </div>

                          <div className="space-y-2">
                            <p className="text-white/60 text-xs font-black tracking-widest">
                              {statusColors[client.status].badge} {client.status.toUpperCase()}
                            </p>
                            <p className="text-orange-400 font-black text-lg">R$ {(client.value / 1000).toFixed(1)}K</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* List View */}
          {viewMode === 'list' && (
            <div className="space-y-3">
              {filteredClients.map(client => (
                <div
                  key={client.id}
                  className="bg-slate-800 border-4 border-orange-500 p-6 hover:shadow-xl hover:shadow-orange-500/40 transition-all transform hover:scale-105 cursor-pointer flex items-center justify-between group"
                >
                  <div className="flex-1">
                    <h3 className="font-black text-white text-lg tracking-wider mb-2">{client.name}</h3>
                    <div className="flex gap-4 text-sm">
                      <span className="text-white/60 font-black">
                        {statusColors[client.status].badge} {client.status.toUpperCase()}
                      </span>
                      <span className="text-white/60 font-black">
                        📍 {phases.find(p => p.id === client.phase)?.label}
                      </span>
                      <span className="text-orange-400 font-black">R$ {(client.value / 1000).toFixed(1)}K</span>
                    </div>
                  </div>
                  <div className="text-3xl group-hover:translate-x-2 transition-transform">→</div>
                </div>
              ))}
            </div>
          )}

          {/* Empty State */}
          {filteredClients.length === 0 && (
            <div className="text-center py-16 border-4 border-dashed border-white/20">
              <p className="text-white/60 font-black text-lg tracking-wider">NENHUM CLIENTE ENCONTRADO</p>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
