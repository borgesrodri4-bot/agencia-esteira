'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'

interface HeaderProps {
  title: string
  subtitle?: string
}

export default function Header({ title, subtitle }: HeaderProps) {
  const [name, setName] = useState('')
  const [role, setRole] = useState('')

  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getUser().then(async ({ data: { user } }) => {
      if (!user) return
      const { data } = await supabase
        .from('profiles')
        .select('name, role')
        .eq('id', user.id)
        .single()
      if (data) {
        setName(data.name)
        setRole(data.role)
      }
    })
  }, [])

  return (
    <header className="h-16 border-b border-white/5 flex items-center justify-between px-6 bg-brand-navy-soft flex-shrink-0">
      <div>
        <h1 className="text-white font-semibold text-lg leading-none">{title}</h1>
        {subtitle && <p className="text-white/40 text-xs mt-0.5">{subtitle}</p>}
      </div>

      {name && (
        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-white text-sm font-medium leading-none">{name}</p>
            <p className="text-white/40 text-xs mt-0.5">{role === 'admin' ? 'Administrador' : 'Colaborador'}</p>
          </div>
          <div className="w-8 h-8 bg-orange-gradient rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-sm">
              {name.charAt(0).toUpperCase()}
            </span>
          </div>
        </div>
      )}
    </header>
  )
}
