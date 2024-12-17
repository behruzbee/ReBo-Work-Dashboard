import axios from 'axios'
import Cookies from 'js-cookie'
import { toast } from 'react-toastify'
import { RouterPaths } from '~shared/constants/router-path'

export const apiInstance = axios.create({
  baseURL: `${import.meta.env.VITE_BASE_API_URL}/api`,
})

apiInstance.interceptors.request.use((config) => {
  const authToken = Cookies.get('AUTH_TOKEN_FRONT')
  config.headers.Authorization = authToken ? `Bearer ${authToken}` : null
  return config
})

apiInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if(axios.isAxiosError(error) && error.response) {
      const status = error.response.status

      if(status === 401) {
        if (status === 401) {
          const errorMessage = error.response.data.error;
  
          // Проверяем сообщение ошибки
          if (errorMessage === 'Токен истёк!') {
            toast.warning('Сессия истекла. Пожалуйста, войдите снова.');
            
            setTimeout(() => {
              window.location.href = RouterPaths.auth.login;
            }, 5000)
            // Перенаправляем на страницу логина
          } else {
            toast.error(errorMessage || 'Ошибка авторизации');
          }
        }
      }
    }
    throw error
  }
)
