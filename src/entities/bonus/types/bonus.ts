export interface IBonus {
  id: string
  worker_id: string
  description: string
  amount: number
  time: string
}

export interface ICreateBonus extends Omit<IBonus, 'id' |'time'> {}