import { useState } from 'react'
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  flexRender,
  type ColumnDef,
  type SortingState,
} from '@tanstack/react-table'
import { ArrowUpDown, ExternalLink, Pencil, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import type { Registro } from '@/types/registro'
import { useDeletarRegistro } from '@/hooks/registros/useDeletarRegistro'
import { EditarRegistroDialog } from '@/components/registros/EditarRegistroDialog'

function formatarData(data: string) {
  const [ano, mes, dia] = data.split('-')
  return `${dia}/${mes}/${ano}`
}

function formatarHorario(horario: string) {
  return horario.substring(0, 5)
}

interface RegistrosTableProps {
  registros: Registro[]
  isLoading: boolean
}

export function RegistrosTable({ registros, isLoading }: RegistrosTableProps) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [editando, setEditando] = useState<Registro | null>(null)
  const deletar = useDeletarRegistro()

  const columns: ColumnDef<Registro>[] = [
    {
      accessorKey: 'dataPonto',
      header: ({ column }) => (
        <Button
          variant="ghost"
          size="sm"
          className="-ml-2"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Data
          <ArrowUpDown className="ml-1 size-3.5" />
        </Button>
      ),
      cell: ({ row }) => (
        <span className="font-medium tabular-nums">{formatarData(row.original.dataPonto)}</span>
      ),
    },
    {
      accessorKey: 'horarioPonto',
      header: 'Horário',
      cell: ({ row }) => (
        <span className="tabular-nums">{formatarHorario(row.original.horarioPonto)}</span>
      ),
    },
    {
      accessorKey: 'empresa',
      header: 'Empresa',
    },
    {
      accessorKey: 'cnpj',
      header: 'CNPJ',
      cell: ({ row }) => (
        <span className="text-muted-foreground text-xs tabular-nums">{row.original.cnpj}</span>
      ),
    },
    {
      accessorKey: 'local',
      header: 'Local',
    },
    {
      accessorKey: 'nomeFuncionario',
      header: 'Funcionário',
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => (
        <Badge variant={row.original.status === 'Ativo' ? 'default' : 'secondary'}>
          {row.original.status}
        </Badge>
      ),
    },
    {
      id: 'imagem',
      header: 'Comprovante',
      cell: ({ row }) => (
        <a
          href={row.original.imagemUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-primary hover:underline text-sm"
        >
          Ver <ExternalLink className="size-3" />
        </a>
      ),
    },
    {
      id: 'acoes',
      header: '',
      cell: ({ row }) => (
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => setEditando(row.original)}
            aria-label="Editar"
          >
            <Pencil />
          </Button>
          <Button
            variant="ghost"
            size="icon-sm"
            className="text-destructive hover:text-destructive"
            onClick={() => {
              if (confirm('Deseja excluir este registro?')) {
                deletar.mutate(row.original.id)
              }
            }}
            aria-label="Excluir"
          >
            <Trash2 />
          </Button>
        </div>
      ),
    },
  ]

  const table = useReactTable({
    data: registros,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  })

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-16 text-muted-foreground text-sm">
        Carregando registros...
      </div>
    )
  }

  if (registros.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <p className="text-muted-foreground text-sm">Nenhum registro encontrado.</p>
        <p className="text-muted-foreground text-xs mt-1">
          Clique em &ldquo;Novo registro&rdquo; para adicionar o primeiro comprovante.
        </p>
      </div>
    )
  }

  return (
    <>
      <div className="rounded-lg border border-border overflow-hidden">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((hg) => (
              <TableRow key={hg.id} className="bg-muted/50">
                {hg.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow key={row.id} className="hover:bg-muted/30 transition-colors">
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {editando && (
        <EditarRegistroDialog
          registro={editando}
          onClose={() => setEditando(null)}
        />
      )}
    </>
  )
}
