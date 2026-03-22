'use client'

import { motion } from 'framer-motion'
import NumberFlow from '@number-flow/react'
import type { Client } from '@/lib/types'

interface StatsBarProps {
  clients: Client[]
}

const slaMap: Record<number, number> = {
  1: 24, 2: 72, 3: 168, 4: 360, 5: 720, 6: 120, 7: 720,
}

const containerVariants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
}

const itemVariants = {
  hidden:  { opacity: 0, y: 12, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] as const } },
}

export default function StatsBar({ clients }: StatsBarProps) {
  const active  = clients.filter(c => c.status === 'active').length
  const paused  = clients.filter(c => c.status === 'paused').length
  const churned = clients.filter(c => c.status === 'churned').length
  const late    = clients.filter(c => {
    if (c.status !== 'active') return false
    const hours = slaMap[c.current_phase]
    if (!hours) return false
    const elapsed = (Date.now() - new Date(c.updated_at || c.started_at).getTime()) / 3600000
    return elapsed > hours
  }).length

  const stats = [
    {
      label: 'Total',
      value: clients.length,
      icon: (
        <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
          <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
        </svg>
      ),
      accent: 'border-white/10',
      iconBg: 'bg-white/5',
      iconColor: 'text-white/50',
      valueColor: 'text-white',
      pill: null,
    },
    {
      label: 'Ativos',
      value: active,
      icon: (
        <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
      ),
      accent: 'border-status-ok/20',
      iconBg: 'bg-status-ok/10',
      iconColor: 'text-status-ok',
      valueColor: 'text-status-ok',
      pill: clients.length > 0 ? `${Math.round((active / clients.length) * 100)}%` : null,
    },
    {
      label: 'Em Atraso',
      value: late,
      icon: (
        <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
        </svg>
      ),
      accent: late > 0 ? 'border-status-danger/20' : 'border-white/10',
      iconBg: late > 0 ? 'bg-status-danger/10' : 'bg-white/5',
      iconColor: late > 0 ? 'text-status-danger' : 'text-white/30',
      valueColor: late > 0 ? 'text-status-danger' : 'text-white/30',
      pill: late > 0 ? 'Urgente' : null,
    },
    {
      label: 'Pausados',
      value: paused,
      icon: (
        <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
        </svg>
      ),
      accent: paused > 0 ? 'border-status-paused/20' : 'border-white/10',
      iconBg: paused > 0 ? 'bg-status-paused/10' : 'bg-white/5',
      iconColor: paused > 0 ? 'text-status-paused' : 'text-white/30',
      valueColor: paused > 0 ? 'text-status-paused' : 'text-white/30',
      pill: null,
    },
    {
      label: 'Churn',
      value: churned,
      icon: (
        <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
        </svg>
      ),
      accent: churned > 0 ? 'border-status-danger/20' : 'border-white/10',
      iconBg: churned > 0 ? 'bg-status-danger/10' : 'bg-white/5',
      iconColor: churned > 0 ? 'text-status-danger' : 'text-white/30',
      valueColor: churned > 0 ? 'text-status-danger' : 'text-white/30',
      pill: null,
    },
  ]

  return (
    <motion.div
      className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {stats.map(s => (
        <motion.div
          key={s.label}
          variants={itemVariants}
          whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
          className={`relative bg-brand-navy-card border ${s.accent} rounded-2xl p-4 overflow-hidden group`}
        >
          {/* Glow de fundo sutil no hover */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300
            bg-gradient-to-br from-white/[0.03] to-transparent pointer-events-none" />

          <div className="flex items-start justify-between mb-3">
            <div className={`w-8 h-8 rounded-lg ${s.iconBg} ${s.iconColor} flex items-center justify-center flex-shrink-0`}>
              {s.icon}
            </div>
            {s.pill && (
              <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${s.iconBg} ${s.iconColor}`}>
                {s.pill}
              </span>
            )}
          </div>

          <p className={`text-3xl font-bold leading-none mb-1 tabular-nums ${s.valueColor}`}>
            <NumberFlow value={s.value} />
          </p>
          <p className="text-white/40 text-xs font-medium">{s.label}</p>
        </motion.div>
      ))}
    </motion.div>
  )
}
