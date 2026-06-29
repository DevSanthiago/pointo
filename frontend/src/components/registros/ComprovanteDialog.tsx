import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'

interface ComprovanteDialogProps {
  url: string
  legenda: string
  onClose: () => void
}

export function ComprovanteDialog({ url, legenda, onClose }: ComprovanteDialogProps) {
  return (
    <Dialog open onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Comprovante</DialogTitle>
        </DialogHeader>
        <p className="-mt-2 text-xs text-muted-foreground">{legenda}</p>
        <div className="max-h-[70vh] overflow-auto rounded-lg border border-border bg-muted/30">
          <img src={url} alt={`Comprovante — ${legenda}`} className="w-full object-contain" />
        </div>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="self-start text-sm text-primary hover:underline"
        >
          Abrir em nova aba
        </a>
      </DialogContent>
    </Dialog>
  )
}
