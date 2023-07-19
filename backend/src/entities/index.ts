// User

enum Role {
  CUSTOMER = "CUSTOMER",
  COMPANY = "COMPANY",
}

export type UserRole = keyof typeof Role;

export function mapRole(role: Role): UserRole {
  return role;
}

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

export interface ICreateCompany {
  companyName: string;
  companyRegistration: string;
  address: string;
  sub_district: string;
  district: string;
  province: string;
  postCode: number;
  contact: string;
  tag: string[];

  userId: string;
}

export interface ICompany extends ICreateCompany {
  companyId: number;
}

export interface ICreatePort {
  title: string;
  body: string;
  tag: string[];
  address: string;
  sub_district: string;
  district: string;
  province: string;
  postCode: number;
  createAt: Date;
  updateAt: Date;

  companyId: number;
}

export interface IPort extends ICreatePort {
  portId: number;
}

//Enum gender
enum Gender {
  MALE = "MALE",
  FEMALE = "FEMALE",
  UNSPECIFIED = "UNSPECIFIED",
}

export type GenderType = keyof typeof Gender;

export function mapGender(gender: Gender): GenderType {
  return gender;
}

export interface ICreateCustomer {
  userId: string;
  firstname: string;
  lastname: string;
  gender: GenderType;
  dateOfBirth: Date;
  citizenId: string;
  province: string;
  district: string;
  sub_district: string;
  address: string;
  contact: string;
  postCode: number;
}

export interface ICustomer extends ICreateCustomer {
  customerId: number;
}

export interface IUpdateCustomer {
  id: number;
  firstname: string;
  lastname: string;
  gender: GenderType;
  province: string;
  district: string;
  sub_district: string;
  address: string;
  contact: string;
  userId: string;
  postCode: number;
}

export interface ICreateBlog {
  customerId: number;
  title: string;
  body: string;
  tag: string[];
  province: string;
  district: string;
  sub_district: string;
  address: string;
}

export interface IBlog extends ICreateBlog {
  blogId: number;
}

export interface IUpdateBlog {
  id: number;
  userId: string;
  customerId: number;
  title: string;
  body: string;
  tag: string[];
  province: string;
  district: string;
  sub_district: string;
  address: string;
}
