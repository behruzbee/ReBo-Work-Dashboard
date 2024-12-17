import axios from 'axios'
import { toast } from 'react-toastify'

import { apiInstance } from '~shared/api'
import { ICreateUser, IUser } from '../types/user'

export const getUsers = async () => {
  try {
    const users = await apiInstance.get<IUser[]>('/users')
    return users.data
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const serverError = error.response
      toast.error(serverError.data.error)
    }
    console.error(error)
  }
}

export const getUser = async (username: string) => {
  try {
    const users = await apiInstance.get<IUser>('/user/' + username)
    return users.data
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const serverError = error.response
      toast.error(serverError.data.error)
    }
    console.error(error)
  }
}

export const createUser = async (user: ICreateUser) => {
  try {
    const newUser = await apiInstance.post<IUser>('/user', user)
    toast.success("Ishchi muvaffaqiyatli qo'shildi!")
    return newUser.data
  } catch (error) {
    console.log(error)
    if (axios.isAxiosError(error) && error.response) {
      const serverError = error.response
      toast.error(serverError.data.error)
    }
    console.error(error)
  }
}

export const deleteUser = async (username: string) => {
  try {
    const newUser = await apiInstance.delete<IUser>('/user/' + username)
    toast.success("Ishchi muvaffaqiyatli o'chirildi!")
    return newUser.data
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const serverError = error.response
      toast.error(serverError.data.error)
    }
    console.error(error)
  }
}

export const updateUser = async (user: ICreateUser) => {
  try {
    const updatedUser = await apiInstance.patch<IUser>(
      '/user/' + user.username,
      user
    )
    toast.success("Ishchi muvaffaqiyatli o'zgartirildi!")
    return updatedUser.data
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const serverError = error.response
      toast.error(serverError.data.error)
    }
    console.error(error)
  }
}

export const getMe = async () => {
  try {
    const updatedUser = await apiInstance.get<IUser>('/me')
    return updatedUser.data
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const serverError = error.response
      toast.error(serverError.data.error)
    }
    console.error(error)
  }
}
