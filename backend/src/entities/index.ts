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
}

export interface ICustomer extends ICreateCustomer {
    customerId: number;
}
