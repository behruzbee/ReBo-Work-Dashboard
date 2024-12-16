import { toast } from 'react-toastify'
import axios from 'axios'
import Cookies from 'js-cookie'
import { ILogin, ISignUp } from '../types/login'

const baseUrl = `${import.meta.env.VITE_BASE_API_URL}/auth`

export const login = async (data: ILogin) => {
  try {
    const result = await axios.post<{ token: string }>(`${baseUrl}/login`, data)
    toast.success("Muvaffaqiyatli ro'yxatdan o'tildi!")
    Cookies.set('AUTH_TOKEN_FRONT', result.data.token)
    return result.data
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const serverError = error.response
      toast.error(serverError.data.error)
    }
    console.error(error);
  }
}

export const signUp = async (data: ISignUp) => {
    try {
      const result = await axios.post<{ token: string }>(`${baseUrl}/sign-up`, data, {
        headers: {
            "Authorization": `Bearer ${Cookies.get("AUTH_TOKEN_FRONT")}`
        }
      })
      toast.success("Muvaffaqiyatli ro'yxatdan o'tildi!")
      return result.data
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const serverError = error.response
        toast.error(serverError.data.error)
      }
      console.error(error);
    }
  }
