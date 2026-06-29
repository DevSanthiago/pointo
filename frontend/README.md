# PointO — Frontend

SPA em React 19 + Vite + TypeScript. UI com shadcn/ui (nova style, `@base-ui/react`) e
Tailwind CSS v4. Server state via TanStack Query; formulários com React Hook Form + Zod.
Empacotado como **PWA** (instalável em iOS/Android) via `vite-plugin-pwa`.

## Scripts

```bash
npm run dev      # desenvolvimento (http://localhost:5173)
npm run build    # type-check (tsc -b) + build de produção (vite build)
npm run preview  # serve o build localmente
npm run lint     # eslint
```

## Variáveis de ambiente

`.env.local`:

```
VITE_API_URL    # URL base do backend, SEM /api/v1 e sem barra final
                # (ex.: http://localhost:5017 em dev; URL do Railway em prod)
```

## Estrutura

```
src/
├── components/
│   ├── ui/                     # shadcn/ui (button, card, table, dialog, sheet, ...)
│   ├── layout/Header.tsx       # cabeçalho + versão do app
│   ├── auth/AuthPage.tsx       # login/cadastro
│   ├── registros/              # tabela, filtros, editar, ver comprovante (modal)
│   ├── upload/UploadSheet.tsx  # drawer inferior de novo registro
│   └── AtualizacaoModal.tsx    # modal de nova versão com contagem regressiva
├── hooks/
│   ├── registros/              # useRegistros, useUltimoRegistro, mutations
│   └── useAtualizacaoDisponivel.ts  # polling de /version.json
├── contexts/AuthContext.tsx    # token + usuário (localStorage)
├── services/api.ts             # axios (Bearer + logout no 401)
└── types/                      # Registro, Auth
```

## PWA e versionamento

- O `vite-plugin-pwa` gera `manifest.webmanifest` + service worker (`registerType: 'autoUpdate'`).
- A versão é o campo `version` do `package.json` (semver). O Vite injeta em `__APP_VERSION__`
  e emite `dist/version.json` no build.
- `useAtualizacaoDisponivel` busca `/version.json` (sem cache) a cada 60s e ao focar a aba.
  Diferença na versão → `AtualizacaoModal` recarrega o app após 5s.
- **A cada deploy com mudanças, faça bump do `version` no `package.json`.**

## Padrões

- Acesso à API só via hooks (TanStack Query); componentes nunca usam axios direto.
- Lógica em hooks; JSX só renderiza.
- Cores sempre via tokens do design system (`bg-primary`, `text-muted-foreground`), nunca hex.
