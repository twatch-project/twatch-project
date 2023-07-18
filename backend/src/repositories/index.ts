import {
  ICreateUser,
  ICreateCustomer,
  ICustomer,
  IUser,
  IUpdateCustomer,
  ICreateBlog,
  IBlog,
  IUpdateBlog,
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
}
