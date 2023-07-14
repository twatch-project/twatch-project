import { Request } from "express";

export interface JwtAuthRequest<Params, Body>
  extends Request<Params, any, Body> {
  token: string;
  payload: Payload;
}

export interface Payload {
  id: string;
  username: string;
}
