'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import JaguarSVG from '@/components/icons/JaguarSVG'

const STATS = [
  { value: '47+', label: 'Clientes ativos' },
  { value: '7',   label: 'Fases de produção' },
  { value: '98%', label: 'Satisfação' },
  { value: '3x',  label: 'Crescimento médio' },
]

const DIFERENCIAIS = [
  {
    title: 'Estratégia Orientada a Dados',
    desc: 'Cada decisão é embasada em métricas reais. Nada de achismo — só resultados mensuráveis.',
    size: 'lg',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
      </svg>
    ),
  },
  {
    title: 'Presença Digital Completa',
    desc: 'Do tráfego pago às redes sociais, gerenciamos todos os canais com consistência e precisão.',
    size: 'sm',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
      </svg>
    ),
  },
  {
    title: 'Time do Tocantins',
    desc: 'Somos locais. Entendemos o mercado regional e falamos a língua do seu cliente.',
    size: 'sm',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
      </svg>
    ),
  },
  {
    title: 'Esteira de 7 Fases',
    desc: 'Processo estruturado do diagnóstico à retenção. Cada cliente acompanhado com SLAs definidos e checklists em tempo real.',
    size: 'lg',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
      </svg>
    ),
  },
  {
    title: 'Relatórios Transparentes',
    desc: 'Você vê tudo. Resultados claros, sem jargão, entregues no prazo.',
    size: 'sm',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0H3" />
      </svg>
    ),
  },
]

const FASES = [
  { num: '01', label: 'Captação' },
  { num: '02', label: 'Diagnóstico' },
  { num: '03', label: 'Onboarding' },
  { num: '04', label: 'Execução' },
  { num: '05', label: 'Otimização' },
  { num: '06', label: 'Relatório' },
  { num: '07', label: 'Retenção' },
]

export default function LandingPage() {
  const [scrolled, setScrolled] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    setVisible(true)
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="min-h-screen bg-brand-navy text-white overflow-x-hidden">

      {/* ── NAVBAR ── */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-brand-navy-soft/95 backdrop-blur-md border-b border-white/5 shadow-lg' : 'bg-transparent'
      }`}>
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 bg-orange-gradient rounded-lg flex items-center justify-center shadow-orange flex-shrink-0">
              <span className="font-display text-white font-bold text-base leading-none">K</span>
            </div>
            <p className="font-display text-white font-bold text-lg tracking-widest leading-none">
              K<span className="text-brand-orange">O</span>LHEY
            </p>
          </div>

          {/* Nav links */}
          <nav className="hidden md:flex items-center gap-8">
            {['Sobre', 'Diferenciais', 'Processo'].map(item => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-white/60 text-sm hover:text-white transition-colors duration-200"
              >
                {item}
              </a>
            ))}
          </nav>

          {/* CTA */}
          <Link href="/login" className="btn-primary text-xs px-5 py-2.5">
            Acessar painel →
          </Link>
        </div>
      </header>

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
        {/* Glow laranja top center */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-brand-orange/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-20 right-0 w-[400px] h-[400px] bg-brand-orange/3 rounded-full blur-3xl pointer-events-none" />

        {/* Onça watermark */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/4 pointer-events-none select-none">
          <JaguarSVG className="w-[520px] h-auto" opacity={0.07} />
        </div>

        <div className="relative max-w-6xl mx-auto px-6 py-32">
          {/* Badge */}
          <div
            className="inline-flex items-center gap-2 bg-brand-orange-muted border border-brand-orange/20 rounded-full px-4 py-1.5 mb-8"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(12px)',
              transition: 'opacity 0.5s ease, transform 0.5s ease',
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-brand-orange animate-pulse" />
            <span className="text-brand-orange text-xs font-medium tracking-wide">Agência do Tocantins</span>
          </div>

          {/* Headline */}
          <h1
            className="font-display font-bold text-5xl md:text-7xl leading-tight mb-6 max-w-3xl"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(16px)',
              transition: 'opacity 0.5s ease 0.1s, transform 0.5s ease 0.1s',
            }}
          >
            Resultados que
            <br />
            <span className="text-brand-orange">se cultivam.</span>
          </h1>

          {/* Subtítulo */}
          <p
            className="text-white/60 text-lg md:text-xl font-light max-w-xl mb-10 italic"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(16px)',
              transition: 'opacity 0.5s ease 0.2s, transform 0.5s ease 0.2s',
            }}
          >
            Marketing digital estratégico para empresas que querem crescer com método, dados e precisão.
          </p>

          {/* CTAs */}
          <div
            className="flex flex-wrap gap-4"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(16px)',
              transition: 'opacity 0.5s ease 0.3s, transform 0.5s ease 0.3s',
            }}
          >
            <a
              href="#sobre"
              className="btn-primary px-7 py-3 text-sm"
            >
              Conhecer a agência
            </a>
            <Link href="/login" className="btn-ghost px-7 py-3 text-sm">
              Acessar painel
            </Link>
          </div>

          {/* Linha de fase — decorativa */}
          <div
            className="flex gap-1.5 mt-16 flex-wrap"
            style={{
              opacity: visible ? 1 : 0,
              transition: 'opacity 0.5s ease 0.5s',
            }}
          >
            {FASES.map((f, i) => (
              <div
                key={f.num}
                className="flex items-center gap-1.5"
                style={{ transitionDelay: `${0.5 + i * 0.05}s` }}
              >
                <div className="flex items-center gap-1 bg-brand-navy-card border border-white/8 rounded-lg px-3 py-1.5">
                  <span className="font-display text-brand-orange text-xs font-semibold">{f.num}</span>
                  <span className="text-white/40 text-xs">{f.label}</span>
                </div>
                {i < FASES.length - 1 && (
                  <svg viewBox="0 0 16 16" fill="currentColor" className="w-3 h-3 text-white/15 flex-shrink-0">
                    <path fillRule="evenodd" d="M6.22 3.22a.75.75 0 011.06 0l4.25 4.25a.75.75 0 010 1.06l-4.25 4.25a.75.75 0 01-1.06-1.06L9.94 8 6.22 4.28a.75.75 0 010-1.06z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SOBRE ── */}
      <section id="sobre" className="py-24 bg-brand-navy-soft/40">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Texto */}
            <div>
              <p className="text-brand-orange text-xs uppercase tracking-widest font-semibold mb-4">Sobre a Kolhey</p>
              <h2 className="font-display font-bold text-4xl md:text-5xl leading-tight mb-6">
                Força e precisão<br />de jaguar.
              </h2>
              <p className="text-white/60 leading-relaxed mb-4">
                Somos uma agência de marketing digital com sede no Tocantins, especializada em transformar negócios regionais em referências no digital.
              </p>
              <p className="text-white/60 leading-relaxed mb-8">
                Nossa metodologia exclusiva de 7 fases garante que cada cliente seja acompanhado com rigor — do diagnóstico à retenção — sem perder o toque humano e local que nos diferencia.
              </p>
              <Link href="/login" className="btn-ghost inline-flex items-center gap-2">
                Ver nossa esteira
                <svg viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4">
                  <path fillRule="evenodd" d="M6.22 3.22a.75.75 0 011.06 0l4.25 4.25a.75.75 0 010 1.06l-4.25 4.25a.75.75 0 01-1.06-1.06L9.94 8 6.22 4.28a.75.75 0 010-1.06z" clipRule="evenodd" />
                </svg>
              </Link>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-4">
              {STATS.map((stat, i) => (
                <div
                  key={stat.label}
                  className="card-gold flex flex-col justify-between"
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  <p className="font-display text-brand-orange font-bold text-4xl md:text-5xl leading-none mb-2">
                    {stat.value}
                  </p>
                  <p className="text-white/50 text-sm">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── DIFERENCIAIS (bento grid) ── */}
      <section id="diferenciais" className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-brand-orange text-xs uppercase tracking-widest font-semibold mb-4">Por que Kolhey</p>
            <h2 className="font-display font-bold text-4xl md:text-5xl">Nossos diferenciais</h2>
          </div>

          {/* Bento grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {DIFERENCIAIS.map((item, i) => (
              <div
                key={item.title}
                className={`card group hover:-translate-y-0.5 transition-all duration-300 ${
                  item.size === 'lg' ? 'md:col-span-2' : ''
                }`}
                style={{
                  animationDelay: `${i * 0.07}s`,
                  borderColor: i === 3 ? 'rgba(242,137,51,0.25)' : undefined,
                  boxShadow: i === 3 ? '0 0 0 1px rgba(242,137,51,0.2)' : undefined,
                }}
              >
                <div className="w-10 h-10 bg-brand-orange-muted border border-brand-orange/20 rounded-lg flex items-center justify-center text-brand-orange mb-4 group-hover:bg-brand-orange group-hover:text-white transition-all duration-300">
                  {item.icon}
                </div>
                <h3 className="text-white font-semibold text-base mb-2">{item.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROCESSO ── */}
      <section id="processo" className="py-24 bg-brand-navy-soft/30">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-brand-orange text-xs uppercase tracking-widest font-semibold mb-4">Metodologia</p>
            <h2 className="font-display font-bold text-4xl md:text-5xl mb-4">Esteira de 7 Fases</h2>
            <p className="text-white/50 max-w-xl mx-auto text-sm leading-relaxed">
              Cada cliente segue um processo estruturado com SLAs definidos, checklists e KPIs mensuráveis em cada etapa.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3">
            {FASES.map((fase, i) => (
              <div
                key={fase.num}
                className="relative card hover:-translate-y-0.5 transition-all duration-300 group"
              >
                {/* Conector horizontal decorativo */}
                {i < FASES.length - 1 && (
                  <div className="hidden xl:block absolute -right-1.5 top-1/2 -translate-y-1/2 w-3 h-px bg-brand-orange/20 z-10" />
                )}
                <span className="font-display text-brand-orange text-2xl font-bold block mb-2 group-hover:text-brand-orange-light transition-colors duration-200">
                  {fase.num}
                </span>
                <span className="text-white font-medium text-sm">{fase.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA FINAL ── */}
      <section className="py-24 relative overflow-hidden">
        {/* Fundo gradiente laranja */}
        <div className="absolute inset-0 bg-orange-gradient opacity-90" />
        {/* Onça sutil no canto */}
        <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none select-none">
          <JaguarSVG className="w-72 h-auto" opacity={1} />
        </div>

        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <h2 className="font-display font-bold text-4xl md:text-6xl text-white mb-6 leading-tight">
            Pronto para cultivar<br />seus resultados?
          </h2>
          <p className="text-white/80 text-lg font-light italic mb-10">
            Resultados que se cultivam — Kolhey
          </p>
          <Link
            href="/login"
            className="inline-flex items-center gap-2 bg-white text-brand-orange font-bold px-10 py-4 rounded-xl text-sm hover:bg-white/90 transition-all duration-200 shadow-orange-lg hover:-translate-y-0.5"
          >
            Acessar o painel
            <svg viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4">
              <path fillRule="evenodd" d="M6.22 3.22a.75.75 0 011.06 0l4.25 4.25a.75.75 0 010 1.06l-4.25 4.25a.75.75 0 01-1.06-1.06L9.94 8 6.22 4.28a.75.75 0 010-1.06z" clipRule="evenodd" />
            </svg>
          </Link>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-brand-navy-soft border-t border-white/5 py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            {/* Logo + slogan */}
            <div className="text-center md:text-left">
              <div className="flex items-center gap-2.5 justify-center md:justify-start mb-2">
                <div className="w-8 h-8 bg-orange-gradient rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="font-display text-white font-bold text-sm leading-none">K</span>
                </div>
                <p className="font-display text-white font-bold text-base tracking-widest">
                  K<span className="text-brand-orange">O</span>LHEY
                </p>
              </div>
              <p className="text-white/30 text-xs italic font-light tracking-wide">
                Resultados que se cultivam
              </p>
            </div>

            {/* Links */}
            <div className="flex items-center gap-8 text-white/40 text-sm">
              <a href="#sobre" className="hover:text-white transition-colors duration-200">Sobre</a>
              <a href="#diferenciais" className="hover:text-white transition-colors duration-200">Diferenciais</a>
              <a href="#processo" className="hover:text-white transition-colors duration-200">Processo</a>
              <Link href="/login" className="hover:text-brand-orange transition-colors duration-200">Painel</Link>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-2 text-white/20 text-xs">
            <span>© {new Date().getFullYear()} Kolhey. Todos os direitos reservados.</span>
            <span className="italic">By Kolhey — Tocantins, Brasil</span>
          </div>
        </div>
      </footer>

    </div>
  )
}
