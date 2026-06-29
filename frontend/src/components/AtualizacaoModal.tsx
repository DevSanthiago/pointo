import { useEffect, useState } from 'react'
import { RefreshCw } from 'lucide-react'
import { Button } from '@/components/ui/button'

const SEGUNDOS = 5

/**
 * Modal não dispensável: avisa que há nova versão e recarrega o app ao fim de uma
 * contagem regressiva (barra de progresso). Botão permite atualizar na hora.
 */
export function AtualizacaoModal() {
  const [restante, setRestante] = useState(SEGUNDOS)

  useEffect(() => {
    if (restante <= 0) {
      window.location.reload()
      return
    }
    const id = setTimeout(() => setRestante((r) => r - 1), 1000)
    return () => clearTimeout(id)
  }, [restante])

  const progresso = ((SEGUNDOS - restante) / SEGUNDOS) * 100

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
      <div className="w-full max-w-sm rounded-xl bg-popover p-5 text-popover-foreground shadow-lg ring-1 ring-foreground/10">
        <div className="flex items-center gap-2">
          <RefreshCw className="size-4 text-primary" />
          <h2 className="text-base font-semibold">Nova versão disponível</h2>
        </div>
        <p className="mt-1.5 text-sm text-muted-foreground">
          Atualizando o PointO em {restante}s para carregar a versão mais recente.
        </p>
        <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-primary transition-[width] duration-1000 ease-linear"
            style={{ width: `${progresso}%` }}
          />
        </div>
        <div className="mt-4 flex justify-end">
          <Button size="sm" onClick={() => window.location.reload()}>
            Atualizar agora
          </Button>
        </div>
      </div>
    </div>
  )
}
