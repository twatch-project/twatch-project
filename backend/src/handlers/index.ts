import { Request, Response } from "express";
import { JwtAuthRequest } from "../auth";
import { UserRole } from "../entities";
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

export interface IHandlerUser {
    logout(req: JwtAuthRequest<Empty, Empty>, res: Response): Promise<Response>;
    login(req: AppRequest<Empty, WithUser>, res: Response): Promise<Response>;
    register(
        req: AppRequest<Empty, WithUser>,
        res: Response,
    ): Promise<Response>;
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
}

export interface IHandlerCustomer {
    createCustomer(
        req: JwtAuthRequest<Empty, WithCustomer>,
        res: Response,
    ): Promise<Response>;
}
