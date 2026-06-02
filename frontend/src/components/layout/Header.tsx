import { Upload } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface HeaderProps {
  onUploadClick: () => void
}

export function Header({ onUploadClick }: HeaderProps) {
  return (
    <header className="border-b border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground font-bold text-sm">
              P
            </div>
            <div>
              <h1 className="text-base font-semibold leading-none">PointO</h1>
              <p className="text-xs text-muted-foreground mt-0.5">Registro de ponto</p>
            </div>
          </div>
          <Button onClick={onUploadClick}>
            <Upload />
            Novo registro
          </Button>
        </div>
      </div>
    </header>
  )
}
