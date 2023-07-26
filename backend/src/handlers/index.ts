import { Request, Response } from "express";
import { JwtAuthRequest } from "../auth";
import { GenderType } from "../entities";
import { UserRole } from "../entities";

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
  gender: GenderType;
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
  tag: string[];
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
  tag: string[];
  province: string;
  district: string;
  sub_district: string;
  address: string;
  customerId: number;
}

export interface IHandlerCustomer {
  createCustomer(
    req: JwtAuthRequest<Empty, WithCustomer>,
    res: Response
  ): Promise<Response>;
  getCustomerId(
    req: JwtAuthRequest<WithIdCustomer, Empty>,
    res: Response
  ): Promise<Response>;
  getCustomers(_: Request, res: Response): Promise<Response>;
  updateCustomer(
    req: JwtAuthRequest<WithIdCustomer, WithUpdateCustomer>,
    res: Response
  ): Promise<Response>;
}

export interface IHandlerBlog {
  createCustomerBlog(
    req: JwtAuthRequest<Empty, WithBlog>,
    res: Response
  ): Promise<Response>;
  updateCustomerBlog(
    req: JwtAuthRequest<WithBlogId, WithBlogUpdate>,
    res: Response
  ): Promise<Response>;
  getBlogById(
    req: JwtAuthRequest<WithBlogId, Empty>,
    res: Response
  ): Promise<Response>;
}
// Company
export interface WithCompany {
  companyId: number;
  companyName: string;
  companyRegistration: string;
  imageCompany: string;
  imageCompanyUrl: string;
  imageContents: string[];
  imageContentUrls: string[];
  body: string;
  address: string;
  sub_district: string;
  district: string;
  province: string;
  postCode: string;
  contact: string;
  tag?: string[];
  userId: string;
}

export interface WithCompanyId {
  companyId: number;
}

export interface IHandlerCompany {
  createCompany(
    req: JwtAuthRequest<Request, WithCompany>,
    res: Response
  ): Promise<Response>;
  getCompanys(_, res: Response): Promise<Response>;
  getCompanyById(
    req: JwtAuthRequest<WithCompanyId, WithCompany>,
    res: Response
  ): Promise<Response>;
  updateCompanyInfo(
    req: JwtAuthRequest<WithCompanyId, WithCompany>,
    res: Response
  ): Promise<Response>;
}

export interface WithPort {
  title: string;
  imageContents: string[];
  imageContentUrl: string[];
  body: string;
  tag: string[];
  address: string;
  sub_district: string;
  district: string;
  province: string;
  postCode: string;
  companyId: number;
}

export interface WithPortId {
  portId: number;
}

export interface WithPortAndCompanyId extends WithCompanyId {
  portId: number;
}

export interface IHandlerPorfolio {
  createPortfolio(
    req: JwtAuthRequest<Request, WithPort>,
    res: Response
  ): Promise<Response>;
  getPorts(_, res: Response): Promise<Response>;
  getPortById(
    req: JwtAuthRequest<WithPortId, WithPort>,
    res: Response
  ): Promise<Response>;
  getCompanyPorts(
    req: JwtAuthRequest<Empty, Empty>,
    res: Response
  ): Promise<Response>;
  updatePort(
    req: JwtAuthRequest<WithPortId, WithPort>,
    res: Response
  ): Promise<Response>;
  deletePortById(
    req: JwtAuthRequest<WithPortId, WithPort>,
    res: Response
  ): Promise<Response>;
  getRatingByPortId(
    req: JwtAuthRequest<WithPortId, Empty>,
    res: Response
  ): Promise<Response>;
}

export interface WithCommentPort {
  userId: string;
  massage: string;
  rating: number;
}

export interface WithUpdateComment {
  massage: string;
  rating: number;
}
export interface WithCommentId {
  commentId: number;
}

export interface IHandlerComment {
  createCommentPort(
    req: JwtAuthRequest<WithCommentId, WithCommentPort>,
    res: Response
  ): Promise<Response>;
  updateCommentPortfolio(
    req: JwtAuthRequest<WithCommentId, WithUpdateComment>,
    res: Response
  ): Promise<Response>;
  getCommentPortfolioById(
    req: JwtAuthRequest<WithCommentId, Empty>,
    res: Response
  ): Promise<Response>;
  getCommentPortfolios(_, res: Response): Promise<Response>;
  deleteCommentPortfolio(
    req: JwtAuthRequest<WithCommentId, WithCommentPort>,
    res: Response
  ): Promise<Response>;
}
