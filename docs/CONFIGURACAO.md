# Configuração local — PointO

## Pré-requisitos

- .NET 8 SDK
- Node.js 20+
- Conta no Supabase (gratuita)

## 1. Supabase — configuração inicial

1. Crie um projeto em [supabase.com](https://supabase.com)
2. Em **Storage**, crie um bucket chamado `comprovantes` e marque como **Public**
3. Em **Settings → Database**, copie a **Connection string (.NET)**
4. Em **Settings → API**, copie a **URL** e a **service_role key**

## 2. Backend

```bash
cd backend/src/PointO.API

# Crie o arquivo de configuração local (não versionado)
cp .env.example appsettings.local.json
```

Edite `appsettings.local.json`:
```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Host=db.xxxx.supabase.co;Port=5432;Database=postgres;Username=postgres;Password=SUA_SENHA;SSL Mode=Require"
  },
  "Supabase": {
    "Url": "https://xxxx.supabase.co",
    "ServiceKey": "eyJ...",
    "Bucket": "comprovantes"
  },
  "AllowedOrigins": "http://localhost:5173"
}
```

```bash
# Rodar (as migrations são aplicadas automaticamente no startup)
cd backend/src/PointO.API
dotnet run
```

A API ficará disponível em `http://localhost:5000`.
O Swagger estará em `http://localhost:5000/swagger`.

## 3. Frontend

```bash
cd frontend

# Crie o arquivo de variáveis locais
cp .env.example .env.local
# edite VITE_API_URL=http://localhost:5000

npm install
npm run dev
```

O app estará disponível em `http://localhost:5173`.
