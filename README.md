# PointO

Aplicação web para upload e gerenciamento de comprovantes de registro de ponto.

## Funcionalidades

- Upload de imagem do comprovante com preenchimento manual dos dados
- Tabela de registros com filtros por data e empresa
- Busca de registros por data específica
- Edição e exclusão de registros
- Imagens armazenadas no Supabase Storage

## Stack

| Camada | Tecnologia |
|---|---|
| Frontend | React 19 + Vite + TypeScript + shadcn/ui + Tailwind CSS v4 |
| Backend | C# .NET 8 — Clean Architecture + CQRS + MediatR |
| Banco de dados | Supabase (PostgreSQL + Storage) |
| Hosting backend | Railway |
| Hosting frontend | Vercel |

## Estrutura do repositório

```
PointO/
├── backend/
│   └── src/
│       ├── PointO.API/           # Endpoints, middleware, configuração
│       ├── PointO.Application/   # Casos de uso (CQRS), DTOs, interfaces
│       ├── PointO.Domain/        # Entidades e enums
│       └── PointO.Infrastructure/ # EF Core, repositórios, Supabase Storage
├── frontend/
│   └── src/
│       ├── components/           # Componentes por domínio
│       ├── hooks/                # Lógica separada por domínio
│       ├── services/             # Configuração do axios
│       └── types/                # Tipos TypeScript
└── docs/                         # Documentação técnica
```

## Configuração local

Veja [docs/CONFIGURACAO.md](docs/CONFIGURACAO.md) para instruções de setup.

## Deploy

Veja [docs/DEPLOY.md](docs/DEPLOY.md) para o guia de deploy no Railway e Vercel.
