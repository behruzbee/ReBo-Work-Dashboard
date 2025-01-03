import axios from 'axios'
import { toast } from 'react-toastify'
import { apiInstance } from '~shared/api'

import { type IBonus, type ICreateBonus } from '../types/bonus'

export const getBonuses = async () => {
  try {
    const workers = await apiInstance.get<IBonus[]>('/bonuses')
    return workers.data
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const serverError = error.response
      toast.error(serverError.data.error)
    }
    console.error(error)
  }
}

export const createBonus = async (bonus: ICreateBonus) => {
  try {
    const newWorker = await apiInstance.post<IBonus>('/bonus', bonus)
    toast.success("Bonus muvaffaqiyatli qo'shildi!")
    return newWorker
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const serverError = error.response
      toast.error(serverError.data.error)
    }
    console.error(error)
  }
}

export const deleteBonus = async (id: string) => {
  try {
    const newWorker = await apiInstance.delete<IBonus>('/bonus/' + id)
    toast.success("Bonus muvaffaqiyatli o'chirildi!")
    return newWorker
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const serverError = error.response
      toast.error(serverError.data.error)
    }
    console.error(error)
  }
}

export const getWorkerBonuses = async (workerId: string) => {
  try {
    const result = await apiInstance.get<IBonus[]>('/bonuses/worker/' + workerId)
    return result.data
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const serverError = error.response
      toast.error(serverError.data.error)
    }
    console.error(error)
  }
}
