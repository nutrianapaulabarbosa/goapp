
-- ===== Acesso pago (Kiwify) · já aplicado no projeto em 07/11/2026 =====
-- Tabela go_access (e-mail liberado), função go_has_access() e regra que só deixa salvar dados quem tem acesso.
-- Webhook: função "kiwify-webhook" (URL com a chave secreta guardada em go_secrets.kiwify_url_key).
-- Para dar cortesia a alguém:
--   insert into public.go_access(email,status,source) values ('email@exemplo.com','active','cortesia')
--   on conflict (email) do update set status='active', source='cortesia';
