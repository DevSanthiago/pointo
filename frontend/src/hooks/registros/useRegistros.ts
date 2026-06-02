import { useQuery } from '@tanstack/react-query'
import { api } from '@/services/api'
import type { Registro } from '@/types/registro'

interface Filtros {
  dataInicio?: string
  dataFim?: string
  empresa?: string
}

export function useRegistros(filtros: Filtros = {}) {
  return useQuery({
    queryKey: ['registros', filtros],
    queryFn: async () => {
      const params = new URLSearchParams()
      if (filtros.dataInicio) params.set('dataInicio', filtros.dataInicio)
      if (filtros.dataFim) params.set('dataFim', filtros.dataFim)
      if (filtros.empresa) params.set('empresa', filtros.empresa)
      const { data } = await api.get<Registro[]>(`/api/v1/registros?${params}`)
      return data
    },
  })
}

export function useRegistrosPorData(data: string) {
  return useQuery({
    queryKey: ['registros', 'data', data],
    queryFn: async () => {
      const { data: registros } = await api.get<Registro[]>(`/api/v1/registros/data/${data}`)
      return registros
    },
    enabled: !!data,
  })
}
