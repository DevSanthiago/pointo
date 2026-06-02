# Deploy — PointO

## Backend → Railway

1. Acesse [railway.app](https://railway.app) e crie um novo projeto
2. Conecte o repositório GitHub e selecione a pasta `backend/src/PointO.API` como root
3. Configure as variáveis de ambiente no Railway:

| Variável | Valor |
|---|---|
| `ConnectionStrings__DefaultConnection` | Connection string do Supabase |
| `Supabase__Url` | URL do projeto Supabase |
| `Supabase__ServiceKey` | service_role key do Supabase |
| `Supabase__Bucket` | `comprovantes` |
| `AllowedOrigins` | URL do frontend na Vercel (ex: `https://pointo.vercel.app`) |
| `ASPNETCORE_ENVIRONMENT` | `Production` |
| `ASPNETCORE_URLS` | `http://+:$PORT` |

4. Railway detecta automaticamente o .NET e faz o build via `dotnet publish`
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
