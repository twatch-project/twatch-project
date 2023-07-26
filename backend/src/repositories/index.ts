import { PrismaClient } from "@prisma/client";
import {
  ICreateUser,
  ICreateCustomer,
  ICustomer,
  IUser,
  IUpdateCustomer,
  ICreateBlog,
  IBlog,
  IUpdateBlog,
  ICompany,
  ICreateCompany,
  ICreatePort,
  IPort,
  ICommentPort,
  ICreateCommentPort,
  IUpdateComment,
} from "../entities";

export type prisma = PrismaClient;

export interface IRepositoryBlacklist {
  addToBlackList(token: string): Promise<void>;
  isBlacklisted(token: string): Promise<boolean>;
}

export interface IRepositoryUser {
  createUser(user: ICreateUser): Promise<IUser>;
  getUserByUsername(username: string): Promise<IUser | null>;
  getId(id: string): Promise<IUser | null>;
}

//implements RepositoryCustomer
export interface IRepositoryCustomer {
  createCustomer(arg: ICreateCustomer): Promise<ICustomer>;
  getCustomerById(id: number): Promise<ICustomer | null>;
  getDetailCustomers(): Promise<ICustomer[]>;
  updateCustomerById(msg: IUpdateCustomer): Promise<ICustomer>;
  getCustomerToblog(id: string): Promise<ICustomer | null>;
}

export interface IRepositoryBlog {
  createBlog(arg: ICreateBlog): Promise<IBlog>;
  updateBlogbyId(msg: IUpdateBlog): Promise<IBlog>;
  getBlogbyId(id: number): Promise<IBlog | null>;
  getBlogs(): Promise<IBlog[]>;
}
export interface IRepositoryCompany {
  createCompany(company: ICreateCompany): Promise<ICompany>;
  getCompanys(): Promise<ICompany[]>;
  getCompanyById(companyId: number): Promise<ICompany | null>;
  updateCompanyInfo(arg: {
    companyId: number;
    imageCompany?: string;
    imageCompanyUrl?: string;
    imageContents?: string[];
    imageContentUrls?: string[];
    address?: string;
    sub_district?: string;
    district?: string;
    province?: string;
    postCode?: string;
    contact?: string;
    tag?: string[];
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
    imageContents?: string[];
    imageContentUrls?: string[];
    title?: string;
    body?: string;
    tag?: string[];
    address?: string;
    sub_district?: string;
    district?: string;
    province?: string;
    postCode?: string;
    updateAt: Date;
    companyId: number;
  }): Promise<IPort>;
  deletePortById(arg: { portId: number; companyId: number }): Promise<IPort>;
}

export interface IRepositoryCommentPort {
  createComment(msg: ICreateCommentPort): Promise<ICommentPort>;
  getCommentPortfolioById(commentId: number): Promise<ICommentPort | null>;
  getCommentPortfolio(): Promise<ICommentPort[]>;
  updateCommentPortfolio(msg: IUpdateComment): Promise<ICommentPort>;
  deleteCommentPortfolioById(arg: {
    commentId: number;
    userId: string;
  }): Promise<ICommentPort>;
  getCommentPortByUserId(userId: string): Promise<ICommentPort[]>;
}
