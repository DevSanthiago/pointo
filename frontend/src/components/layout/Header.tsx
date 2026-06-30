import { LogOut, Upload } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/contexts/AuthContext'

interface HeaderProps {
  onUploadClick: () => void
}

export function Header({ onUploadClick }: HeaderProps) {
  const { logout } = useAuth()

  return (
    <header
      className="sticky top-0 z-40 border-b border-border bg-card"
      style={{ paddingTop: 'env(safe-area-inset-top)' }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/icons/icon-192.png" alt="PointO" className="h-8 w-8 rounded-md" />
            <div>
              <h1 className="text-base font-semibold leading-none">PointO</h1>
              <p className="text-xs text-muted-foreground mt-0.5">
                Registro de ponto <span className="tabular-nums opacity-70">· v{__APP_VERSION__}</span>
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button onClick={onUploadClick}>
              <Upload />
              Novo registro
            </Button>
            <div className="flex items-center border-l border-border pl-3">
              <Button variant="ghost" size="icon" onClick={logout} title="Sair">
                <LogOut />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
