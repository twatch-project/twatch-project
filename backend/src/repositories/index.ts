import { Tag } from "@prisma/client";
import {
  HomeTag,
  ICompany,
  ICreateCompany,
  ICreatePort,
  ICreateUser,
  IPort,
  IUser,
} from "../entities";

export interface IRepositoryBlacklist {
  addToBlackList(token: string): Promise<void>;
  isBlacklisted(token: string): Promise<boolean>;
}

export interface IRepositoryUser {
  createUser(user: ICreateUser): Promise<IUser>;
  getUserByUsername(username: string): Promise<IUser | null>;
  getId(id: string): Promise<IUser | null>;
}

export interface IRepositoryCompany {
  createCompany(company: ICreateCompany): Promise<ICompany>;
  getCompanys(): Promise<ICompany[]>;
  getCompanyById(companyId: number): Promise<ICompany | null>;
  updateCompanyInfo(arg: {
    companyId: number;
    address?: string;
    sub_district?: string;
    district?: string;
    province?: string;
    postCode?: number;
    contact?: string;
    tag?: Tag;
    userId: string;
  }): Promise<ICompany>;
  getCompanyId(userId: string): Promise<ICompany | null>;
}

export interface IRepositoryPortfolio {
  createPort(port: ICreatePort): Promise<IPort>;
  getPorts(): Promise<IPort[]>;
  getPortById(portId: number): Promise<IPort | null>;
  getCompanyPorts(companyId: number): Promise<IPort[]>;
  updatePort(arg: {
    portId: number;
    title?: string;
    body?: string;
    tag?: HomeTag;
    address?: string;
    sub_district?: string;
    district?: string;
    province?: string;
    postCode?: number;
    updateAt: Date;
    companyId: number;
  }): Promise<IPort>;
  deletePortById(arg: { portId: number; companyId: number }): Promise<IPort>;
}
