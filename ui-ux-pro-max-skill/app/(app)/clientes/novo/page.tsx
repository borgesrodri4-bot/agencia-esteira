'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Header from '@/components/layout/Header'
import { useClients } from '@/hooks/useClients'
import { createClient } from '@/lib/supabase/client'

interface Profile {
  id: string
  name: string
  role: string
}

export default function NovoClientePage() {
  const router = useRouter()
  const { addClient } = useClients()
  const [profiles, setProfiles] = useState<Profile[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const [form, setForm] = useState({
    name: '',
    niche: '',
    contact_email: '',
    contact_phone: '',
    responsible_id: '',
    notes: '',
  })

  useEffect(() => {
    const supabase = createClient()
    supabase
      .from('profiles')
      .select('id, name, role')
      .then(({ data }) => setProfiles(data || []))
  }, [])

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.name.trim()) return
    setLoading(true)
    setError('')

    try {
      const client = await addClient({
        name: form.name.trim(),
        niche: form.niche.trim() || undefined,
        contact_email: form.contact_email.trim() || undefined,
        contact_phone: form.contact_phone.trim() || undefined,
        responsible_id: form.responsible_id || undefined,
        notes: form.notes.trim() || undefined,
      })
      router.push(`/clientes/${client.id}`)
    } catch (err) {
      setError('Erro ao cadastrar cliente. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex-1 flex flex-col overflow-y-auto">
      <Header title="Novo Cliente" subtitle="Preencha os dados para cadastrar" />

      <main className="flex-1 p-6 max-w-2xl">
        <div className="card-gold">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="label">Nome do Cliente *</label>
                <input
                  name="name" className="input" value={form.name}
                  onChange={handleChange} placeholder="Ex: Clínica Dr. Silva" required
                />
              </div>

              <div>
                <label className="label">Nicho / Segmento</label>
                <input
                  name="niche" className="input" value={form.niche}
                  onChange={handleChange} placeholder="Ex: Saúde, E-commerce"
                />
              </div>

              <div>
                <label className="label">Responsável</label>
                <select name="responsible_id" className="input" value={form.responsible_id} onChange={handleChange}>
                  <option value="">Nenhum</option>
                  {profiles.map(p => (
                    <option key={p.id} value={p.id}>{p.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="label">E-mail de Contato</label>
                <input
                  name="contact_email" type="email" className="input"
                  value={form.contact_email} onChange={handleChange}
                  placeholder="contato@cliente.com"
                />
              </div>

              <div>
                <label className="label">Telefone</label>
                <input
                  name="contact_phone" className="input" value={form.contact_phone}
                  onChange={handleChange} placeholder="(11) 99999-9999"
                />
              </div>

              <div className="md:col-span-2">
                <label className="label">Observações</label>
                <textarea
                  name="notes" className="input min-h-20 resize-y" value={form.notes}
                  onChange={handleChange} placeholder="Informações relevantes sobre o cliente..."
                />
              </div>
            </div>

            {error && (
              <div className="bg-status-danger/10 border border-status-danger/30 rounded-lg px-3 py-2">
                <p className="text-status-danger text-sm">{error}</p>
              </div>
            )}

            <div className="flex gap-3 pt-2">
              <button type="submit" disabled={loading} className="btn-primary disabled:opacity-50">
                {loading ? 'Cadastrando...' : 'Cadastrar Cliente'}
              </button>
              <Link href="/clientes" className="btn-ghost">Cancelar</Link>
            </div>
          </form>
        </div>
      </main>
    </div>
  )
}
