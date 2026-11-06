# GO! · como colocar no ar (Vercel + Supabase)

Tudo gratuito. Leva uns 20 minutos na primeira vez.

## 1. Supabase
Já está pronto: projeto **go-app** (São Paulo), tabela e regras de segurança criadas e chaves coladas no `config.js`. Não precisa mexer.

## 2. GitHub (onde os arquivos ficam guardados)
1. Crie uma conta em github.com → **New repository** → nome `go-app` → **Create**.
2. Clique em **uploading an existing file**, arraste TODOS os arquivos desta pasta (inclusive a pasta `fonts`) e clique em **Commit changes**.

## 3. Vercel (coloca o site no ar)
1. Entre em vercel.com com a sua conta do GitHub → **Add New → Project**.
2. Escolha o repositório `go-app` → **Deploy** (não precisa mudar nenhuma configuração).
3. Pronto: o Vercel te dá um endereço tipo `go-app.vercel.app`.

## 4. Ajuste final no Supabase (links de e-mail)
Em **Authentication → URL Configuration**:
- **Site URL**: cole o endereço do Vercel (ex.: https://go-app.vercel.app)
- **Redirect URLs**: adicione o mesmo endereço.

Assim os links de "confirmar e-mail" e "esqueci minha senha" voltam pro app.

Opcional: em **Authentication → Sign In / Providers → Email**, desligar **Confirm email** faz a pessoa entrar direto, sem precisar confirmar o e-mail.

## Para atualizar o app depois
Substitua o arquivo no GitHub (Add file → Upload files). O Vercel publica a nova versão sozinho em ~1 minuto.

## Usar como app no celular
iPhone: abra o endereço no Safari → Compartilhar → **Adicionar à Tela de Início**.
Android: Chrome → menu ⋮ → **Instalar app**.

## Bom saber
- Cada pessoa só vê os próprios dados (regras de segurança do arquivo `supabase.sql`).
- Você, como dona do projeto, consegue ver os dados no painel do Supabase. Se for abrir para outras pessoas, deixe isso claro numa política de privacidade simples (LGPD).
- Plano gratuito do Supabase: projetos parados por 7 dias são pausados; é só entrar no painel e reativar.
- Se o `config.js` ficar sem as chaves, o app funciona só no aparelho, sem login.
