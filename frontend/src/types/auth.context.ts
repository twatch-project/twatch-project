import { ReactNode } from 'react'

enum Role {
  CUSTOMER = 'CUSTOMER',
  COMPANY = 'COMPANY',
}
export type UserRole = keyof typeof Role

export interface IAuthContext {
  id: string | null
  token: string | null
  isLoggedIn: boolean
  login: (username: string, password: string) => Promise<unknown>
  logout: () => void
  register: (username: string, password: string, role: UserRole, email: string) => Promise<unknown>
}

export interface ChildProps {
  children: ReactNode
}
