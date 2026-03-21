'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: '◈' },
  { href: '/clientes', label: 'Clientes', icon: '◉' },
  { href: '/esteira', label: 'A Esteira', icon: '◎' },
]

export default function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()

  async function handleLogout() {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/login')
    router.refresh()
  }

  return (
    <>
      {/* ── DESKTOP: sidebar lateral ── */}
      <aside className="hidden md:flex w-56 min-h-screen bg-brand-navy-soft border-r border-white/5 flex-col">
        {/* Logo */}
        <div className="p-5 border-b border-white/5">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 bg-orange-gradient rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="font-display text-white font-bold text-base">K</span>
            </div>
            <div>
              <p className="font-display text-white font-semibold text-sm leading-none tracking-wide">Kolhey</p>
              <p className="text-white/40 text-[10px] mt-0.5 italic">Resultados que se cultivam</p>
            </div>
          </div>
        </div>

        {/* Navegação */}
        <nav className="flex-1 p-3 space-y-1">
          {navItems.map(item => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors duration-200 ${
                  isActive
                    ? 'bg-brand-orange-muted text-brand-orange border border-brand-orange/20'
                    : 'text-white/50 hover:text-white hover:bg-brand-navy-hover'
                }`}
              >
                <span className="text-base">{item.icon}</span>
                {item.label}
              </Link>
            )
          })}
        </nav>

        <div className="p-3 border-t border-white/5">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-white/40 hover:text-status-danger hover:bg-status-danger/10 transition-colors duration-200 w-full text-left"
          >
            <span className="text-base">⊗</span>
            Sair
          </button>
        </div>
      </aside>

      {/* ── MOBILE: barra de navegação inferior ── */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-brand-navy-soft border-t border-white/10 flex items-center">
        {navItems.map(item => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex-1 flex flex-col items-center justify-center py-2.5 gap-0.5 transition-colors duration-200 ${
                isActive ? 'text-brand-orange' : 'text-white/40'
              }`}
            >
              <span className="text-xl leading-none">{item.icon}</span>
              <span className="text-[10px] font-medium">{item.label}</span>
              {isActive && (
                <span className="absolute bottom-0 w-8 h-0.5 bg-brand-orange rounded-t-full" />
              )}
            </Link>
          )
        })}
        <button
          onClick={handleLogout}
          className="flex-1 flex flex-col items-center justify-center py-2.5 gap-0.5 text-white/30 active:text-status-danger transition-colors duration-200"
        >
          <span className="text-xl leading-none">⊗</span>
          <span className="text-[10px] font-medium">Sair</span>
        </button>
      </nav>
    </>
  )
}
