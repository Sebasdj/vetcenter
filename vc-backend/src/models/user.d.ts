export interface IUser {
  id?: number
  username?: string
  email: string
}

export interface IUserWithPassword extends IUser {
  password: string
}