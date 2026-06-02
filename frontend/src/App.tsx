import { useState } from 'react'
import { Header } from '@/components/layout/Header'
import { RegistrosFiltros } from '@/components/registros/RegistrosFiltros'
import { RegistrosTable } from '@/components/registros/RegistrosTable'
import { UploadSheet } from '@/components/upload/UploadSheet'
import { useRegistros } from '@/hooks/registros/useRegistros'

interface Filtros {
  dataInicio: string
  dataFim: string
  empresa: string
}

export default function App() {
  const [uploadAberto, setUploadAberto] = useState(false)
  const [filtros, setFiltros] = useState<Filtros>({ dataInicio: '', dataFim: '', empresa: '' })

  const { data: registros = [], isLoading } = useRegistros({
    dataInicio: filtros.dataInicio || undefined,
    dataFim: filtros.dataFim || undefined,
    empresa: filtros.empresa || undefined,
  })

  return (
    <div className="min-h-screen bg-background">
      <Header onUploadClick={() => setUploadAberto(true)} />

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold">Registros de ponto</h2>
            <p className="text-sm text-muted-foreground">
              {registros.length} {registros.length === 1 ? 'registro' : 'registros'} encontrados
            </p>
          </div>
        </div>

        <RegistrosFiltros onFiltrar={setFiltros} />
        <RegistrosTable registros={registros} isLoading={isLoading} />
      </main>

      <UploadSheet aberto={uploadAberto} onFechar={() => setUploadAberto(false)} />
    </div>
  )
}
