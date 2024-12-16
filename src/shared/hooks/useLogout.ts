import Cookies from 'js-cookie'
import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { RouterPaths } from '~shared/constants/router-path'

export const useLogout = () => {
  const navigate = useNavigate()

  return useCallback(() => {
    Cookies.remove('AUTH_TOKEN_FRONT')
    navigate(RouterPaths.auth.login)
  }, [navigate])
}
