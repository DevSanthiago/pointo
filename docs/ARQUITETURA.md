# Arquitetura — PointO

## Visão geral

```
┌─────────────────────┐         ┌──────────────────────┐
│     Frontend         │  HTTP   │      Backend          │
│  React + Vite       │ ──────► │   C# .NET 8 (Railway) │
│  (Vercel)           │         │                        │
└─────────────────────┘         └──────────┬─────────────┘
                                           │
                              ┌────────────┴────────────┐
                              │        Supabase          │
                              │  PostgreSQL + Storage    │
                              └─────────────────────────┘
```

## Backend — Clean Architecture

### Fluxo de uma requisição

```
HTTP Request
  └─► RegistrosController          (API)
        └─► MediatR.Send(Command)
              └─► ValidationBehavior (FluentValidation)
                    └─► CommandHandler             (Application)
                          ├─► IStorageService       → Supabase Storage
                          └─► IRegistroRepository   → PostgreSQL
                                └─► AppDbContext    (Infrastructure/EF Core)
```

### Camadas

| Camada | Responsabilidade | Dependências |
|---|---|---|
| `PointO.Domain` | Entidades ricas, enums | Nenhuma |
| `PointO.Application` | Casos de uso, interfaces, DTOs | Domain |
| `PointO.Infrastructure` | EF Core, repositórios, Supabase Storage | Application, Domain |
| `PointO.API` | Controllers, middleware, DI, Program.cs | Application, Infrastructure |

### Endpoints

| Método | Rota | Descrição |
|---|---|---|
| `GET` | `/api/v1/registros` | Lista com filtro por data e empresa |
| `GET` | `/api/v1/registros/data/{data}` | Busca registros de uma data específica |
| `POST` | `/api/v1/registros` | Cria registro com upload de imagem (multipart/form-data) |
| `PUT` | `/api/v1/registros/{id}` | Atualiza campos de um registro |
| `DELETE` | `/api/v1/registros/{id}` | Remove registro e imagem do Storage |

### Modelo de dados

```sql
registros_ponto
├── id               UUID        PK
├── empresa          VARCHAR(200) NOT NULL
├── cnpj             VARCHAR(18)  NOT NULL
├── local            VARCHAR(300)
├── nome_funcionario VARCHAR(200) NOT NULL
├── data_ponto       DATE         NOT NULL    ← indexado
├── horario_ponto    TIME         NOT NULL
├── imagem_url       VARCHAR(1000) NOT NULL
├── imagem_path      VARCHAR(500)  NOT NULL
├── status           INT          NOT NULL (1=Ativo, 2=Arquivado)
├── criado_em        TIMESTAMPTZ  NOT NULL
└── atualizado_em    TIMESTAMPTZ
```

## Frontend — Separação de responsabilidades

```
components/  ← JSX puro, só renderiza
hooks/       ← toda a lógica (queries, mutations, estado)
services/    ← configuração do axios
types/       ← contratos TypeScript
```

### Fluxo de dados

```
App.tsx
  ├─ useRegistros() → TanStack Query → axios → /api/v1/registros
  ├─ RegistrosFiltros.tsx  (estado local, callback para App)
  ├─ RegistrosTable.tsx
  │   ├─ TanStack Table (sort, render)
  │   ├─ useDeletarRegistro() → mutation
  │   └─ EditarRegistroDialog.tsx → useAtualizarRegistro()
  └─ UploadSheet.tsx
      └─ useCriarRegistro() → mutation (FormData multipart)
```
