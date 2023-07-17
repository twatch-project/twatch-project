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

// Company

enum Tag {
  MINIMALMODERN = "MINIMALMODERN",
  CONTEMPORARYMODERN = "CONTEMPORARYMODERN",
  MODERNLUXURY = "MODERNLUXURY",
  MODERNSTYLE = "MODERNSTYLE",
  MIDCENTURYMODERN = "MIDCENTURYMODERN",
  VINTAGESTYLE = "VINTAGESTYLE",
  LOFTINDUSTRALSTYLE = "LOFTINDUSTRALSTYLE",
  SCANDINAVIANSTYLE = "SCANDINAVIANSTYLE",
  ARTDECO = "ARTDECO",
  MIXANDMATCH = "MIXANDMATCH",
}

export type HomeTag = keyof typeof Tag;

export interface ICreateCompany {
  companyName: string;
  companyRegistration: string;
  address: string;
  sub_district: string;
  district: string;
  province: string;
  postCode: number;
  contact: string;
  tag: HomeTag;

  userId: string;
}

export interface ICompany extends ICreateCompany {
  companyId: number;
}

export interface ICreatePort {
  title: string;
  body: string;
  tag: HomeTag;
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

// portId        Int @id @default(autoincrement())
// title         String
// body          String
// tag           Tag
// province      String
// district      String
// sub_district  String
// address       String
// createAt      DateTime
// updateAt      DateTime

// company     Company @relation(fields: [companyId],references: [companyId])
// companyId   Int
