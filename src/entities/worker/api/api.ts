import { apiInstance } from '~shared/api'

import { IWorker } from '../types/worker'
import { toast } from 'react-toastify'

export const getWorkers = async () => {
  try {
    const workers = await apiInstance.get<IWorker[]>('/workers')
    return workers.data
  } catch (error) {
    toast.error('Ishchilarni yuklashda xatolik!')
    console.error('Error fetching when get workers:', error)
  }
}

export const getWorker = async (id: string) => {
  try {
    const workers = await apiInstance.get<IWorker>('/worker/' + id)
    return workers.data
  } catch (error) {
    toast.error('Ishchini yuklashda xatolik!')
    console.error('Error fetching when get workers:', error)
  }
}

export const createWorker = async (worker: IWorker) => {
  try {
    const newWorker = await apiInstance.post<IWorker>('/worker', worker)
    toast.success("Ishchi muvaffaqiyatli qo'shildi!")
    return newWorker
  } catch (error) {
    toast.error("Ishchini qo'shishda xatolik!")
    console.error('Error fetching when create workers:', error)
  }
}

export const deleteWorker = async (id: string) => {
  try {
    const newWorker = await apiInstance.delete<IWorker>('/worker/' + id)
    toast.success("Ishchi muvaffaqiyatli o'chirildi!")
    return newWorker
  } catch (error) {
    toast.error("Ishchini o'chirishda xatolik!")
    console.error('Error fetching when delete workers:', error)
  }
}

export const updateWorker = async (worker: IWorker) => {
  try {
    const updatedWorker = await apiInstance.patch('/worker/' + worker.id, worker )
    toast.success("Ishchi muvaffaqiyatli o'zgartirildi!")
    return updatedWorker
  } catch (error) {
    toast.error("Ishchini o'zgartirishda xatolik!")
    console.error('Error fetching when update workers:', error)
  }
}
