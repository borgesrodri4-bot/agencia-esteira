-- ============================================================
-- ESTEIRA DE PRODUÇÃO — Schema do Banco de Dados (Supabase)
-- Execute este SQL no Supabase: SQL Editor > New Query > Run
-- ============================================================

-- 1. Tabela de perfis dos usuários
CREATE TABLE IF NOT EXISTS profiles (
  id          UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name        TEXT NOT NULL,
  role        TEXT NOT NULL DEFAULT 'member' CHECK (role IN ('admin', 'member')),
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Tabela de clientes
CREATE TABLE IF NOT EXISTS clients (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name            TEXT NOT NULL,
  niche           TEXT,
  contact_email   TEXT,
  contact_phone   TEXT,
  current_phase   INTEGER NOT NULL DEFAULT 1 CHECK (current_phase BETWEEN 1 AND 7),
  status          TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'paused', 'churned')),
  responsible_id  UUID REFERENCES profiles(id) ON DELETE SET NULL,
  notes           TEXT,
  started_at      DATE DEFAULT CURRENT_DATE,
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Itens de checklist (definição — igual para todos os clientes)
CREATE TABLE IF NOT EXISTS checklist_items (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  phase        INTEGER NOT NULL CHECK (phase BETWEEN 1 AND 7),
  phase_slug   TEXT NOT NULL,
  order_index  INTEGER NOT NULL,
  title        TEXT NOT NULL,
  sla_hours    INTEGER,
  created_at   TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Respostas do checklist por cliente
CREATE TABLE IF NOT EXISTS checklist_responses (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id           UUID NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
  checklist_item_id   UUID NOT NULL REFERENCES checklist_items(id),
  completed           BOOLEAN NOT NULL DEFAULT FALSE,
  completed_at        TIMESTAMPTZ,
  completed_by        UUID REFERENCES profiles(id) ON DELETE SET NULL,
  note                TEXT,
  UNIQUE (client_id, checklist_item_id)
);

-- 5. Histórico de mudança de fase
CREATE TABLE IF NOT EXISTS phase_history (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id   UUID NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
  from_phase  INTEGER,
  to_phase    INTEGER NOT NULL,
  changed_by  UUID REFERENCES profiles(id) ON DELETE SET NULL,
  changed_at  TIMESTAMPTZ DEFAULT NOW(),
  note        TEXT
);

-- ============================================================
-- TRIGGER: atualiza updated_at nos clientes automaticamente
-- ============================================================
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS clients_updated_at ON clients;
CREATE TRIGGER clients_updated_at
  BEFORE UPDATE ON clients
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================================
-- TRIGGER: cria profile automaticamente quando usuário faz cadastro
-- ============================================================
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, name, role)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1)),
    COALESCE(NEW.raw_user_meta_data->>'role', 'member')
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- ============================================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================================
ALTER TABLE profiles           ENABLE ROW LEVEL SECURITY;
ALTER TABLE clients            ENABLE ROW LEVEL SECURITY;
ALTER TABLE checklist_items    ENABLE ROW LEVEL SECURITY;
ALTER TABLE checklist_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE phase_history      ENABLE ROW LEVEL SECURITY;

-- Políticas: usuários autenticados têm acesso total (agência pequena)
CREATE POLICY "auth_profiles_all"       ON profiles           FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "auth_clients_all"        ON clients            FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "auth_checklist_items_r"  ON checklist_items    FOR SELECT TO authenticated USING (true);
CREATE POLICY "auth_responses_all"      ON checklist_responses FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "auth_history_all"        ON phase_history      FOR ALL TO authenticated USING (true) WITH CHECK (true);
