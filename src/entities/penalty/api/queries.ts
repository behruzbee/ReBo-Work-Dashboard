import { useMutation, useQuery } from '@tanstack/react-query'
import { queryClient } from '~shared/libs/query-clients'

import { type ICreatePenalty } from '../types/history'
import { getPenalties, createPenalty, deletePenalty } from './api'

export const useGetPenaltiesQuery = () => {
  const query = useQuery({
    initialData: [],
    queryKey: ['penalties'],
    queryFn: getPenalties
  })

  return query
}

export const useCreatePenaltyQuery = () => {
  const mutation = useMutation({
    mutationKey: ['penalties'],
    mutationFn: (data: ICreatePenalty) => createPenalty(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['penalties']
      })
    }
  })

  return mutation
}

export const useDeletePenaltyQuery = () => {
  const mutation = useMutation({
    mutationKey: ['penalties'],
    mutationFn: (id: string) => deletePenalty(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['penalties']
      })
    }
  })

  return mutation
}
