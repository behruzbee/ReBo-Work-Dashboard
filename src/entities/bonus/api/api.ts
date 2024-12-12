import { toast } from 'react-toastify'
import { apiInstance } from '~shared/api'

import { type IBonus, type ICreateBonus } from '../types/bonus'

export const getBonuses = async () => {
  try {
    const workers = await apiInstance.get<IBonus[]>('/bonuses')
    return workers.data
  } catch (error) {
    toast.error('Jarimalar yuklashda xatolik!')
    console.error('Error fetching when get bonuses:', error)
  }
}

export const createBonus = async (bonus: ICreateBonus) => {
  try {
    const newWorker = await apiInstance.post<IBonus>('/bonus', bonus)
    toast.success("Jarima muvaffaqiyatli qo'shildi!")
    return newWorker
  } catch (error) {
    toast.error("Jarima qo'shishda xatolik!")
    console.error('Error fetching when create bonus:', error)
  }
}

export const deleteBonus = async (id: string) => {
  try {
    const newWorker = await apiInstance.delete<IBonus>('/bonus/' + id)
    toast.success("Jarima muvaffaqiyatli o'chirildi!")
    return newWorker
  } catch (error) {
    toast.error("Jarima o'chirishda xatolik!")
    console.error('Error fetching when create bonus:', error)
  }
}
