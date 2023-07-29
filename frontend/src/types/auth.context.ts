import { ReactNode } from 'react';

export enum Role {
  CUSTOMER = 'CUSTOMER',
  COMPANY = 'COMPANY',
}

export type UserRole = keyof typeof Role;

export interface IAuthContext {
  userId: string | null;
  token: string | null;
  isLoggedIn: boolean;
  companyId: string | null;
  userProfile: string | null;
  login: (username: string, password: string) => Promise<IUser | void>;
  logout: () => void;
  register: (username: string, password: string, role: Role, email: string) => Promise<IUser | void>;
}

export interface ChildProps {
  children: ReactNode;
}

export interface IUser {
  userId: string;
  username: string;
  password: string;
  role: UserRole;
  email: string;
}
