import Header from '@/components/layout/Header'
import { PHASES } from '@/lib/phases'

// ─── Dados extraídos do documento ────────────────────────────────────────────

const PRINCIPIOS = [
  {
    num: '01',
    titulo: 'Processo acima de talento',
    descricao: 'Processo replicável gera resultado previsível. Talento sem processo gera resultado aleatório.',
  },
  {
    num: '02',
    titulo: 'Entregável fecha a fase',
    descricao: 'Nenhuma fase avança sem entregável aprovado. O entregável é o portão de controle.',
  },
  {
    num: '03',
    titulo: 'Template-first',
    descricao: 'Todo formato novo começa por um template. Padrão, agilidade e replicabilidade.',
  },
]

const BANT = [
  { letra: 'B', criterio: 'Budget — tem verba?', pergunta: 'Tem orçamento definido para isso?' },
  { letra: 'A', criterio: 'Authority — é o decisor?', pergunta: 'Você é quem aprova a contratação?' },
  { letra: 'N', criterio: 'Need — dor real e urgente?', pergunta: 'Qual é o principal problema hoje?' },
  { letra: 'T', criterio: 'Timeline — prazo definido?', pergunta: 'Quando precisa resolver?' },
]

const SCRIPT_PROSPECCAO = [
  { bloco: '1. Gancho de contexto', conteudo: '"Vi que vocês estão fazendo [observação específica]. Isso chamou minha atenção."' },
  { bloco: '2. Dor provável do nicho', conteudo: '"Empresas de [nicho] costumam enfrentar [dor] — e isso compromete [consequência]."' },
  { bloco: '3. Resultado entregue', conteudo: '"Recentemente ajudamos [empresa similar] a resolver isso em [prazo], gerando [resultado]."' },
  { bloco: '4. CTA simples', conteudo: '"Faz sentido uma conversa de 20 minutos para ver se faz sentido para vocês também?"' },
]

const LEADS = [
  { tipo: 'Lead A — Alta Prioridade', criterio: 'ICP + abriu 2+ mensagens + clicou em CTA', acao: 'Vendedor sênior — abordagem direta', cor: 'status-ok' },
  { tipo: 'Lead B — Média Prioridade', criterio: 'Abriu mensagens mas não clicou em CTA', acao: 'Nova sequência + vendedor intermediário', cor: 'status-warning' },
  { tipo: 'Lead C — Lead Frio', criterio: 'Zero interação em 7 a 10 dias', acao: 'Nutrição automática de 21 dias', cor: 'white/30' },
]

const SPIN = [
  { tipo: 'Situação', perguntas: ['Como você gerencia essa área hoje?', 'Qual é seu resultado atual nessa métrica?'] },
  { tipo: 'Problema', perguntas: ['Quais desafios você enfrenta com essa abordagem?', 'O que tira seu sono sobre essa área do negócio?'] },
  { tipo: 'Implicação', perguntas: ['Como isso impacta suas vendas e crescimento?', 'Se isso não mudar nos próximos 6 meses, o que acontece?'] },
  { tipo: 'Necessidade', perguntas: ['Se houvesse uma forma de resolver isso, quanto valeria?', 'Como seria o sucesso para você em 90 dias?'] },
]

const PROPOSTA_BLOCOS = [
  { bloco: '1. Problema identificado', conteudo: 'O que você mapeou na reunião — com as palavras do cliente' },
  { bloco: '2. Solução proposta', conteudo: 'O que a agência vai fazer (não lista de serviços genérica)' },
  { bloco: '3. Resultado esperado', conteudo: 'Transformação mensurável que o cliente espera ver' },
  { bloco: '4. Prazo de implementação', conteudo: 'Cronograma macro em semanas' },
  { bloco: '5. Investimento', conteudo: 'Preço mensal ou por projeto — sem jargão' },
  { bloco: '6. Garantias e SLA', conteudo: 'Prazos, padrões mínimos e condições de entrega' },
  { bloco: '7. Próximo passo', conteudo: 'Ação imediata para fechar: assinatura, reunião ou teste' },
]

const OBJECOES = [
  { objecao: '"Está caro"', resposta: 'Reframe: mostre o custo de não agir. Calcule o que um lead vale para o cliente.' },
  { objecao: '"Já tentei e não funcionou"', resposta: 'Pergunte o que foi tentado. Diferencie o método. Use um case similar.' },
  { objecao: '"Preciso pensar"', resposta: 'Pergunte: o que falta para decidir hoje? Identifique a objeção real por trás.' },
  { objecao: '"Não tenho tempo agora"', resposta: 'Mostre que a falta de tempo é o sintoma. A solução resolve exatamente isso.' },
]

const CHECKLIST_ONBOARDING = [
  'Acesso às plataformas: Instagram, Meta Ads, Google Analytics, site',
  'Briefing de marca: logo, cores, fontes, tom de voz, restrições visuais',
  'Briefing de público: persona aprovada, objeções, linguagem do cliente',
  'Reunião de kickoff: pauta com ferramentas, SLA e expectativas — ata registrada',
  'Verificação de Pixel Meta e Google Analytics — relatório de rastreamento OK',
  'Primeiro calendário editorial: primeiros 15 dias aprovados',
  'Pasta padrão do cliente criada no Drive ou Notion',
  'Quick win entregue: primeira peça ou conteúdo entregue ainda na primeira semana',
]

const PLANO_90_DIAS = [
  { bloco: 'Objetivo principal', define: 'Um resultado mensurável — leads, seguidores, faturamento' },
  { bloco: 'Público-alvo (ICP)', define: 'Persona com dores, gatilhos e canais prioritários' },
  { bloco: 'Regra de conteúdo 70/30', define: '70% valor e educação · 30% oferta e CTA' },
  { bloco: 'Pilares de conteúdo', define: '3 a 4 temas que guiam toda a produção do período' },
  { bloco: 'Calendário editorial', define: 'Datas, formatos, responsáveis e canais — mês a mês' },
  { bloco: 'Marcos de resultado', define: 'O que deve acontecer no mês 1, 2 e 3' },
]

const FLUXO_PRODUCAO = [
  { etapa: 'Briefing de criação', acao: 'Estrategista preenche: tema, formato, referência, CTA e prazo' },
  { etapa: 'Produção', acao: 'Criativo executa seguindo o briefing e o template aprovado' },
  { etapa: 'Revisão interna', acao: 'Gestor revisa antes de enviar — máximo 24h para retorno' },
  { etapa: 'Aprovação do cliente', acao: 'SLA: 24h para aprovar ou solicitar ajuste' },
  { etapa: 'Publicação', acao: 'Equipe publica no horário definido no calendário' },
]

const REGRAS_PRODUCAO = [
  'Todo formato novo exige template aprovado antes de criar (template-first)',
  'Nenhuma peça publicada sem revisão interna antes',
  'Ajuste solicitado pelo cliente: máximo 2 rodadas sem custo adicional',
  'Peça não aprovada em 48h pelo cliente: escalada para o gestor',
  'Conteúdo de cobertura de ação interna: registrar e editar em até 24h',
]

const RELATORIO_BLOCOS = [
  { bloco: '1. Resumo executivo', conteudo: 'O que funcionou, o que não funcionou, principal aprendizado' },
  { bloco: '2. Performance de conteúdo', conteudo: 'Alcance, engajamento, salvamentos, compartilhamentos' },
  { bloco: '3. Performance de campanhas', conteudo: 'CPL, ROAS, CTR, investimento vs. resultado' },
  { bloco: '4. Crescimento de audiência', conteudo: 'Novos seguidores, leads captados, qualidade dos leads' },
  { bloco: '5. Diagnóstico estratégico', conteudo: 'Por que os resultados foram esses — não só os números' },
  { bloco: '6. Plano do próximo mês', conteudo: 'O que muda, o que mantém, novas ações prioritárias' },
]

const PROTOCOLO_CONTATO = [
  { momento: 'Dia 30', acao: 'Check-in de progresso + apresentação dos primeiros resultados' },
  { momento: 'Dia 45', acao: 'Compartilhar caso de sucesso similar ao do cliente' },
  { momento: 'Dia 60', acao: 'Pedido de indicação — somente se resultados confirmados' },
  { momento: 'Dia 90', acao: 'Revisão do plano + proposta de continuidade ou expansão do escopo' },
  { momento: 'Contínuo', acao: 'NPS informal a cada trimestre — pergunte o que pode melhorar' },
]

const SINAIS_CHURN = [
  'Cliente não abre relatórios por 2 semanas seguidas',
  'Pedidos de revisão aumentaram acima do padrão sem motivo claro',
  'Tom nas mensagens mudou — respostas mais curtas ou formais',
  'Cliente menciona que "está avaliando outras opções"',
  'Atraso no pagamento sem comunicação prévia',
]

const ESCADA_RECOMENDACAO = [
  { nivel: '1 — Satisfeito', comportamento: 'Gosta, mas não indica proativamente' },
  { nivel: '2 — Recomendador passivo', comportamento: 'Indica quando alguém pergunta diretamente' },
  { nivel: '3 — Promotor ativo', comportamento: 'Menciona espontaneamente em conversas relevantes' },
  { nivel: '4 — Conector estratégico', comportamento: 'Faz introduções intencionais para você' },
  { nivel: '5 — Evangelista', comportamento: 'Defende publicamente sem você pedir' },
]

const PRIMEIROS_7_DIAS = [
  { dia: '1', acao: 'Criar pasta padrão e enviar acesso ao briefing', responsavel: 'Gestor de conta', entregavel: 'Pasta Drive criada' },
  { dia: '1', acao: 'Reunião de kickoff — ferramentas, SLA e expectativas', responsavel: 'Gestor + Sócio', entregavel: 'Ata registrada' },
  { dia: '2', acao: 'Verificar e testar Pixel Meta + Google Analytics', responsavel: 'Tráfego', entregavel: 'Rastreamento OK' },
  { dia: '3', acao: 'Briefing de marca preenchido e aprovado', responsavel: 'Gestor de conta', entregavel: 'Briefing assinado' },
  { dia: '4', acao: 'Planejamento editorial dos primeiros 15 dias', responsavel: 'Criação + Gestor', entregavel: 'Calendário aprovado' },
  { dia: '5', acao: 'Primeira peça entregue + copy pronto', responsavel: 'Criação', entregavel: 'Arte aprovada e agendada' },
  { dia: '7', acao: 'Quick win entregue + relatório de semana 1', responsavel: 'Gestor de conta', entregavel: 'E-mail enviado' },
]

// ─── Componente ──────────────────────────────────────────────────────────────

export default function EsteiraPage() {
  return (
    <div className="flex-1 flex flex-col overflow-y-auto">
      <Header title="A Esteira" subtitle="Método Operacional Simplificado — 7 Fases" />

      <main className="flex-1 p-6 max-w-4xl space-y-6">

        {/* Hero */}
        <div className="card-gold">
          <div className="flex items-start gap-4 flex-wrap">
            <div className="flex-1 min-w-0">
              <h2 className="text-brand-orange font-bold text-xl mb-1">Esteira da Agência Kolhey</h2>
              <p className="text-white/50 text-xs uppercase tracking-wide mb-3">
                7 Fases · 3 Princípios · Uso imediato · Da Captação à Retenção — Replicável por cliente
              </p>
              <p className="text-white/70 text-sm leading-relaxed">
                Este documento descreve o processo completo de atendimento ao cliente. Cada fase tem seu SLA,
                responsável e entregável definido. <strong className="text-white">Nenhuma fase avança sem entregável aprovado.</strong>
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 mt-4">
            {PHASES.map(p => (
              <a
                key={p.num}
                href={`#fase-${p.num}`}
                className="text-xs px-3 py-1 rounded-full border border-brand-orange/30 text-brand-orange hover:bg-brand-orange-muted transition-colors"
              >
                {p.icon} F{p.num}: {p.label}
              </a>
            ))}
            <a href="#primeiros-7-dias" className="text-xs px-3 py-1 rounded-full border border-white/20 text-white/60 hover:border-brand-orange/30 hover:text-brand-orange transition-colors">
              📅 Primeiros 7 Dias
            </a>
          </div>
        </div>

        {/* 3 Princípios */}
        <div>
          <h3 className="text-white/40 text-xs uppercase tracking-widest mb-3">3 Princípios Inegociáveis</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {PRINCIPIOS.map(p => (
              <div key={p.num} className="card border-brand-orange/20">
                <p className="text-brand-orange text-2xl font-bold mb-2">{p.num}</p>
                <p className="text-white font-semibold text-sm mb-1">{p.titulo}</p>
                <p className="text-white/50 text-xs leading-relaxed">{p.descricao}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Visão geral das 7 fases */}
        <div className="card">
          <h3 className="text-brand-orange font-bold mb-4">Visão Geral — 7 Fases</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left text-white/40 text-xs uppercase py-2 pr-3">Fase</th>
                  <th className="text-left text-white/40 text-xs uppercase py-2 pr-3">Nome</th>
                  <th className="text-left text-white/40 text-xs uppercase py-2 pr-3">Responsável</th>
                  <th className="text-left text-white/40 text-xs uppercase py-2 pr-3">Prazo</th>
                  <th className="text-left text-white/40 text-xs uppercase py-2">Entregável</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { num: '01', nome: 'Captação', resp: 'SDR', prazo: 'D+0 a D+7', entregavel: 'Lead Qualificado — ICP preenchido' },
                  { num: '02', nome: 'Diagnóstico', resp: 'Account', prazo: 'D+1 a D+3', entregavel: 'Proposta aprovada + contrato enviado' },
                  { num: '03', nome: 'Onboarding', resp: 'CS', prazo: 'D+1 a D+2', entregavel: 'Cliente ativado — briefing aprovado' },
                  { num: '04', nome: 'Planejamento', resp: 'Estrategista', prazo: 'D+3 a D+7', entregavel: 'Plano 90 dias + calendário aprovados' },
                  { num: '05', nome: 'Produção', resp: 'Criativo', prazo: 'Recorrente', entregavel: 'Conteúdo aprovado e publicado' },
                  { num: '06', nome: 'Relatório', resp: 'Analista', prazo: 'Dia 5/mês', entregavel: 'Dados analisados + plano do próximo mês' },
                  { num: '07', nome: 'Retenção', resp: 'CS + Account', prazo: 'Contínuo', entregavel: 'Cliente renovado e indicando' },
                ].map(row => (
                  <tr key={row.num} className="border-b border-white/5 hover:bg-brand-navy-soft/50">
                    <td className="py-2.5 pr-3"><span className="text-brand-orange font-bold">{row.num}</span></td>
                    <td className="py-2.5 pr-3 text-white font-medium">{row.nome}</td>
                    <td className="py-2.5 pr-3 text-white/60">{row.resp}</td>
                    <td className="py-2.5 pr-3 text-brand-orange text-xs">{row.prazo}</td>
                    <td className="py-2.5 text-white/70 text-xs">{row.entregavel}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ── FASE 01: CAPTAÇÃO ── */}
        <div id="fase-1" className="card scroll-mt-6 space-y-5">
          <PhaseHeader num={1} nome="Captação" resp="SDR" prazo="D+0 a D+7" entregavel="Lead Qualificado — ICP preenchido" icon="🎯" />

          <div>
            <p className="text-white/40 text-xs uppercase tracking-wide mb-1">Objetivo</p>
            <p className="text-white/80 text-sm">Nenhum lead sem ICP preenchido avança para o Diagnóstico.</p>
          </div>

          {/* BANT */}
          <div>
            <p className="text-white/40 text-xs uppercase tracking-wide mb-3">Qualificação BANT — Critério mínimo: 3 de 4</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {BANT.map(b => (
                <div key={b.letra} className="flex gap-3 p-3 bg-brand-navy-soft rounded-lg">
                  <div className="w-8 h-8 bg-brand-orange rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-brand-navy font-bold text-sm">{b.letra}</span>
                  </div>
                  <div>
                    <p className="text-white text-xs font-medium">{b.criterio}</p>
                    <p className="text-white/50 text-xs mt-0.5 italic">{b.pergunta}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-2 p-3 bg-status-warning/5 border border-status-warning/20 rounded-lg">
              <p className="text-status-warning text-xs">
                ⚠ Lead sem 3 critérios BANT confirmados não entra na proposta. Registre no CRM e reclassifique para nutrição.
              </p>
            </div>
          </div>

          {/* Script */}
          <div>
            <p className="text-white/40 text-xs uppercase tracking-wide mb-3">Script de Prospecção Ativa — 4 blocos</p>
            <div className="space-y-2">
              {SCRIPT_PROSPECCAO.map((s, i) => (
                <div key={i} className="flex gap-3 p-3 bg-brand-navy-soft rounded-lg">
                  <span className="text-brand-orange font-bold text-xs w-24 flex-shrink-0">{s.bloco}</span>
                  <p className="text-white/70 text-sm italic">{s.conteudo}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Classificação de leads */}
          <div>
            <p className="text-white/40 text-xs uppercase tracking-wide mb-3">Classificação de Leads</p>
            <div className="space-y-2">
              {LEADS.map((l, i) => (
                <div key={i} className="flex gap-3 p-3 bg-brand-navy-soft rounded-lg items-start">
                  <div className="flex-1">
                    <p className="text-white text-sm font-medium">{l.tipo}</p>
                    <p className="text-white/50 text-xs mt-0.5">{l.criterio}</p>
                  </div>
                  <p className="text-white/60 text-xs text-right max-w-[200px]">{l.acao}</p>
                </div>
              ))}
            </div>
          </div>

          <Entregavel texto="Lead Qualificado — Ficha ICP 100% preenchida e aprovada pelo Account." />
        </div>

        {/* ── FASE 02: DIAGNÓSTICO ── */}
        <div id="fase-2" className="card scroll-mt-6 space-y-5">
          <PhaseHeader num={2} nome="Diagnóstico" resp="Account" prazo="D+1 a D+3" entregavel="Proposta aprovada + contrato enviado" icon="🔍" />

          <div>
            <p className="text-white/40 text-xs uppercase tracking-wide mb-1">Objetivo</p>
            <p className="text-white/80 text-sm">Proposta só é criada após o diagnóstico completo. Proposta sem diagnóstico é chute.</p>
          </div>

          {/* SPIN */}
          <div>
            <p className="text-white/40 text-xs uppercase tracking-wide mb-3">Roteiro SPIN — 45 a 60 min</p>
            <div className="space-y-3">
              {SPIN.map(s => (
                <div key={s.tipo} className="p-3 bg-brand-navy-soft rounded-lg">
                  <p className="text-brand-orange text-xs font-semibold uppercase tracking-wide mb-2">{s.tipo}</p>
                  <ul className="space-y-1">
                    {s.perguntas.map((p, i) => (
                      <li key={i} className="text-white/70 text-sm flex gap-2">
                        <span className="text-white/20 flex-shrink-0">—</span>{p}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Estrutura da proposta */}
          <div>
            <p className="text-white/40 text-xs uppercase tracking-wide mb-3">Estrutura da Proposta — 1 Página, 7 Blocos</p>
            <div className="space-y-1.5">
              {PROPOSTA_BLOCOS.map((b, i) => (
                <div key={i} className="flex gap-3 p-2.5 bg-brand-navy-soft rounded-lg">
                  <span className="text-brand-orange text-xs font-semibold w-36 flex-shrink-0">{b.bloco}</span>
                  <span className="text-white/60 text-xs">{b.conteudo}</span>
                </div>
              ))}
            </div>
            <div className="mt-2 p-3 bg-status-warning/5 border border-status-warning/20 rounded-lg">
              <p className="text-status-warning text-xs">
                ⚠ Não envie proposta sem apresentação. Apresente ao vivo ou grave um Loom de até 5 minutos.
                Proposta sem contexto é proposta ignorada. SLA: proposta em até 48h após a reunião.
              </p>
            </div>
          </div>

          {/* Objeções */}
          <div>
            <p className="text-white/40 text-xs uppercase tracking-wide mb-3">Objeções mais comuns</p>
            <div className="space-y-2">
              {OBJECOES.map((o, i) => (
                <div key={i} className="p-3 bg-brand-navy-soft rounded-lg">
                  <p className="text-white font-medium text-sm mb-1">{o.objecao}</p>
                  <p className="text-white/60 text-xs">{o.resposta}</p>
                </div>
              ))}
            </div>
          </div>

          <Entregavel texto="Proposta de 1 página assinada + contrato enviado para formalização." />
        </div>

        {/* ── FASE 03: ONBOARDING ── */}
        <div id="fase-3" className="card scroll-mt-6 space-y-5">
          <PhaseHeader num={3} nome="Onboarding" resp="CS" prazo="D+1 a D+2" entregavel="Cliente ativado — briefing aprovado" icon="🚀" />

          <div>
            <p className="text-white/40 text-xs uppercase tracking-wide mb-1">Objetivo</p>
            <p className="text-white/80 text-sm">Fazer o cliente sentir que tomou a decisão certa nas primeiras 48 horas.</p>
          </div>

          <div>
            <p className="text-white/40 text-xs uppercase tracking-wide mb-3">Checklist de Onboarding — Dia 1 e 2</p>
            <div className="space-y-2">
              {CHECKLIST_ONBOARDING.map((item, i) => (
                <div key={i} className="flex gap-3 p-2.5 bg-brand-navy-soft rounded-lg items-start">
                  <span className="text-brand-orange mt-0.5 flex-shrink-0">☐</span>
                  <span className="text-white/70 text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <Entregavel texto="Briefing completo aprovado pelo cliente + acessos ativos e testados." />
        </div>

        {/* ── FASE 04: PLANEJAMENTO ── */}
        <div id="fase-4" className="card scroll-mt-6 space-y-5">
          <PhaseHeader num={4} nome="Planejamento" resp="Estrategista" prazo="D+3 a D+7" entregavel="Plano 90 dias + calendário aprovados" icon="📋" />

          <div>
            <p className="text-white/40 text-xs uppercase tracking-wide mb-1">Objetivo</p>
            <p className="text-white/80 text-sm">Construir o plano de 90 dias com base no diagnóstico e nos objetivos do cliente.</p>
          </div>

          <div>
            <p className="text-white/40 text-xs uppercase tracking-wide mb-3">Estrutura do Plano de 90 Dias</p>
            <div className="space-y-2">
              {PLANO_90_DIAS.map((b, i) => (
                <div key={i} className="flex gap-3 p-3 bg-brand-navy-soft rounded-lg">
                  <span className="text-brand-orange text-xs font-semibold w-44 flex-shrink-0">{b.bloco}</span>
                  <span className="text-white/60 text-xs">{b.define}</span>
                </div>
              ))}
            </div>
          </div>

          <Entregavel texto="Plano de 90 dias + calendário editorial do primeiro mês aprovados pelo cliente." />
        </div>

        {/* ── FASE 05: PRODUÇÃO ── */}
        <div id="fase-5" className="card scroll-mt-6 space-y-5">
          <PhaseHeader num={5} nome="Produção" resp="Criativo" prazo="Recorrente" entregavel="Conteúdo aprovado e publicado" icon="⚙️" />

          <div>
            <p className="text-white/40 text-xs uppercase tracking-wide mb-1">Objetivo</p>
            <p className="text-white/80 text-sm">Produzir, revisar e publicar o conteúdo dentro dos prazos acordados no SLA.</p>
          </div>

          <div>
            <p className="text-white/40 text-xs uppercase tracking-wide mb-3">Fluxo de Produção por Peça</p>
            <div className="space-y-1.5">
              {FLUXO_PRODUCAO.map((f, i) => (
                <div key={i} className="flex gap-3 p-2.5 bg-brand-navy-soft rounded-lg items-start">
                  <div className="w-5 h-5 bg-brand-orange/20 rounded flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-brand-orange text-xs font-bold">{i + 1}</span>
                  </div>
                  <div>
                    <p className="text-white text-xs font-medium">{f.etapa}</p>
                    <p className="text-white/50 text-xs">{f.acao}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <p className="text-white/40 text-xs uppercase tracking-wide mb-3">Regras de Produção</p>
            <div className="space-y-1.5">
              {REGRAS_PRODUCAO.map((r, i) => (
                <div key={i} className="flex gap-2 p-2.5 bg-brand-navy-soft rounded-lg">
                  <span className="text-brand-orange flex-shrink-0">☐</span>
                  <span className="text-white/70 text-sm">{r}</span>
                </div>
              ))}
            </div>
          </div>

          <Entregavel texto="Conteúdo aprovado, publicado e registrado no calendário editorial." />
        </div>

        {/* ── FASE 06: RELATÓRIO ── */}
        <div id="fase-6" className="card scroll-mt-6 space-y-5">
          <PhaseHeader num={6} nome="Relatório" resp="Analista" prazo="Dia 5/mês" entregavel="Dados analisados + plano do próximo mês" icon="📊" />

          <div>
            <p className="text-white/40 text-xs uppercase tracking-wide mb-1">Objetivo</p>
            <p className="text-white/80 text-sm">Apresentar o resultado do mês com análise real e plano de ação para o próximo período.</p>
          </div>

          <div>
            <p className="text-white/40 text-xs uppercase tracking-wide mb-3">Estrutura do Relatório Mensal</p>
            <div className="space-y-1.5">
              {RELATORIO_BLOCOS.map((b, i) => (
                <div key={i} className="flex gap-3 p-2.5 bg-brand-navy-soft rounded-lg">
                  <span className="text-brand-orange text-xs font-semibold w-36 flex-shrink-0">{b.bloco}</span>
                  <span className="text-white/60 text-xs">{b.conteudo}</span>
                </div>
              ))}
            </div>
            <div className="mt-2 p-3 bg-status-warning/5 border border-status-warning/20 rounded-lg">
              <p className="text-status-warning text-xs">
                ⚠ Relatório não é planilha de dados. É análise com diagnóstico. Número sem contexto não ajuda o cliente a decidir.
                SLA: entregue até o dia 5 de cada mês.
              </p>
            </div>
          </div>

          <Entregavel texto="Relatório enviado + reunião de apresentação agendada ou realizada." />
        </div>

        {/* ── FASE 07: RETENÇÃO ── */}
        <div id="fase-7" className="card scroll-mt-6 space-y-5">
          <PhaseHeader num={7} nome="Retenção" resp="CS + Account" prazo="Contínuo" entregavel="Cliente renovado e indicando" icon="🤝" />

          <div>
            <p className="text-white/40 text-xs uppercase tracking-wide mb-1">Objetivo</p>
            <p className="text-white/80 text-sm">Manter o cliente ativo, satisfeito e transformá-lo em fonte ativa de indicações.</p>
          </div>

          {/* Protocolo 30-60-90 */}
          <div>
            <p className="text-white/40 text-xs uppercase tracking-wide mb-3">Protocolo de Contato 30-60-90 Dias</p>
            <div className="space-y-2">
              {PROTOCOLO_CONTATO.map((p, i) => (
                <div key={i} className="flex gap-3 p-2.5 bg-brand-navy-soft rounded-lg items-start">
                  <span className="text-brand-orange text-xs font-bold w-20 flex-shrink-0">{p.momento}</span>
                  <span className="text-white/70 text-sm">{p.acao}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Sinais de risco */}
          <div>
            <p className="text-white/40 text-xs uppercase tracking-wide mb-3">Sinais de Risco de Churn — Agir imediatamente</p>
            <div className="space-y-1.5">
              {SINAIS_CHURN.map((s, i) => (
                <div key={i} className="flex gap-2 p-2.5 bg-status-danger/5 border border-status-danger/20 rounded-lg">
                  <span className="text-status-danger flex-shrink-0 text-xs">⚠</span>
                  <span className="text-white/70 text-sm">{s}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Escada de recomendação */}
          <div>
            <p className="text-white/40 text-xs uppercase tracking-wide mb-3">Escada de Recomendação — Objetivo: Nível 4 ou 5</p>
            <div className="space-y-1.5">
              {ESCADA_RECOMENDACAO.map((e, i) => (
                <div key={i} className="flex gap-3 p-2.5 bg-brand-navy-soft rounded-lg items-center">
                  <span className="text-brand-orange text-xs font-semibold w-36 flex-shrink-0">{e.nivel}</span>
                  <span className="text-white/60 text-xs">{e.comportamento}</span>
                </div>
              ))}
            </div>
          </div>

          <Entregavel texto="Cliente renovado com contrato ativo — ou indicação gerada documentada no CRM." />
        </div>

        {/* ── PRIMEIROS 7 DIAS ── */}
        <div id="primeiros-7-dias" className="card scroll-mt-6">
          <h3 className="text-brand-orange font-bold text-base mb-1">Primeiros 7 Dias — Ações Prioritárias</h3>
          <p className="text-white/50 text-xs mb-4">Execute na ordem. Sem atalhos. Para todo novo cliente.</p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left text-white/40 text-xs uppercase py-2 pr-3 w-10">Dia</th>
                  <th className="text-left text-white/40 text-xs uppercase py-2 pr-3">Ação</th>
                  <th className="text-left text-white/40 text-xs uppercase py-2 pr-3">Responsável</th>
                  <th className="text-left text-white/40 text-xs uppercase py-2">Entregável</th>
                </tr>
              </thead>
              <tbody>
                {PRIMEIROS_7_DIAS.map((r, i) => (
                  <tr key={i} className="border-b border-white/5 hover:bg-brand-navy-soft/50">
                    <td className="py-2.5 pr-3">
                      <span className="inline-flex w-6 h-6 items-center justify-center rounded-full bg-brand-orange/20 text-brand-orange text-xs font-bold">
                        {r.dia}
                      </span>
                    </td>
                    <td className="py-2.5 pr-3 text-white/80 text-xs">{r.acao}</td>
                    <td className="py-2.5 pr-3 text-white/50 text-xs">{r.responsavel}</td>
                    <td className="py-2.5 text-status-ok text-xs">{r.entregavel}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Indicadores Globais */}
        <div className="card">
          <h3 className="text-brand-orange font-bold mb-4">Indicadores Globais da Agência Kolhey</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            {[
              { kpi: 'Churn Rate', formula: '(Clientes perdidos / Total) × 100', meta: '< 5% ao mês' },
              { kpi: 'LTV (Lifetime Value)', formula: 'Ticket médio × Tempo médio de contrato', meta: '> 12× o CAC' },
              { kpi: 'NPS (Net Promoter Score)', formula: '% Promotores − % Detratores', meta: '> 50 (Excelente: > 70)' },
              { kpi: 'Taxa de Upsell', formula: 'Clientes com upgrade / Total de ativos', meta: '> 20% ao trimestre' },
              { kpi: 'Tempo de Onboarding', formula: 'Data de kickoff − Data de assinatura', meta: '≤ 7 dias corridos' },
              { kpi: 'SLA de Relatório', formula: 'Relatórios entregues até dia 5 útil', meta: '100%' },
              { kpi: 'Taxa de Aprovação de Conteúdo', formula: 'Aprovados de primeira / Total enviados', meta: '> 80%' },
              { kpi: 'ROI de Tráfego Pago', formula: '(Receita gerada − Investimento) / Investimento', meta: '≥ 3× (300%)' },
            ].map(item => (
              <div key={item.kpi} className="p-3 bg-brand-navy-soft rounded-lg">
                <p className="text-brand-orange font-medium text-xs mb-1">{item.kpi}</p>
                <p className="text-white/50 text-xs mb-1">Fórmula: {item.formula}</p>
                <p className="text-white/80 text-xs">Meta: <span className="text-status-ok">{item.meta}</span></p>
              </div>
            ))}
          </div>
        </div>

        <p className="text-white/20 text-xs text-center pb-4">
          Agência Kolhey · Método Operacional Simplificado · 2026 · Documento confidencial — Uso interno
        </p>
      </main>
    </div>
  )
}

// ─── Sub-componentes ─────────────────────────────────────────────────────────

function PhaseHeader({
  num, nome, resp, prazo, entregavel, icon,
}: {
  num: number; nome: string; resp: string; prazo: string; entregavel: string; icon: string
}) {
  return (
    <div className="flex items-start gap-4 pb-4 border-b border-white/10">
      <div className="w-12 h-12 bg-brand-orange rounded-xl flex items-center justify-center flex-shrink-0">
        <span className="text-2xl">{icon}</span>
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <h3 className="text-white font-bold text-base">Fase {num.toString().padStart(2, '0')}: {nome}</h3>
          <span className="text-xs px-2.5 py-0.5 rounded-full bg-brand-orange-muted text-brand-orange border border-brand-orange/20">
            {prazo}
          </span>
        </div>
        <p className="text-white/40 text-xs mt-0.5">Responsável: {resp}</p>
        <p className="text-white/30 text-xs mt-0.5">Entregável: <span className="text-white/50">{entregavel}</span></p>
      </div>
    </div>
  )
}

function Entregavel({ texto }: { texto: string }) {
  return (
    <div className="flex gap-2 p-3 bg-status-ok/5 border border-status-ok/20 rounded-lg">
      <span className="text-status-ok flex-shrink-0">✓</span>
      <p className="text-white/80 text-sm"><strong className="text-status-ok">Entregável da fase:</strong> {texto}</p>
    </div>
  )
}
