import { useEffect, useState } from 'react'

const INTERVALO_MS = 60_000

/**
 * Verifica /version.json (gerado no build com o commit SHA) periodicamente e ao
 * focar a aba. Se a versão publicada difere da versão carregada (__APP_VERSION__),
 * sinaliza que há atualização disponível. Em dev o arquivo não existe (404) e nada
 * dispara.
 */
export function useAtualizacaoDisponivel(): boolean {
  const [disponivel, setDisponivel] = useState(false)

  useEffect(() => {
    if (disponivel) return
    let ativo = true

    const checar = async () => {
      if (document.hidden) return
      try {
        const resp = await fetch(`/version.json?t=${Date.now()}`, { cache: 'no-store' })
        if (!resp.ok) return
        const { versao } = (await resp.json()) as { versao?: string }
        if (ativo && versao && versao !== __APP_VERSION__) setDisponivel(true)
      } catch {
        // offline ou arquivo ausente — ignora
      }
    }

    const id = setInterval(checar, INTERVALO_MS)
    window.addEventListener('focus', checar)
    document.addEventListener('visibilitychange', checar)
    checar()

    return () => {
      ativo = false
      clearInterval(id)
      window.removeEventListener('focus', checar)
      document.removeEventListener('visibilitychange', checar)
    }
  }, [disponivel])

  return disponivel
}
