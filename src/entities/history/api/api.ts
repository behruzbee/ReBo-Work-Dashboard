import { toast } from 'react-toastify'
import { apiInstance } from '~shared/api'

import { type ICreateHistory, type IHistory } from '../types/history'

export const getHistories = async () => {
  try {
    const workers = await apiInstance.get<IHistory[]>('/histories')
    return workers.data
  } catch (error) {
    toast.error('Tarix yuklashda xatolik!')
    console.error('Error fetching when get workers:', error)
  }
}

export const createHistory = async (worker: ICreateHistory) => {
  try {
    const newWorker = await apiInstance.post<IHistory>('/history', worker)
    toast.success("Tarix muvaffaqiyatli qo'shildi!")
    return newWorker
  } catch (error) {
    toast.error("Tarix qo'shishda xatolik!")
    console.error('Error fetching when create workers:', error)
  }
}

export const deleteHistory = async (id: string) => {
  try {
    const newWorker = await apiInstance.delete<IHistory>('/history/' + id)
    toast.success("Tarix muvaffaqiyatli o'chirildi!")
    return newWorker
  } catch (error) {
    toast.error("Tarix o'chirildi xatolik!")
    console.error('Error fetching when create workers:', error)
  }
}
