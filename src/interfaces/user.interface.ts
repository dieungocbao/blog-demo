import { Document } from 'mongoose'

export interface IUser extends Document {
  name: string
  account: string
  password: string
  avatar: string
  role: string
  type: string
  isActive: boolean
}
export interface INewUser {
  name: string
  account: string
  password: string
}

export interface ITokenDecoded {
  _id?: string
  name?: string
  account?: string
  iat: number
  exp: number
}
