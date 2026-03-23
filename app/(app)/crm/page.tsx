'use client'

import { useState, useMemo, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Header from '@/components/layout/Header'
import { useClients } from '@/hooks/useClients'
import { PHASES } from '@/lib/phases'

function AnimatedCounter({ value, suffix = '' }: { value: number; suffix?: string }) {
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    const duration = 1000
    const startTime = Date.now()
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      setDisplayValue(Math.floor(value * progress))
    }, 16)
    return () => clearInterval(interval)
  }, [value])

  return <span>{displayValue}{suffix}</span>
}

export default function CRMPage() {
  const { clients, loading } = useClients()
  const [selectedPhase, setSelectedPhase] = useState<number | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [viewMode, setViewMode] = useState<'kanban' | 'list'>('kanban')

  const filteredClients = useMemo(() => {
    return clients.filter(client => {
      const matchesPhase = selectedPhase === null || client.current_phase === selectedPhase
      const matchesSearch = client.name.toLowerCase().includes(searchTerm.toLowerCase())
      return matchesPhase && matchesSearch
    })
  }, [clients, selectedPhase, searchTerm])

  const clientsByPhase = useMemo(() => {
    const grouped: Record<number, typeof clients> = {}
    PHASES.forEach(phase => {
      grouped[phase.num] = filteredClients.filter(c => c.current_phase === phase.num)
    })
    return grouped
  }, [filteredClients])

  const stats = useMemo(() => {
    const total = clients.length
    const active = clients.filter(c => c.status === 'active').length
    const totalValue = clients.reduce((sum, c) => sum + (c.value || 0), 0)
    return { total, active, totalValue: Math.round(totalValue / 1000) }
  }, [clients])

  return (
    <div className="flex-1 flex flex-col overflow-y-auto bg-brand-navy">
      <Header title="CRM" subtitle="Pipeline de vendas com design brutal" />

      <main className="flex-1 p-6 space-y-8">
        {/* Bold Stats Section */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ staggerChildren: 0.1 }}
        >
          {[
            { label: 'Total de Clientes', value: stats.total, icon: '👥', color: 'orange' },
            { label: 'Clientes Ativos', value: stats.active, icon: '⚡', color: 'blue' },
            { label: 'Valor em Pipeline', value: stats.totalValue, icon: '💰', color: 'terra' },
          ].map((stat, i) => (
            <motion.div
              key={i}
              className={`relative p-6 border-4 cursor-pointer transition-all ${
                stat.color === 'orange'
                  ? 'border-brand-orange bg-brand-orange/5'
                  : stat.color === 'blue'
                  ? 'border-brand-navy bg-brand-navy/10'
                  : 'border-brand-terra bg-brand-terra/5'
              }`}
              whileHover={{ y: -8 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <motion.div
                className={`absolute -top-2 -right-2 w-12 h-12 border-4 ${
                  stat.color === 'orange' ? 'border-brand-orange' : 'border-brand-navy'
                }`}
                animate={{ opacity: 0, scale: 0.8 }}
                whileHover={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              />

              <div className="relative z-10">
                <div className="flex items-start justify-between mb-4">
                  <span className="text-4xl">{stat.icon}</span>
                  <div className={`w-1.5 h-12 ${stat.color === 'orange' ? 'bg-brand-orange' : 'bg-brand-navy'}`} />
                </div>
                <p className="text-white/60 text-xs font-black uppercase tracking-widest mb-2">{stat.label}</p>
                <p className="text-white font-display text-5xl font-black">
                  <AnimatedCounter value={stat.value} suffix={stat.label.includes('Valor') ? 'k' : ''} />
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Controls Section */}
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {/* Search and View Toggle */}
          <div className="flex gap-3 flex-col md:flex-row">
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="BUSCAR CLIENTE..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full px-4 py-4 border-4 border-brand-orange bg-brand-navy text-white placeholder:text-white/40 font-black uppercase text-sm focus:outline-none focus:bg-brand-orange/5 transition-colors"
              />
              <svg className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-orange pointer-events-none" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
              </svg>
            </div>

            {/* View toggle buttons */}
            <div className="flex gap-2">
              <button
                onClick={() => setViewMode('kanban')}
                className={`px-6 py-4 border-4 font-black uppercase text-sm transition-all ${
                  viewMode === 'kanban'
                    ? 'border-brand-orange bg-brand-orange text-brand-navy'
                    : 'border-brand-orange/30 bg-brand-navy text-brand-orange hover:border-brand-orange'
                }`}
              >
                Kanban
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`px-6 py-4 border-4 font-black uppercase text-sm transition-all ${
                  viewMode === 'list'
                    ? 'border-brand-orange bg-brand-orange text-brand-navy'
                    : 'border-brand-orange/30 bg-brand-navy text-brand-orange hover:border-brand-orange'
                }`}
              >
                Lista
              </button>
            </div>
          </div>

          {/* Phase filter buttons */}
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => setSelectedPhase(null)}
              className={`px-4 py-3 border-3 font-black uppercase text-xs transition-all ${
                selectedPhase === null
                  ? 'border-brand-orange bg-brand-orange text-brand-navy'
                  : 'border-white/20 bg-brand-navy text-white hover:border-brand-orange'
              }`}
            >
              TODAS
            </button>
            {PHASES.map(phase => (
              <button
                key={phase.num}
                onClick={() => setSelectedPhase(phase.num)}
                className={`px-4 py-3 border-3 font-black uppercase text-xs transition-all ${
                  selectedPhase === phase.num
                    ? 'border-brand-orange bg-brand-orange text-brand-navy'
                    : 'border-white/20 bg-brand-navy text-white hover:border-brand-orange'
                }`}
              >
                F{phase.num}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Content Area */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="h-48 border-4 border-white/10 bg-brand-navy-card animate-pulse" />
            ))}
          </div>
        ) : viewMode === 'kanban' ? (
          /* Kanban View */
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-max"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {PHASES.map((phase, phaseIdx) => (
              <motion.div
                key={phase.num}
                className="space-y-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: phaseIdx * 0.1 }}
              >
                {/* Phase header */}
                <div className="border-b-4 border-brand-orange pb-3">
                  <h3 className="text-white font-display font-black text-2xl">FASE {phase.num}</h3>
                  <p className="text-brand-orange font-black text-xs uppercase mt-1">
                    {clientsByPhase[phase.num]?.length || 0} CLIENTES
                  </p>
                </div>

                {/* Client cards */}
                <div className="space-y-3">
                  {(clientsByPhase[phase.num] || []).length === 0 ? (
                    <div className="text-center py-12 border-4 border-dashed border-white/10">
                      <p className="text-white/30 font-black text-sm">VAZIO</p>
                    </div>
                  ) : (
                    (clientsByPhase[phase.num] || []).map((client, idx) => (
                      <motion.div
                        key={client.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.05 }}
                      >
                        <Link href={`/clientes/${client.id}`}>
                          <motion.div
                            className="relative p-5 border-4 border-brand-orange bg-brand-navy-card overflow-hidden cursor-pointer"
                            whileHover={{
                              scale: 1.05,
                              rotate: 1,
                              boxShadow: '8px 8px 0px #f28933',
                            }}
                          >
                            <motion.div
                              className="absolute top-0 left-0 h-1 bg-brand-orange"
                              initial={{ width: 0 }}
                              whileHover={{ width: '100%' }}
                              transition={{ duration: 0.4 }}
                            />

                            <div className="relative z-10">
                              <div className="flex items-start justify-between mb-4 pb-3 border-b-2 border-brand-orange/20">
                                <h4 className="text-white font-black text-lg leading-tight group-hover:text-brand-orange transition-colors flex-1">
                                  {client.name}
                                </h4>
                                <motion.div
                                  className={`text-xs font-black px-3 py-1.5 border-2 ${
                                    client.status === 'active'
                                      ? 'border-green-500 bg-green-500/10 text-green-400'
                                      : client.status === 'paused'
                                      ? 'border-yellow-500 bg-yellow-500/10 text-yellow-400'
                                      : 'border-red-500 bg-red-500/10 text-red-400'
                                  }`}
                                  whileHover={{ scale: 1.1 }}
                                >
                                  {client.status === 'active' ? '🔥 ATIVO' : client.status === 'paused' ? '⏸ PAUSADO' : '❌ CHURN'}
                                </motion.div>
                              </div>

                              {client.value && (
                                <div className="mb-4">
                                  <p className="text-white/50 text-xs font-black uppercase mb-1">Valor</p>
                                  <p className="text-brand-orange font-display font-black text-2xl">
                                    R$ {(client.value / 1000).toFixed(1)}k
                                  </p>
                                </div>
                              )}

                              <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                  <p className="text-white/40 text-xs font-black uppercase">Progresso</p>
                                  <p className="text-brand-orange font-black text-xs">
                                    {Math.round((PHASES.findIndex(p => p.num === client.current_phase) / 7) * 100)}%
                                  </p>
                                </div>
                                <div className="h-2 border-2 border-brand-orange/30 bg-brand-navy">
                                  <motion.div
                                    className="h-full bg-brand-orange"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${(PHASES.findIndex(p => p.num === client.current_phase) / 7) * 100}%` }}
                                    transition={{ duration: 0.8, ease: 'easeOut' }}
                                  />
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        </Link>
                      </motion.div>
                    ))
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          /* List View */
          <motion.div
            className="space-y-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {filteredClients.length === 0 ? (
              <motion.div
                className="text-center py-20 border-4 border-dashed border-brand-orange/30"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <p className="text-white/40 font-black text-lg uppercase mb-4">NENHUM CLIENTE ENCONTRADO</p>
                <Link href="/clientes/novo" className="inline-block px-6 py-3 border-4 border-brand-orange bg-brand-orange text-brand-navy font-black uppercase hover:bg-brand-orange/90 transition-all">
                  + NOVO CLIENTE
                </Link>
              </motion.div>
            ) : (
              filteredClients.map((client, idx) => (
                <motion.div
                  key={client.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <Link href={`/clientes/${client.id}`}>
                    <motion.div
                      className="relative p-5 border-4 border-brand-orange bg-brand-navy-card overflow-hidden cursor-pointer"
                      whileHover={{
                        scale: 1.02,
                        boxShadow: '8px 8px 0px #f28933',
                      }}
                    >
                      <div className="relative z-10 flex items-center justify-between">
                        <div className="flex-1">
                          <h4 className="text-white font-black text-lg mb-2">{client.name}</h4>
                          <p className="text-white/50 text-sm">Fase {client.current_phase}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-brand-orange font-display font-black text-2xl">
                            R$ {(client.value / 1000).toFixed(1)}k
                          </p>
                          <p className={`text-xs font-black mt-2 ${
                            client.status === 'active'
                              ? 'text-green-400'
                              : client.status === 'paused'
                              ? 'text-yellow-400'
                              : 'text-red-400'
                          }`}>
                            {client.status === 'active' ? '🔥 ATIVO' : client.status === 'paused' ? '⏸ PAUSADO' : '❌ CHURN'}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  </Link>
                </motion.div>
              ))
            )}
          </motion.div>
        )}
      </main>
    </div>
  )
}
