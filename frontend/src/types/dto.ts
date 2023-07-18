import { UserRole } from './auth.context'

export interface UserDto {
  id: string
  username: string
  role: UserRole
  email: string
  registeredAt: Date
}
