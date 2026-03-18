export const PHASES = [
  {
    num: 1,
    slug: 'captacao',
    label: 'Captação',
    sla: '24 horas',
    icon: '🎯',
    color: '#C9A84C',
    objetivo: 'Identificar e qualificar leads com real potencial de fechar contrato.',
    responsavel: 'Comercial / SDR',
    kpis: ['Taxa de conversão lead → reunião', 'Tempo médio de resposta', 'Número de leads qualificados/mês'],
    entregas: ['Lead qualificado no CRM', 'Reunião de descoberta agendada', 'Proposta comercial enviada'],
    atencao: 'Lead sem contato em 24h = lead perdido. Velocidade é diferencial competitivo.',
  },
  {
    num: 2,
    slug: 'diagnostico',
    label: 'Diagnóstico',
    sla: '48–72 horas',
    icon: '🔍',
    color: '#C9A84C',
    objetivo: 'Entender profundamente o negócio, desafios e oportunidades do cliente.',
    responsavel: 'Estrategista / Account',
    kpis: ['Completude do briefing (>90%)', 'Satisfação do cliente com diagnóstico', 'Benchmark vs. concorrentes'],
    entregas: ['Briefing completo', 'Análise de presença digital', 'Relatório de diagnóstico'],
    atencao: 'Diagnóstico raso gera planejamento fraco. Invista tempo aqui — evita retrabalho futuro.',
  },
  {
    num: 3,
    slug: 'onboarding',
    label: 'Onboarding',
    sla: '7 dias',
    icon: '🚀',
    color: '#C9A84C',
    objetivo: 'Estruturar todos os acessos, ferramentas e processos antes de começar a produção.',
    responsavel: 'Account / Operações',
    kpis: ['Tempo até primeiro acesso recebido', 'Checklist de onboarding completo', 'NPS da reunião de kickoff'],
    entregas: ['Contrato assinado', 'Acessos recebidos e testados', 'Pixel e tags instalados', 'Kickoff realizado', 'Pauta do mês 1 aprovada'],
    atencao: 'Não inicie produção sem todos os acessos. Sem acesso = sem resultado.',
  },
  {
    num: 4,
    slug: 'planejamento',
    label: 'Planejamento',
    sla: '15 dias',
    icon: '📋',
    color: '#C9A84C',
    objetivo: 'Criar o plano estratégico completo: persona, calendário, campanhas e metas.',
    responsavel: 'Estrategista + Equipe',
    kpis: ['Aprovação do plano pelo cliente', 'Alinhamento de metas e KPIs', 'Calendário editorial validado'],
    entregas: ['Persona ICP documentada', 'Calendário editorial do mês', 'Estrutura de campanhas de tráfego', 'Metas e KPIs acordados', 'Plano de 90 dias'],
    atencao: 'Planejamento sem metas claras = trabalho sem direção. Documente tudo por escrito.',
  },
  {
    num: 5,
    slug: 'producao',
    label: 'Produção',
    sla: 'Mensal contínuo',
    icon: '⚙️',
    color: '#C9A84C',
    objetivo: 'Executar com excelência tudo que foi planejado, com qualidade e prazo.',
    responsavel: 'Time Criativo + Tráfego',
    kpis: ['Entregas no prazo (>95%)', 'Taxa de aprovação de conteúdo (>80%)', 'ROAS das campanhas', 'Engajamento médio'],
    entregas: ['Conteúdos semanais produzidos e aprovados', 'Campanhas de tráfego ativas', 'Relatório de acompanhamento semanal'],
    atencao: 'Qualidade > Quantidade. Um post excelente vale mais que 10 mediocres.',
  },
  {
    num: 6,
    slug: 'relatorio',
    label: 'Relatório',
    sla: 'Até dia 5 útil',
    icon: '📊',
    color: '#C9A84C',
    objetivo: 'Apresentar resultados com clareza, comparar com metas e propor melhorias.',
    responsavel: 'Account / Analista',
    kpis: ['Entrega do relatório até dia 5 útil', 'NPS da reunião de resultados', 'Metas atingidas vs. planejado'],
    entregas: ['Dados de alcance e impressões', 'Métricas de conversão consolidadas', 'Relatório mensal completo', 'Reunião de alinhamento realizada'],
    atencao: 'Relatório sem contexto é só número. Sempre explique o que cada métrica significa para o negócio do cliente.',
  },
  {
    num: 7,
    slug: 'retencao',
    label: 'Retenção',
    sla: 'Mensal contínuo',
    icon: '🤝',
    color: '#C9A84C',
    objetivo: 'Garantir renovação, identificar oportunidades de crescimento e manter o cliente satisfeito.',
    responsavel: 'Account / CS',
    kpis: ['NPS > 8', 'Taxa de churn < 5%', 'LTV (Lifetime Value) por cliente', 'Taxa de upsell'],
    entregas: ['NPS coletado', 'Oportunidades de upsell identificadas', 'Renovação ou expansão discutida', 'Próximos objetivos documentados'],
    atencao: 'Cliente satisfeito indica novos clientes. Trate a retenção como a fase mais importante da esteira.',
  },
] as const

export type Phase = (typeof PHASES)[number]

export function getPhaseBySlug(slug: string) {
  return PHASES.find(p => p.slug === slug)
}

export function getPhaseByNum(num: number) {
  return PHASES.find(p => p.num === num)
}

export const PHASE_SLUGS = PHASES.map(p => p.slug)
