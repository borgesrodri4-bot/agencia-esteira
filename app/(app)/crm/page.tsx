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
    const duration = 1500
    const startTime = Date.now()
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      setDisplayValue(Math.floor(value * progress))
    }, 16)
    return () => clearInterval(interval)
  }, [value])
  
  return <span className="font-black">{displayValue}{suffix}</span>
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

  const stats = useMemo(() => ({
    total: clients.length,
    active: clients.filter(c => c.status === 'active').length,
    pipeline: clients.reduce((sum, c) => sum + (c.value || 0), 0)
  }), [clients])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950">
      <Header />
      
      <main className="p-6 md:p-8">
        <div className="max-w-7xl mx-auto">
          {/* HEADER */}
          <motion.div 
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <h1 className="text-5xl md:text-6xl font-black text-white mb-2 tracking-tighter">
              CRM KANBAN
            </h1>
            <div className="h-1 w-32 bg-gradient-to-r from-orange-500 to-orange-600"></div>
          </motion.div>

          {/* STATS */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
          >
            {[
              { label: 'TOTAL DE CLIENTES', value: stats.total, icon: '👥', color: 'from-blue-600 to-blue-700' },
              { label: 'CLIENTES ATIVOS', value: stats.active, icon: '🔥', color: 'from-orange-600 to-orange-700' },
              { label: 'VALOR EM PIPELINE', value: `R$ ${(stats.pipeline / 1000).toFixed(0)}K`, icon: '💰', color: 'from-green-600 to-green-700' }
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                className={`bg-gradient-to-br ${stat.color} p-8 border-4 border-white/20 hover:border-white/40 transition-all duration-300 group cursor-pointer`}
              >
                <div className="flex items-start justify-between mb-4">
                  <span className="text-4xl">{stat.icon}</span>
                  <div className="w-16 h-16 bg-white/10 border-2 border-white/30 flex items-center justify-center group-hover:bg-white/20 transition-all">
                    <span className="text-2xl font-black text-white">{stat.value}</span>
                  </div>
                </div>
                <p className="text-white/80 font-black text-xs tracking-widest">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* CONTROLS */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-8 space-y-4"
          >
            {/* Search */}
            <div className="relative">
              <input
                type="text"
                placeholder="BUSCAR CLIENTE..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-6 py-4 bg-slate-900 border-4 border-white text-white placeholder-white/50 font-black tracking-wider focus:outline-none focus:border-orange-500 transition-all"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-2xl">🔍</span>
            </div>

            {/* Phase Filters */}
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setSelectedPhase(null)}
                className={`px-6 py-3 font-black border-3 transition-all ${
                  selectedPhase === null
                    ? 'bg-orange-500 border-orange-600 text-white'
                    : 'bg-slate-800 border-white/30 text-white hover:border-white/60'
                }`}
              >
                TODAS
              </button>
              {PHASES.map(phase => (
                <button
                  key={phase.num}
                  onClick={() => setSelectedPhase(phase.num)}
                  className={`px-6 py-3 font-black border-3 transition-all ${
                    selectedPhase === phase.num
                      ? 'bg-orange-500 border-orange-600 text-white'
                      : 'bg-slate-800 border-white/30 text-white hover:border-white/60'
                  }`}
                >
                  {phase.name.toUpperCase()}
                </button>
              ))}
            </div>

            {/* View Mode Toggle */}
            <div className="flex gap-3">
              {['kanban', 'list'].map(mode => (
                <button
                  key={mode}
                  onClick={() => setViewMode(mode as 'kanban' | 'list')}
                  className={`px-6 py-3 font-black border-3 transition-all ${
                    viewMode === mode
                      ? 'bg-blue-600 border-blue-700 text-white'
                      : 'bg-slate-800 border-white/30 text-white hover:border-white/60'
                  }`}
                >
                  {mode === 'kanban' ? '📊 KANBAN' : '📋 LISTA'}
                </button>
              ))}
            </div>
          </motion.div>

          {/* CONTENT */}
          {loading ? (
            <div className="text-center py-20">
              <p className="text-white/60 font-black text-xl">CARREGANDO...</p>
            </div>
          ) : viewMode === 'kanban' ? (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {PHASES.map(phase => (
                <motion.div key={phase.num} variants={itemVariants}>
                  <div className="bg-slate-800 border-4 border-white/20 p-6 min-h-96">
                    <h3 className="text-white font-black text-lg mb-4 tracking-wider border-b-4 border-orange-500 pb-3">
                      {phase.name.toUpperCase()}
                    </h3>
                    <div className="space-y-3">
                      {clientsByPhase[phase.num]?.map(client => (
                        <Link key={client.id} href={`/clientes/${client.id}`}>
                          <motion.div
                            whileHover={{ scale: 1.05, rotate: 1 }}
                            className="bg-gradient-to-r from-slate-700 to-slate-600 border-3 border-orange-500 p-4 cursor-pointer group hover:shadow-lg transition-all"
                          >
                            <p className="text-white font-black text-sm mb-2 group-hover:text-orange-400 transition-colors">
                              {client.name}
                            </p>
                            <div className="flex items-center justify-between">
                              <span className={`text-xs font-black ${
                                client.status === 'active'
                                  ? 'text-green-400'
                                  : client.status === 'paused'
                                  ? 'text-yellow-400'
                                  : 'text-red-400'
                              }`}>
                                {client.status === 'active' ? '🔥 ATIVO' : client.status === 'paused' ? '⏸ PAUSADO' : '❌ CHURN'}
                              </span>
                              {client.value && (
                                <span className="text-xs font-black text-blue-400">
                                  R$ {(client.value / 1000).toFixed(1)}K
                                </span>
                              )}
                            </div>
                          </motion.div>
                        </Link>
                      ))}
                      {!clientsByPhase[phase.num]?.length && (
                        <p className="text-white/40 font-black text-xs text-center py-8">SEM CLIENTES</p>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-3"
            >
              {filteredClients.map(client => (
                <Link key={client.id} href={`/clientes/${client.id}`}>
                  <motion.div
                    variants={itemVariants}
                    whileHover={{ x: 10 }}
                    className="bg-slate-800 border-3 border-orange-500 p-6 flex items-center justify-between cursor-pointer group hover:bg-slate-700 transition-all"
                  >
                    <div>
                      <p className="text-white font-black text-lg mb-1 group-hover:text-orange-400 transition-colors">
                        {client.name}
                      </p>
                      <p className="text-white/60 font-black text-xs">
                        FASE: {PHASES.find(p => p.num === client.current_phase)?.name.toUpperCase()}
                      </p>
                    </div>
                    <div className="flex items-center gap-6">
                      <span className={`text-sm font-black ${
                        client.status === 'active'
                          ? 'text-green-400'
                          : client.status === 'paused'
                          ? 'text-yellow-400'
                          : 'text-red-400'
                      }`}>
                        {client.status === 'active' ? '🔥 ATIVO' : client.status === 'paused' ? '⏸ PAUSADO' : '❌ CHURN'}
                      </span>
                      {client.value && (
                        <span className="text-sm font-black text-blue-400">
                          R$ {(client.value / 1000).toFixed(1)}K
                        </span>
                      )}
                    </div>
                  </motion.div>
                </Link>
              ))}
            </motion.div>
          )}
        </div>
      </main>
    </div>
  )
}
