import { useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '@/services/api'
import type { AtualizarRegistroPayload, Registro } from '@/types/registro'

export function useAtualizarRegistro() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ id, payload }: { id: string; payload: AtualizarRegistroPayload }) => {
      const { data } = await api.put<Registro>(`/api/v1/registros/${id}`, payload)
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['registros'] })
    },
  })
}
