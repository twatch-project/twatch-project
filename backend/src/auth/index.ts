import { Request } from "express";
import { UserRole } from "../entities";

export interface JwtAuthRequest<Params, Body>
  extends Request<Params, any, Body> {
  token: string;
  payload: Payload;
}

export interface Payload {
  id: string;
  username: string;
  role: UserRole;
}
