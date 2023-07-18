import { Request, Response } from "express";
import { JwtAuthRequest } from "../auth";
import { HomeTag as HomeTag, UserRole } from "../entities";

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

export interface IHandlerUser {
  logout(req: JwtAuthRequest<Empty, Empty>, res: Response): Promise<Response>;
  login(req: AppRequest<Empty, WithUser>, res: Response): Promise<Response>;
  register(req: AppRequest<Empty, WithUser>, res: Response): Promise<Response>;
  getId(req: JwtAuthRequest<Empty, Empty>, res: Response): Promise<Response>;
}

// Company
export interface WithCompany {
  companyId: number;
  companyName: string;
  companyRegistration: string;
  address: string;
  sub_district: string;
  district: string;
  province: string;
  postCode: number;
  contact: string;
  tag?: HomeTag;
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
  body: string;
  tag: HomeTag;
  address: string;
  sub_district: string;
  district: string;
  province: string;
  postCode: number;
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
}
