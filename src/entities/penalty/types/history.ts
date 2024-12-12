export interface IPenalty {
  id: string
  worker_id: string
  description: string
  amount: number
  time: string
}

export interface ICreatePenalty extends Omit<IPenalty, 'id' |'time'> {}