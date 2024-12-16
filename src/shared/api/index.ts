import axios from 'axios'
import Cookies from 'js-cookie'

export const apiInstance = axios.create({
  baseURL: `${import.meta.env.VITE_BASE_API_URL}/api`,
})

apiInstance.interceptors.request.use((config) => {
  const authToken = Cookies.get('AUTH_TOKEN_FRONT')
  config.headers.Authorization = authToken ? `Bearer ${authToken}` : null
  return config
})
