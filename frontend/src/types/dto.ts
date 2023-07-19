import { UserRole } from './auth.context'

export interface UserDto {
  userId: string
  username: string
  role: UserRole
  email: string
  registeredAt: Date
}

export interface CompanyDto {
  companyId: number
  companyName: string
  companyRegistration: string
  body: string
  imageProfile: string
  imageContent: string[]
  address: string
  sub_district: string
  district: string
  province: string
  postCode: string
  contract: string
  tag: string[]

  userId: string
}

export interface CreadentialDto {
  accessToken: string
}

export interface ErrorDto {
  statusCode: number
  message: string
  erorr: string
}
