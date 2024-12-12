import { toast } from 'react-toastify'
import { apiInstance } from '~shared/api'

import { type ICreatePenalty, type IPenalty } from '../types/penalty'

export const getPenalties = async () => {
  try {
    const workers = await apiInstance.get<IPenalty[]>('/penalties')
    return workers.data
  } catch (error) {
    toast.error('Jarimalar yuklashda xatolik!')
    console.error('Error fetching when get penalties:', error)
  }
}

export const createPenalty = async (penalty: ICreatePenalty) => {
  try {
    const newWorker = await apiInstance.post<IPenalty>('/penalty', penalty)
    toast.success("Jarima muvaffaqiyatli qo'shildi!")
    return newWorker
  } catch (error) {
    toast.error("Jarima qo'shishda xatolik!")
    console.error('Error fetching when create penalty:', error)
  }
}

export const deletePenalty = async (id: string) => {
  try {
    const newWorker = await apiInstance.delete<IPenalty>('/penalty/' + id)
    toast.success("Jarima muvaffaqiyatli o'chirildi!")
    return newWorker
  } catch (error) {
    toast.error("Jarima o'chirishda xatolik!")
    console.error('Error fetching when create penalty:', error)
  }
}
