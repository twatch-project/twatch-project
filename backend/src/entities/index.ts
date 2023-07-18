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

enum Role {
  CUSTOMER = "CUSTOMER",
  COMPANY = "COMPANY",
}
// console.log(typeof Role);

export type UserRole = keyof typeof Role;

export function mapRole(role: Role): UserRole {
  return role;
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

enum Tag {
  MINIMALMODERN = "MINIMALMODERN",
  CONTEMPORARYMODERN = "CONTEMPORARYMODERN",
  MODERNLUXURY = "MODERNLUXURY",
  MODERNSTYLE = "MODERNSTYLE",
  MIDCENTURYMODERN = "MIDCENTURYMODERN",
  VINTAGESTYLE = "VINTAGESTYLE",
  LOFTINDUSTRALSTYLE = "LOFTINDUSTRALSTYLE",
  SCANDINAVIANSTYLE = "ARTDECO",
  ARTDECO = "ARTDECO",
  MIXANDMATCH = "MIXANDMATCH",
}

export type TagType = keyof typeof Tag;

export function mapTag(tag: Tag): TagType {
  return tag;
}
//interface for Repocustomer
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
  tag: TagType;
  province: string;
  district: string;
  sub_district: string;
  address: string;
}

export interface IBlog extends ICreateBlog {
  blogId: number;
}
