---
name: frontend-design
description: Guia definitivo para desenvolvimento frontend e design de produto. Use esta skill sempre que for solicitado a criar interfaces, componentes, páginas web ou aplicativos frontend. Ela contém os princípios inegociáveis de código sem erros, design inovador e entrega completa.
---

# Frontend Design & Engineering Skill

Esta skill define os padrões obrigatórios para qualquer tarefa de desenvolvimento frontend, design de interface ou criação de componentes.

## Princípios Inegociáveis

1. **CÓDIGO SEM ERROS** — funcional, testado mentalmente, sem bugs.
2. **DESIGN INOVADOR** — visualmente memorável, fora do padrão genérico de IA.
3. **ENTREGA COMPLETA** — nada pela metade, nada para "o usuário implementar depois".

## Fluxo Obrigatório Antes de Escrever Código

Antes de gerar qualquer código, você DEVE executar mentalmente estes 4 passos:

### Passo 1 — Interpretação
- O que exatamente foi pedido?
- Qual o objetivo real por trás do pedido?
- Há ambiguidades? Se sim, assuma a interpretação mais útil e declare-a explicitamente.

### Passo 2 — Arquitetura
- Qual stack/tecnologia é a mais adequada?
- Qual estrutura de código é a mais limpa e escalável?
- Quais são os edge cases e erros prováveis que preciso tratar?

### Passo 3 — Design
- Qual direção estética faz sentido para este contexto? (Ex: editorial, minimalista brutal, retro-futurista, luxury refinado, etc.)
- Qual será o elemento visual que tornará isso INESQUECÍVEL?
- Escolha fontes incomuns e elegantes — **NUNCA** Inter, Arial, Roboto ou fontes genéricas.
- Use paleta coerente com variáveis CSS, com cor dominante + acento forte.
- Adicione movimento intencional: micro-interações, transições suaves, animações de entrada.
- Composição espacial: assimetria, sobreposição, espaço negativo generoso ou densidade controlada.

### Passo 4 — Revisão Mental (Obrigatória)
Percorra todo o código linha a linha mentalmente e responda:
- [ ] Todo import/dependência está declarado?
- [ ] Todas as variáveis foram inicializadas antes do uso?
- [ ] Todos os event handlers funcionam corretamente?
- [ ] Há algum loop infinito ou condição impossível?
- [ ] O layout quebra em telas menores? (responsividade verificada)
- [ ] Há alguma string, chave ou ID hardcoded que deveria ser dinâmico?
- [ ] O código compila/executa sem erros do primeiro ao último caractere?

**Se qualquer item estiver marcado como problemático → CORRIJA antes de entregar.**

## Padrões de Código

- Escreva código completo — sem `// TODO`, sem `/* implementar aqui */`, sem trechos omitidos.
- Use comentários apenas onde a lógica não é óbvia.
- Prefira clareza à esperteza: código legível bate código "inteligente".
- Para HTML/CSS: CSS variables obrigatórias, responsivo por padrão.
- Para React: componentes funcionais, hooks idiomáticos, sem class components desnecessários.
- Para JavaScript/TypeScript: sem `var`, funções bem nomeadas, tratamento de erro explícito.
- Estruture arquivos de forma que outro desenvolvedor entenda sem explicação.

## Padrões de Design

**NUNCA produza:**
- Gradiente roxo em fundo branco.
- Cards genéricos com sombra cinza.
- Layout simétrico e sem personalidade.
- Fontes: Inter, Roboto, Arial, system-ui como escolha principal.

**SEMPRE produza:**
- Uma direção estética clara e declarada antes do código.
- Tipografia com caráter: combine fonte de display marcante + fonte de corpo refinada (ex: Playfair + DM Sans, Syne + Lora, Monument + Neue Montreal).
- Background com profundidade: mesh gradients, texturas noise, padrões geométricos, camadas com transparência.
- Animações de entrada com staggered delay.
- Hover states que surpreendem.
- Um elemento visual que o usuário vai lembrar.

## Formato de Resposta Exigido

Estruture cada entrega de frontend exatamente assim:

### 🎯 Interpretação
[O que foi pedido e como você interpretou]

### 🎨 Direção de Design
[Estética escolhida + justificativa em 2-3 linhas]

### 💻 Código
[Código completo e funcional]

### ✅ Checklist de Revisão
[Lista dos 8 itens revisados com status: OK ou CORRIGIDO]

### 🔧 Como usar / Dependências
[Instruções diretas para rodar — sem suposições]

## Regra Final

Se você não tiver certeza de algo, declare a incerteza e apresente a melhor solução possível com uma nota. Nunca entregue código que você não consegue garantir que funciona. Qualidade > Velocidade. Mas nunca entregue incompleto.

## Referências Adicionais

Para exemplos de padrões de design e componentes, consulte:
- `references/design-patterns.md`
- `references/typography-pairings.md`
