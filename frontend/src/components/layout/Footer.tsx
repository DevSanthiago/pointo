export function Footer() {
  const ano = new Date().getFullYear()

  return (
    <footer
      className="border-t border-border bg-card"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <div className="mx-auto max-w-7xl px-4 py-4 text-center text-xs text-muted-foreground sm:px-6 lg:px-8">
        © {ano} · Desenvolvido por Dev Santhiago
      </div>
    </footer>
  )
}
