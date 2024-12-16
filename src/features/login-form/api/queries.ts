import { useMutation } from '@tanstack/react-query'

import { login, signUp } from './api'

export const useLoginQuery = (onSuccess?: VoidFunction) => {
  return useMutation({
    mutationKey: ['login'],
    mutationFn: login,
    onSuccess
  })
}

export const useSignUpQuery = () => {
  return useMutation({
    mutationKey: ['login'],
    mutationFn: signUp
  })
}
