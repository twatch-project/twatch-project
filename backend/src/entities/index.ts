export interface ICreateUser {
  username: string;
  password: string;
  role: UserRole;
  email: string;
  registeredAt: Date;
}

export interface IUser extends ICreateUser {
  userId: string;
}

export interface ICustomer {}

enum Role {
  CUSTOMER = "CUSTOMER",
  COMPANY = "COMPANY",
}

// console.log(typeof Role);

export type UserRole = keyof typeof Role;

export function mapRole(role: Role): UserRole {
  return role;
}
