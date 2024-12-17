import { useMutation, useQuery } from '@tanstack/react-query'
import { queryClient } from '~shared/libs/query-clients'

import { type ICreateUser } from '../types/user'
import {
  createUser,
  deleteUser,
  getMe,
  getUser,
  getUsers,
  updateUser
} from './api'

export const useGetUsersQuery = () => {
  const query = useQuery({
    initialData: [],
    queryKey: ['users'],
    queryFn: getUsers
  })

  return query
}

export const useGetUserQuery = (id: string) => {
  const query = useQuery({
    queryKey: ['user'],
    queryFn: () => getUser(id)
  })

  return query
}

export const useCreateUserQuery = () => {
  const mutation = useMutation({
    mutationKey: ['users'],
    mutationFn: (data: ICreateUser) => createUser(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['users']
      })
    }
  })

  return mutation
}

export const useDeleteUserQuery = () => {
  const mutation = useMutation({
    mutationKey: ['users'],
    mutationFn: (username: string) => deleteUser(username),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['users']
      })
    }
  })

  return mutation
}

export const useUpdateUserQuery = () => {
  const mutation = useMutation({
    mutationKey: ['users'],
    mutationFn: (user: ICreateUser) => updateUser(user),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['users']
      })
    }
  })

  return mutation
}

export const useGetMe = () => {
  const query = useQuery({
    queryKey: ['me'],
    queryFn: getMe
  })

  return query
}
