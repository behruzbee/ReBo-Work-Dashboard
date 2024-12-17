import { useMutation } from '@tanstack/react-query'

import { login } from './api'

export const useLoginQuery = (onSuccess?: VoidFunction) => {
  return useMutation({
    mutationKey: ['login'],
    mutationFn: login,
    onSuccess
  })
}
