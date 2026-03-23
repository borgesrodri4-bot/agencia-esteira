'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Header from '@/components/layout/Header'
import { useClients } from '@/hooks/useClients'
import { PHASES } from '@/lib/phases'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
}

const cardHoverVariants = {
  rest: { boxShadow: '0 0 0 1px rgba(242,137,51,0.1)' },
  hover: {
    boxShadow: '0 0 0 2px rgba(242,137,51,0.3), 0 8px 32px rgba(242,137,51,0.15)',
    transition: { duration: 0.3 },
  },
}

export default function CRMPage() {
  const { clients, loading } = useClients()
  const [selectedPhase, setSelectedPhase] = useState<number | null>(null)
  const [searchTerm, setSearchTerm] = useState('')

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
    return { total, active, totalValue }
  }, [clients])

  return (
    <div className="flex-1 flex flex-col overflow-y-auto">
      <Header title="CRM" subtitle="Gerencie sua esteira de vendas com elegância" />

      <main className="flex-1 p-6 space-y-6">
        {/* Stats Section */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {[
            { label: 'Total de Clientes', value: stats.total, icon: '👥' },
            { label: 'Clientes Ativos', value: stats.active, icon: '⚡' },
            { label: 'Valor em Pipeline', value: `R$ ${(stats.totalValue / 1000).toFixed(1)}k`, icon: '💰' },
          ].map((stat, i) => (
            <motion.div
              key={i}
              className="relative rounded-2xl p-6 overflow-hidden border border-brand-orange/10"
              style={{
                background: 'linear-gradient(135deg, rgba(15,47,72,0.8) 0%, rgba(26,61,84,0.6) 100%)',
                backdropFilter: 'blur(10px)',
              }}
              variants={itemVariants}
              whileHover={{ y: -4 }}
            >
              {/* Glow effect */}
              <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full blur-3xl pointer-events-none"
                style={{ background: 'rgba(242,137,51,0.1)' }} />

              <div className="relative">
                <div className="flex items-start justify-between mb-3">
                  <span className="text-3xl">{stat.icon}</span>
                  <div className="w-1 h-8 bg-orange-gradient rounded-full" />
                </div>
                <p className="text-white/50 text-xs font-medium uppercase tracking-wide mb-1">{stat.label}</p>
                <p className="text-white font-display text-3xl font-bold">{stat.value}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Filters Section */}
        <motion.div
          className="flex items-center gap-3 flex-wrap"
          variants={itemVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="relative flex-1 min-w-[200px]">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 pointer-events-none" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
            </svg>
            <input
              type="text"
              placeholder="Buscar cliente..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-brand-navy-card border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-brand-orange/50 transition-colors"
            />
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => setSelectedPhase(null)}
              className={`px-4 py-2.5 rounded-xl font-medium text-sm transition-all ${
                selectedPhase === null
                  ? 'bg-brand-orange text-white'
                  : 'bg-brand-navy-card border border-white/10 text-white/60 hover:text-white hover:border-white/20'
              }`}
            >
              Todas as fases
            </button>
            {PHASES.slice(0, 3).map(phase => (
              <button
                key={phase.num}
                onClick={() => setSelectedPhase(phase.num)}
                className={`px-4 py-2.5 rounded-xl font-medium text-sm transition-all ${
                  selectedPhase === phase.num
                    ? 'bg-brand-orange text-white'
                    : 'bg-brand-navy-card border border-white/10 text-white/60 hover:text-white hover:border-white/20'
                }`}
              >
                Fase {phase.num}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Kanban Board */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="bg-brand-navy-card border border-white/8 rounded-2xl p-4 animate-pulse">
                <div className="h-6 w-24 rounded bg-white/5 mb-4" />
                <div className="space-y-3">
                  {Array.from({ length: 2 }).map((_, j) => (
                    <div key={j} className="h-24 rounded-lg bg-white/5" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-max"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {PHASES.map(phase => (
              <motion.div key={phase.num} className="space-y-3" variants={itemVariants}>
                {/* Phase Header */}
                <div className="flex items-center justify-between px-1">
                  <h3 className="text-white font-display font-bold text-lg">Fase {phase.num}</h3>
                  <span className="text-xs font-medium text-white/40 bg-brand-navy-card px-2.5 py-1 rounded-full">
                    {clientsByPhase[phase.num]?.length || 0}
                  </span>
                </div>

                {/* Phase Cards */}
                <div className="space-y-3">
                  {(clientsByPhase[phase.num] || []).length === 0 ? (
                    <div className="text-center py-8 text-white/20 text-sm">
                      Nenhum cliente
                    </div>
                  ) : (
                    (clientsByPhase[phase.num] || []).map((client, idx) => (
                      <motion.div
                        key={client.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        whileHover="hover"
                        variants={cardHoverVariants}
                        className="group cursor-pointer"
                      >
                        <Link href={`/clientes/${client.id}`}>
                          <div
                            className="rounded-xl p-4 border border-brand-orange/10 transition-all overflow-hidden"
                            style={{
                              background: 'linear-gradient(135deg, rgba(35,84,117,0.4) 0%, rgba(26,61,84,0.3) 100%)',
                              backdropFilter: 'blur(8px)',
                            }}
                          >
                            {/* Top accent line */}
                            <div className="absolute top-0 left-0 right-0 h-0.5 bg-orange-gradient opacity-0 group-hover:opacity-100 transition-opacity" />

                            <div className="relative">
                              {/* Client Name */}
                              <h4 className="text-white font-semibold text-sm mb-2 truncate group-hover:text-brand-orange transition-colors">
                                {client.name}
                              </h4>

                              {/* Status Badge */}
                              <div className="flex items-center gap-2 mb-3">
                                <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                                  client.status === 'active'
                                    ? 'bg-green-500/20 text-green-300'
                                    : client.status === 'paused'
                                    ? 'bg-yellow-500/20 text-yellow-300'
                                    : 'bg-red-500/20 text-red-300'
                                }`}>
                                  {client.status === 'active' ? 'Ativo' : client.status === 'paused' ? 'Pausado' : 'Churn'}
                                </span>
                              </div>

                              {/* Value */}
                              {client.value && (
                                <p className="text-brand-orange font-display font-bold text-base">
                                  R$ {(client.value / 1000).toFixed(1)}k
                                </p>
                              )}

                              {/* Progress bar */}
                              <div className="mt-3 h-1 bg-white/10 rounded-full overflow-hidden">
                                <motion.div
                                  className="h-full bg-orange-gradient"
                                  initial={{ width: 0 }}
                                  animate={{ width: `${(phase.num / 7) * 100}%` }}
                                  transition={{ duration: 0.6, ease: 'easeOut' }}
                                />
                              </div>
                            </div>
                          </div>
                        </Link>
                      </motion.div>
                    ))
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Empty State */}
        {!loading && filteredClients.length === 0 && (
          <motion.div
            className="text-center py-16"
            variants={itemVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="w-16 h-16 rounded-2xl bg-brand-orange-muted border border-brand-orange/15 flex items-center justify-center mx-auto mb-4">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-8 h-8 text-brand-orange/50">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <p className="text-white/50 font-medium mb-2">Nenhum cliente encontrado</p>
            <p className="text-white/25 text-sm mb-4">Tente ajustar os filtros ou criar um novo cliente</p>
            <Link href="/clientes/novo" className="btn-primary inline-flex items-center gap-2">
              <svg viewBox="0 0 16 16" fill="currentColor" className="w-3.5 h-3.5">
                <path d="M8 2a1 1 0 011 1v4h4a1 1 0 110 2H9v4a1 1 0 11-2 0V9H3a1 1 0 110-2h4V3a1 1 0 011-1z" />
              </svg>
              Novo Cliente
            </Link>
          </motion.div>
        )}
      </main>
    </div>
  )
}
