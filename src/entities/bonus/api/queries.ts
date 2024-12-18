import { useMutation, useQuery } from '@tanstack/react-query'
import { queryClient } from '~shared/libs/query-clients'

import { type ICreateBonus } from '../types/bonus'
import { getBonuses, createBonus, deleteBonus, getWorkerBonuses } from './api'

export const useGetBonusesQuery = () => {
  const query = useQuery({
    initialData: [],
    queryKey: ['bonuses'],
    queryFn: getBonuses
  })

  return query
}

export const useCreateBonusQuery = () => {
  const mutation = useMutation({
    mutationKey: ['bonuses'],
    mutationFn: (data: ICreateBonus) => createBonus(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['bonuses']
      })
    }
  })

  return mutation
}

export const useDeleteBonusQuery = () => {
  const mutation = useMutation({
    mutationKey: ['bonuses'],
    mutationFn: (id: string) => deleteBonus(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['bonuses']
      })
    }
  })

  return mutation
}

export const useGetWorkerBonusesQuery = (workerId: string) => {
  const mutation = useQuery({
    queryKey: ['worker-bonuses'],
    queryFn: () => getWorkerBonuses(workerId),
  })

  return mutation
}
