import axios from 'axios'
import { toast } from 'react-toastify'
import { apiInstance } from '~shared/api'

import { type ICreatePenalty, type IPenalty } from '../types/penalty'

export const getPenalties = async () => {
  try {
    const penalties = await apiInstance.get<IPenalty[]>('/penalties')
    return penalties.data
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const serverError = error.response
      toast.error(serverError.data.error)
    }
    console.error(error)
  }
}

export const createPenalty = async (penalty: ICreatePenalty) => {
  try {
    const newPenalty = await apiInstance.post<IPenalty>('/penalty', penalty)
    toast.success("Jarima muvaffaqiyatli qo'shildi!")
    return newPenalty
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const serverError = error.response
      toast.error(serverError.data.error)
    }
    console.error(error)
  }
}

export const deletePenalty = async (id: string) => {
  try {
    const deletedPenalty = await apiInstance.delete<IPenalty>('/penalty/' + id)
    toast.success("Jarima muvaffaqiyatli o'chirildi!")
    return deletedPenalty
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const serverError = error.response
      toast.error(serverError.data.error)
    }
    console.error(error)
  }
}

export const getWorkerPenalty = async (workerId: string) => {
  try {
    const penalties = await apiInstance.get<IPenalty[]>('/penalties/worker/' + workerId)
    return penalties.data
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const serverError = error.response
      toast.error(serverError.data.error)
    }
    console.error(error)
  }
}
