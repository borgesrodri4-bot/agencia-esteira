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
    <aside className="w-56 min-h-screen bg-brand-black-soft border-r border-white/5 flex flex-col">
      {/* Logo */}
      <div className="p-5 border-b border-white/5">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-gold-gradient rounded-lg flex items-center justify-center flex-shrink-0">
            <span className="text-brand-black font-bold text-sm">A</span>
          </div>
          <div>
            <p className="text-white font-semibold text-sm leading-none">Agência</p>
            <p className="text-white/40 text-xs mt-0.5">Esteira de Produção</p>
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
                  ? 'bg-brand-gold-muted text-brand-gold border border-brand-gold/20'
                  : 'text-white/50 hover:text-white hover:bg-brand-black-hover'
              }`}
            >
              <span className="text-base">{item.icon}</span>
              {item.label}
            </Link>
          )
        })}
      </nav>

      {/* Linha divisória + logout */}
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
  )
}
