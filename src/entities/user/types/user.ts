export interface IUser {
  id: string
  username: string
  password: string
  status_index: number
  created_at: string
} 

export interface ICreateUser extends Omit<IUser, 'created_at' | 'id'> {}