import { useQuery } from '@tanstack/react-query'
import { api } from '@/services/api'
import type { PaginaRegistros, Registro } from '@/types/registro'

/**
 * Busca o registro mais recente do usuário no servidor (página 1, sem filtros).
 * Serve de base para auto-preencher o formulário de novo registro quando o
 * localStorage foi limpo — os dados de empresa/CNPJ/local/colaborador sobrevivem
 * porque vêm do banco, não do cache do navegador.
 */
export function useUltimoRegistro() {
  return useQuery<Registro | null>({
    queryKey: ['registros', 'ultimo'],
    queryFn: async () => {
      const { data } = await api.get<PaginaRegistros>('/api/v1/registros?pagina=1')
      return data.itens[0] ?? null
    },
  })
}
