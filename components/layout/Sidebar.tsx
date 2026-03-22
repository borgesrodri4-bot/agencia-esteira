'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { createClient } from '@/lib/supabase/client'
import { useEffect, useState } from 'react'

const navItems = [
  {
    href: '/dashboard',
    label: 'Dashboard',
    icon: (
      <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 flex-shrink-0">
        <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" />
        <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" />
      </svg>
    ),
  },
  {
    href: '/clientes',
    label: 'Clientes',
    icon: (
      <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 flex-shrink-0">
        <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
      </svg>
    ),
  },
  {
    href: '/esteira',
    label: 'A Esteira',
    icon: (
      <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 flex-shrink-0">
        <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
      </svg>
    ),
  },
]

export default function Sidebar() {
  const pathname  = usePathname()
  const router    = useRouter()
  const [name, setName] = useState('')
  const [role, setRole] = useState('')

  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getUser().then(async ({ data: { user } }) => {
      if (!user) return
      const { data } = await supabase.from('profiles').select('name, role').eq('id', user.id).single()
      if (data) { setName(data.name); setRole(data.role) }
    })
  }, [])

  async function handleLogout() {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/login')
    router.refresh()
  }

  const initials = name ? name.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase() : '?'

  return (
    <>
      {/* ── DESKTOP: sidebar lateral ── */}
      <motion.aside
        initial={{ x: -16, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="hidden md:flex w-56 min-h-screen bg-brand-navy-soft border-r border-white/5 flex-col"
      >
        {/* Logo */}
        <div className="p-5 border-b border-white/5">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-brand-navy-card flex-shrink-0 shadow-orange border border-brand-orange/20 flex items-center justify-center overflow-hidden">
              <Image src="/onca-transparent.png" alt="Kolhey" width={36} height={36} className="w-full h-full object-contain" />
            </div>
            <div>
              <p className="font-display text-white font-semibold text-sm leading-none tracking-widest">
                K<span className="text-brand-orange">O</span>LHEY
              </p>
              <p className="text-white/30 text-[10px] mt-0.5 italic font-light">Resultad<span className="text-brand-orange">o</span>s que se cultivam</p>
            </div>
          </div>
        </div>

        {/* Navegação */}
        <nav className="flex-1 p-3 space-y-0.5" role="navigation" aria-label="Menu principal">
          {navItems.map(item => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-colors duration-150
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange/50 ${
                  isActive
                    ? 'bg-brand-orange-muted text-brand-orange font-medium'
                    : 'text-white/45 hover:text-white hover:bg-white/5'
                }`}
              >
                {/* Indicador lateral com layoutId — desliza suavemente entre itens */}
                {isActive && (
                  <motion.span
                    layoutId="sidebar-indicator"
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-brand-orange rounded-r-full"
                    transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                  />
                )}
                {item.icon}
                {item.label}
              </Link>
            )
          })}
        </nav>

        {/* Usuário + Sair */}
        <div className="p-3 border-t border-white/5 space-y-1">
          {name && (
            <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-white/3 mb-1">
              <div className="w-7 h-7 bg-orange-gradient rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold text-[11px]">{initials}</span>
              </div>
              <div className="min-w-0">
                <p className="text-white text-xs font-medium truncate leading-none">{name}</p>
                <p className="text-white/30 text-[10px] mt-0.5">{role === 'admin' ? 'Administrador' : 'Colaborador'}</p>
              </div>
            </div>
          )}
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm text-white/30
              hover:text-status-danger hover:bg-status-danger/8 transition-all duration-200 w-full text-left
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-status-danger/50 cursor-pointer"
            aria-label="Sair da conta"
          >
            <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 flex-shrink-0">
              <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
            </svg>
            Sair
          </button>
        </div>
      </motion.aside>

      {/* ── MOBILE: barra inferior ── */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-brand-navy-soft/95 backdrop-blur border-t border-white/8 flex items-center" role="navigation" aria-label="Menu mobile">
        {navItems.map(item => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex-1 flex flex-col items-center justify-center py-3 gap-1 transition-colors duration-200 min-h-[56px]
                focus-visible:outline-none ${isActive ? 'text-brand-orange' : 'text-white/35'}`}
            >
              {item.icon}
              <span className="text-[10px] font-medium">{item.label}</span>
              {isActive && (
                <motion.span
                  layoutId="mobile-indicator"
                  className="absolute bottom-0 w-6 h-0.5 bg-brand-orange rounded-t-full"
                  transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                />
              )}
            </Link>
          )
        })}
        <button
          onClick={handleLogout}
          className="flex-1 flex flex-col items-center justify-center py-3 gap-1 text-white/25 active:text-status-danger transition-colors duration-200 min-h-[56px] cursor-pointer"
          aria-label="Sair"
        >
          <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
            <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
          </svg>
          <span className="text-[10px] font-medium">Sair</span>
        </button>
      </nav>
    </>
  )
}
