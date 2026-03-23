'use client'

import Header from '@/components/layout/Header'

export default function CRMPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950">
      <Header />
      <main className="p-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-6xl font-black text-white mb-4 tracking-tighter">CRM KANBAN</h1>
          <div className="h-1 w-32 bg-gradient-to-r from-orange-500 to-orange-600 mb-8"></div>
          <p className="text-white/80 text-lg">Página CRM Premium</p>
        </div>
      </main>
    </div>
  )
}
