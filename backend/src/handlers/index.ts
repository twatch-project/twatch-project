import { Request, Response } from "express";
import { JwtAuthRequest } from "../auth";
import { GenderType, TagType, UserRole } from "../entities";
import { Gender } from "@prisma/client";

export interface AppRequest<Params, Body> extends Request<Params, any, Body> {}

export interface Empty {}

export type HandlerFunc<Req> = (req: Req, res: Response) => Promise<Response>;

// User
export interface WithUser {
  username: string;
  password: string;
  role: UserRole;
  email: string;
  registeredAt: Date;
}

export interface WithIdCustomer {
  id: number;
}

export interface WithUpdateCustomer {
  firstname: string;
  lastname: string;
  gender: GenderType;
  province: string;
  district: string;
  sub_district: string;
  address: string;
  contact: string;
  postCode: number;
}

export interface IHandlerUser {
  logout(req: JwtAuthRequest<Empty, Empty>, res: Response): Promise<Response>;
  login(req: AppRequest<Empty, WithUser>, res: Response): Promise<Response>;
  register(req: AppRequest<Empty, WithUser>, res: Response): Promise<Response>;
  getId(req: JwtAuthRequest<Empty, Empty>, res: Response): Promise<Response>;
}

//HandlerCustomer
export interface WithCustomer {
  firstname: string;
  lastname: string;
  gender: Gender;
  dateOfBirth: Date;
  citizenId: string;
  province: string;
  district: string;
  sub_district: string;
  address: string;
  contact: string;
  userId: string;
  postCode: number;
}

export interface WithBlog {
  userId: number;
  title: string;
  body: string;
  tag: TagType;
  province: string;
  district: string;
  sub_district: string;
  address: string;
}

export interface WithBlogId {
  id: number;
}

export interface WithBlogUpdate {
  title: string;
  body: string;
  tag: TagType;
  province: string;
  district: string;
  sub_district: string;
  address: string;
  customerId: number;
}

export interface IHandlerCustomer {
  createCustomer(
    req: JwtAuthRequest<Empty, WithCustomer>,
    res: Response,
  ): Promise<Response>;
  getCustomerId(
    req: JwtAuthRequest<WithIdCustomer, Empty>,
    res: Response,
  ): Promise<Response>;
  getCustomers(_: Request, res: Response): Promise<Response>;
  updateCustomer(
    req: JwtAuthRequest<WithIdCustomer, WithUpdateCustomer>,
    res: Response,
  ): Promise<Response>;
}

export interface IHandlerBlog {
  createCustomerBlog(
    req: JwtAuthRequest<Empty, WithBlog>,
    res: Response,
  ): Promise<Response>;
  updateCustomerBlog(
    req: JwtAuthRequest<WithBlogId, WithBlogUpdate>,
    res: Response,
  ): Promise<Response>;
  getBlogById(
    req: JwtAuthRequest<WithBlogId, Empty>,
    res: Response,
  ): Promise<Response>;
  getBlogsCustomer(_, res: Response): Promise<Response>;
}
