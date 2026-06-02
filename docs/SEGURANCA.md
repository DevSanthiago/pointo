# Segurança — PointO

## Credenciais e segredos

- **Nunca versione** `appsettings.local.json`, `.env`, `.env.local`
- Use variáveis de ambiente no Railway e Vercel em produção
- O arquivo `.env.example` e `backend/.env.example` servem apenas de template

## Supabase

- Use a **Service Role Key** apenas no backend (nunca exponha no frontend)
- A **Anon Key** é para o frontend — não dá acesso ao Storage se configurado com RLS
- Configure o bucket `comprovantes` como **privado** no Supabase; as URLs públicas são geradas pelo backend

## CORS

- Configurado em `Program.cs` via `AllowedOrigins` — aceita apenas domínios explicitamente listados
- Em produção: `AllowedOrigins=https://seu-app.vercel.app`
- Nunca use `AllowAnyOrigin()` em produção

## Validação

- Todos os inputs são validados via **FluentValidation** no backend antes de qualquer operação
- O tipo e tamanho da imagem são verificados (`image/*`) antes do upload
- O frontend usa **Zod** para validação de formulários

## Upload de arquivos

- Aceita apenas `Content-Type: image/*`
- O nome do arquivo salvo no Storage é um UUID gerado no servidor — o nome original não é usado no path
- Limite de tamanho deve ser configurado no `Program.cs` via `services.Configure<FormOptions>` se necessário

## SQL Injection

- Não há risco — todo acesso ao banco é via **EF Core** com parâmetros seguros (sem SQL raw)

## XSS

- O frontend nunca usa `dangerouslySetInnerHTML`
- URLs de imagem vêm do backend (Supabase Storage) e são usadas apenas em `<img src>` e `<a href>`
