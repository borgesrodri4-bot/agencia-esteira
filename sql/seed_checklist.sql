-- ============================================================
-- SEED: Itens de Checklist das 7 Fases
-- Execute APÓS o schema.sql
-- ============================================================

INSERT INTO checklist_items (phase, phase_slug, order_index, title, sla_hours) VALUES

-- ===== FASE 1: Captação (SLA 24h) =====
(1, 'captacao', 1, 'Lead registrado no CRM com dados completos', 2),
(1, 'captacao', 2, 'Qualificação do lead realizada (BANT ou similar)', 4),
(1, 'captacao', 3, 'Primeiro contato feito em menos de 2h do lead', 2),
(1, 'captacao', 4, 'Reunião de descoberta agendada', 8),
(1, 'captacao', 5, 'Proposta comercial enviada ao lead', 24),

-- ===== FASE 2: Diagnóstico (SLA 48-72h) =====
(2, 'diagnostico', 1, 'Briefing completo coletado com o cliente', 8),
(2, 'diagnostico', 2, 'Análise da presença digital atual realizada', 24),
(2, 'diagnostico', 3, 'Benchmark de 3 concorrentes diretos realizado', 48),
(2, 'diagnostico', 4, 'Persona / ICP inicial mapeada', 48),
(2, 'diagnostico', 5, 'Relatório de diagnóstico entregue ao cliente', 72),

-- ===== FASE 3: Onboarding (SLA 7 dias) =====
(3, 'onboarding', 1, 'Contrato assinado e arquivado', 24),
(3, 'onboarding', 2, 'NF ou recibo emitido e enviado', 48),
(3, 'onboarding', 3, 'Acesso ao Meta Business Suite recebido', 48),
(3, 'onboarding', 4, 'Acesso ao Google Analytics / Search Console recebido', 48),
(3, 'onboarding', 5, 'Pixel do Meta e Google Tag instalados e testados', 72),
(3, 'onboarding', 6, 'Reunião de kickoff realizada com todos os envolvidos', 120),
(3, 'onboarding', 7, 'Pauta de conteúdo do mês 1 apresentada e aprovada', 168),
(3, 'onboarding', 8, 'Grupo de comunicação com o cliente criado (WhatsApp/Slack)', 24),

-- ===== FASE 4: Planejamento (SLA 15 dias) =====
(4, 'planejamento', 1, 'Persona ICP definitiva documentada e aprovada', 72),
(4, 'planejamento', 2, 'Calendário editorial do mês criado e aprovado', 96),
(4, 'planejamento', 3, 'Estrutura de campanhas de tráfego pago definida', 96),
(4, 'planejamento', 4, 'Orçamento de tráfego distribuído por campanha', 120),
(4, 'planejamento', 5, 'Metas mensais e KPIs acordados formalmente', 120),
(4, 'planejamento', 6, 'Plano estratégico de 90 dias entregue ao cliente', 360),

-- ===== FASE 5: Produção (mensal contínuo) =====
(5, 'producao', 1, 'Conteúdos da semana 1 produzidos e aprovados pelo cliente', NULL),
(5, 'producao', 2, 'Conteúdos da semana 1 publicados nos horários planejados', NULL),
(5, 'producao', 3, 'Campanhas de tráfego da semana 1 ativas e monitoradas', NULL),
(5, 'producao', 4, 'Conteúdos da semana 2 produzidos e aprovados', NULL),
(5, 'producao', 5, 'Conteúdos da semana 2 publicados', NULL),
(5, 'producao', 6, 'Conteúdos da semana 3 produzidos e aprovados', NULL),
(5, 'producao', 7, 'Conteúdos da semana 3 publicados', NULL),
(5, 'producao', 8, 'Conteúdos da semana 4 produzidos e aprovados', NULL),
(5, 'producao', 9, 'Conteúdos da semana 4 publicados', NULL),
(5, 'producao', 10, 'Acompanhamento semanal de métricas realizado', NULL),

-- ===== FASE 6: Relatório (SLA 5º dia útil) =====
(6, 'relatorio', 1, 'Dados de alcance e impressões coletados', 24),
(6, 'relatorio', 2, 'Métricas de engajamento consolidadas', 48),
(6, 'relatorio', 3, 'Métricas de tráfego pago e conversão compiladas', 48),
(6, 'relatorio', 4, 'Relatório mensal redigido com análise e insights', 72),
(6, 'relatorio', 5, 'Relatório enviado ao cliente por e-mail', 96),
(6, 'relatorio', 6, 'Reunião de apresentação de resultados realizada', 120),
(6, 'relatorio', 7, 'Próximos objetivos documentados com base nos resultados', 120),

-- ===== FASE 7: Retenção (mensal contínuo) =====
(7, 'retencao', 1, 'NPS coletado do cliente (pesquisa de satisfação)', 24),
(7, 'retencao', 2, 'Análise do NPS realizada e ações definidas', 48),
(7, 'retencao', 3, 'Oportunidades de upsell ou expansão de escopo identificadas', 48),
(7, 'retencao', 4, 'Reunião de alinhamento estratégico mensal realizada', 72),
(7, 'retencao', 5, 'Renovação ou expansão de contrato discutida formalmente', 96),
(7, 'retencao', 6, 'Próximos 90 dias planejados e documentados', 120);
