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
  imageProfile: string //@TODO Add in backend
  imageContent: string[] //@TODO Add in backend
  address: string
  sub_district: string
  district: string
  province: string
  postCode: string
  contract: string
  tag: string[]
  rating: number //@TODO Add in backend

  userId: string
}

export interface PortfolioDto {
  portId: number
  title: string
  body: string
  imageContent: string //@TODO Add in backend
  tag: string[]
  address: string
  sub_district: string
  district: string
  province: string
  postCode: number
  createAt: Date
  updateAt: Date
  rating: number //@TODO Add in backend

  companyId: number
}

export interface CreadentialDto {
  accessToken: string
}

export interface ErrorDto {
  statusCode: number
  message: string
  erorr: string
}
