# Esteira de Produção — Instruções de Instalação e Deploy

## Passo 1 — Instalar Node.js (se ainda não tiver)

1. Acesse: https://nodejs.org
2. Baixe e instale a versão **LTS** (recomendada)
3. Verifique: abra o terminal e rode `node --version`

---

## Passo 2 — Instalar dependências do projeto

Abra o terminal na pasta do projeto e rode:

```bash
npm install
```

---

## Passo 3 — Criar o banco no Supabase

1. Acesse https://supabase.com e crie uma conta gratuita
2. Crie um novo projeto (anote a senha — guarde em local seguro)
3. No menu lateral: **SQL Editor** → **New Query**
4. Copie e cole o conteúdo do arquivo `sql/schema.sql` → clique **Run**
5. Crie outra query e execute o arquivo `sql/seed_checklist.sql`

---

## Passo 4 — Configurar variáveis de ambiente

1. No Supabase: vá em **Settings** → **API**
2. Copie a **Project URL** e a **anon key**
3. Na pasta do projeto, crie um arquivo chamado `.env.local`
4. Cole o seguinte conteúdo com seus dados:

```
NEXT_PUBLIC_SUPABASE_URL=https://SEU_PROJETO.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_chave_anon_aqui
```

---

## Passo 5 — Criar usuários da equipe

No Supabase: vá em **Authentication** → **Users** → **Invite user**

- Insira o e-mail de cada membro da equipe
- Eles receberão um convite por e-mail para definir a senha
- Para tornar alguém admin: execute no SQL Editor:
  ```sql
  UPDATE profiles SET role = 'admin' WHERE name = 'Nome do Colaborador';
  ```

---

## Passo 6 — Rodar localmente

```bash
npm run dev
```

Acesse: http://localhost:3000

---

## Passo 7 — Deploy na Vercel (site online)

1. Crie uma conta em https://vercel.com (é gratuito)
2. Crie um repositório no GitHub e envie o projeto:
   ```bash
   git init
   git add .
   git commit -m "chore: initial commit"
   git remote add origin https://github.com/SEU_USUARIO/agencia-esteira
   git push -u origin main
   ```
3. Na Vercel: clique em **Add New Project** → conecte o repositório
4. Em **Environment Variables**, adicione:
   - `NEXT_PUBLIC_SUPABASE_URL` → sua URL do Supabase
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` → sua chave anon
5. Clique em **Deploy**
6. Pronto! URL pública gerada automaticamente (ex: `agencia-esteira.vercel.app`)

A cada `git push`, a Vercel faz deploy automático.

---

## Estrutura de Rotas

| Rota | O que faz |
|------|-----------|
| `/login` | Tela de entrada |
| `/dashboard` | Painel geral com todos os clientes |
| `/clientes` | Lista de clientes com busca e filtros |
| `/clientes/novo` | Cadastrar novo cliente |
| `/clientes/[id]` | Visão do cliente + progresso das fases |
| `/clientes/[id]/captacao` | Checklist da Fase 1 |
| `/clientes/[id]/diagnostico` | Checklist da Fase 2 |
| `/clientes/[id]/onboarding` | Checklist da Fase 3 |
| `/clientes/[id]/planejamento` | Checklist da Fase 4 |
| `/clientes/[id]/producao` | Checklist da Fase 5 |
| `/clientes/[id]/relatorio` | Checklist da Fase 6 |
| `/clientes/[id]/retencao` | Checklist da Fase 7 |
| `/esteira` | Documento de referência completo |

---

## Dúvidas?

Entre em contato com o administrador do sistema.
