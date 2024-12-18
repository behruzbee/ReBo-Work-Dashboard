import { useMutation, useQuery } from '@tanstack/react-query'
import { queryClient } from '~shared/libs/query-clients'

import { ICreateHistory } from '../types/history'
import { getHistories, createHistory, deleteHistory, getWorkerHistories } from './api'

export const useGetHistoriesQuery = () => {
  const query = useQuery({
    initialData: [],
    queryKey: ['histories'],
    queryFn: getHistories
  })

  return query
}

export const useCreateHistoryQuery = () => {
  const mutation = useMutation({
    mutationKey: ['histories'],
    mutationFn: (data: ICreateHistory) => createHistory(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['histories']
      })
    }
  })

  return mutation
}

export const useDeleteHistoryQuery = () => {
  const mutation = useMutation({
    mutationKey: ['histories'],
    mutationFn: (id: string) => deleteHistory(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['histories']
      })
    }
  })

  return mutation
}

export const useGetWorkerHistoriesQuery = (workerId: string) => {
  const query = useQuery({
    initialData: [],
    queryKey: ['worker-histories'],
    queryFn: () => getWorkerHistories(workerId)
  })

  return query
}
