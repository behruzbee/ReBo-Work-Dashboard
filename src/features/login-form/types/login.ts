export interface ILogin { 
    username: string,
    password: string
}

export interface ISignUp extends ILogin { 
    status_index: number
}