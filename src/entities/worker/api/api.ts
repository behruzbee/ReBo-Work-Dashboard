import axios from 'axios'
import { apiInstance } from '~shared/api'

import { IWorker } from '../types/worker'
import { toast } from 'react-toastify'

export const getWorkers = async () => {
  try {
    const workers = await apiInstance.get<IWorker[]>('/workers')
    return workers.data
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const serverError = error.response
      toast.error(serverError.data.error)
    }
    console.error(error)
  }
}

export const getWorker = async (id: string) => {
  try {
    const workers = await apiInstance.get<IWorker>('/worker/' + id)
    return workers.data
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const serverError = error.response
      toast.error(serverError.data.error)
    }
    console.error(error)
  }
}

export const createWorker = async (worker: IWorker) => {
  try {
    const newWorker = await apiInstance.post<IWorker>('/worker', worker)
    toast.success("Ishchi muvaffaqiyatli qo'shildi!")
    return newWorker
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const serverError = error.response
      toast.error(serverError.data.error)
    }
    console.error(error)
  }
}

export const deleteWorker = async (id: string) => {
  try {
    const newWorker = await apiInstance.delete<IWorker>('/worker/' + id)
    toast.success("Ishchi muvaffaqiyatli o'chirildi!")
    return newWorker
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const serverError = error.response
      toast.error(serverError.data.error)
    }
    console.error(error)
  }
}

export const updateWorker = async (worker: IWorker) => {
  try {
    const updatedWorker = await apiInstance.patch(
      '/worker/' + worker.id,
      worker
    )
    toast.success("Ishchi muvaffaqiyatli o'zgartirildi!")
    return updatedWorker
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const serverError = error.response
      toast.error(serverError.data.error)
    }
    console.error(error)
  }
}
