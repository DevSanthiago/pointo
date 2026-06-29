import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig, type Plugin } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

// Versão do app = commit curto da Vercel (VERCEL_GIT_COMMIT_SHA); 'dev' em local.
const versao = (process.env.VERCEL_GIT_COMMIT_SHA ?? 'dev').slice(0, 7)

// Emite /version.json no build para o app comparar e oferecer atualização.
function emitVersionJson(): Plugin {
  return {
    name: 'emit-version-json',
    apply: 'build',
    generateBundle() {
      this.emitFile({
        type: 'asset',
        fileName: 'version.json',
        source: JSON.stringify({ versao, geradoEm: new Date().toISOString() }),
      })
    },
  }
}

export default defineConfig({
  define: {
    __APP_VERSION__: JSON.stringify(versao),
  },
  plugins: [
    react(),
    tailwindcss(),
    emitVersionJson(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['icons/favicon.ico', 'icons/icon-180.png'],
      // Não interceptar version.json nem a API — precisam vir sempre da rede.
      workbox: {
        navigateFallbackDenylist: [/^\/version\.json$/],
        globIgnores: ['**/version.json'],
      },
      manifest: {
        name: 'PointO — Registro de ponto',
        short_name: 'PointO',
        description: 'Upload e gerenciamento de comprovantes de registro de ponto.',
        theme_color: '#000000',
        background_color: '#ffffff',
        display: 'standalone',
        orientation: 'portrait',
        start_url: '/',
        scope: '/',
        icons: [
          { src: '/icons/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
          { src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
          { src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
