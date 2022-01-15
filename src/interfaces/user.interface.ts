export interface INewUser {
  name: string
  account: string
  password: string
}

export interface IToken {
  name: string
  account: string
  iat: number
  exp: number
}