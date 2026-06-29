# PointO

Aplicação web para upload e gerenciamento de comprovantes de registro de ponto.

## Funcionalidades

- Autenticação JWT multi-usuário (cadastro aberto); cada usuário só vê os próprios registros
- Upload de imagem do comprovante com preenchimento manual dos dados (drawer que sobe da parte inferior, pensado para mobile)
- Auto-preenchimento de empresa/CNPJ/local/colaborador a partir do último registro do servidor — sobrevive à limpeza do cache do navegador
- Tabela de registros paginada (server-side) com filtros por data e empresa; cards no mobile, tabela no desktop
- Visualização do comprovante em modal (sem abrir nova aba)
- Busca de registros por data específica
- Edição e exclusão de registros
- Imagens armazenadas no Supabase Storage
- **PWA instalável** (iOS/Android) — "Adicionar à Tela de Início", roda em tela cheia (standalone)
- **Versionamento + atualização automática** — a cada deploy a versão (semver, ex. `1.0.0`) muda; o app detecta a nova versão e exibe um modal com contagem regressiva de 5s antes de recarregar

## Stack

| Camada | Tecnologia |
|---|---|
| Frontend | React 19 + Vite + TypeScript + shadcn/ui + Tailwind CSS v4 + PWA (vite-plugin-pwa) |
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

## Versionamento e atualização

A versão exibida no app vem de `frontend/package.json` (`version`, semver). No build,
o Vite injeta essa versão em `__APP_VERSION__` e emite `frontend/dist/version.json`.

Em produção o app busca `/version.json` periodicamente (a cada 60s e ao focar a aba) e
compara com a versão carregada. Se forem diferentes, abre um modal com contagem
regressiva de 5s e recarrega para aplicar a nova versão (o service worker já trocou os
assets em segundo plano).

> A cada deploy com mudanças, faça bump da versão em `frontend/package.json`
> (ex.: `1.0.0` → `1.0.1`) para que o modal de atualização dispare nos apps abertos.
