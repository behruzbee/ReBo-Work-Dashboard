import { useMutation, useQuery } from '@tanstack/react-query'

import { IWorker } from '../types/worker'
import {
  createWorker,
  deleteWorker,
  getWorker,
  getWorkers,
  updateWorker
} from './api'
import { queryClient } from '~shared/libs/query-clients'

export const useGetWorkersQuery = () => {
  const query = useQuery({
    initialData: [],
    queryKey: ['workers'],
    queryFn: getWorkers
  })

  return query
}

export const useGetWorkerQuery = (id: string) => {
  const query = useQuery({
    queryKey: ['worker'],
    queryFn: () => getWorker(id)
  })

  return query
}

export const useCreateWorkerQuery = () => {
  const mutation = useMutation({
    mutationKey: ['workers'],
    mutationFn: (data: IWorker) => createWorker(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['workers']
      })
    }
  })

  return mutation
}

export const useDeleteWorkerQuery = () => {
  const mutation = useMutation({
    mutationKey: ['workers'],
    mutationFn: (id: string) => deleteWorker(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['workers']
      })
    }
  })

  return mutation
}

export const useUpdateWorkerQuery = () => {
  const mutation = useMutation({
    mutationKey: ['workers'],
    mutationFn: (worker: IWorker) => updateWorker(worker),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['workers']
      })
    }
  })

  return mutation
}
