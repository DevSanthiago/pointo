# Deploy — PointO

## Backend → Railway

O backend é multi-projeto (a API referencia Application/Infrastructure via `../`),
então o deploy usa o **Dockerfile** em `backend/Dockerfile` (contexto `backend/`,
enxerga os 4 projetos). NÃO usar root `backend/src/PointO.API` com Nixpacks — o build falha.

1. Acesse [railway.app](https://railway.app) e crie um novo projeto a partir do repositório GitHub
2. Em **Settings → Root Directory**, defina `backend` (Railway detecta o `Dockerfile` automaticamente)
3. Configure as variáveis de ambiente no Railway:

| Variável | Valor |
|---|---|
| `ConnectionStrings__DefaultConnection` | Connection string do Supabase (session pooler, porta 5432) |
| `Supabase__Url` | URL do projeto Supabase |
| `Supabase__ServiceKey` | service_role key do Supabase |
| `Supabase__Bucket` | `comprovantes` |
| `AllowedOrigins` | URL do frontend na Vercel (definir no passo de CORS) |

4. O Dockerfile já fixa `ASPNETCORE_ENVIRONMENT=Production` e faz o bind em `http://0.0.0.0:$PORT`
   (Railway injeta `PORT`); não é preciso definir `ASPNETCORE_URLS` manualmente.
5. As migrations são aplicadas automaticamente no startup da aplicação

## Frontend → Vercel

1. Acesse [vercel.com](https://vercel.com) e importe o repositório
2. Configure o **Root Directory** como `frontend`
3. Configure a variável de ambiente:

| Variável | Valor |
|---|---|
| `VITE_API_URL` | URL do backend no Railway (ex: `https://pointo-api.up.railway.app`) |

4. Vercel detecta automaticamente o Vite e faz o build com `npm run build`

## Ordem de deploy

1. Deploy do backend no Railway primeiro
2. Copie a URL gerada pelo Railway
3. Configure `VITE_API_URL` na Vercel com essa URL
4. Deploy do frontend na Vercel
5. Copie a URL gerada pela Vercel
6. Atualize `AllowedOrigins` no Railway com a URL da Vercel
7. Redeploy do backend para aplicar o CORS atualizado
