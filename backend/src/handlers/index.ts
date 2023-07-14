import { Request, Response } from "express";
import { JwtAuthRequest } from "../auth";
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

export interface IHandlerUser {
  logout(req: JwtAuthRequest<Empty, Empty>, res: Response): Promise<Response>;
  login(req: AppRequest<Empty, WithUser>, res: Response): Promise<Response>;
  register(req: AppRequest<Empty, WithUser>, res: Response): Promise<Response>;
  getId(req: JwtAuthRequest<Empty, Empty>, res: Response): Promise<Response>;
}
