import jwt from "jsonwebtoken";
import { JwtAuthRequest, Payload } from ".";
import { NextFunction, Response } from "express";
import { IRepositoryBlacklist } from "../repositories";

const secret = process.env.SECRET || "jwt-secret";

export function newJwt(data: Payload): string {
  return jwt.sign(data, secret, {
    algorithm: "HS512",
    expiresIn: "12h",
    issuer: "content-api",
    subject: "registration",
    audience: "user",
  });
}

export function newHandlerMiddleware(
  repoBlacklist: IRepositoryBlacklist
): IHandlerMiddleware {
  return new HandlerMiddleware(repoBlacklist);
}

interface IHandlerMiddleware {
  jwtMiddleware(
    req: JwtAuthRequest<any, any>,
    res: Response,
    next: NextFunction
  );
}

class HandlerMiddleware implements IHandlerMiddleware {
  private repoBlacklist: IRepositoryBlacklist;

  constructor(repoBlacklist: IRepositoryBlacklist) {
    this.repoBlacklist = repoBlacklist;
  }

  async jwtMiddleware(
    req: JwtAuthRequest<any, any>,
    res: Response,
    next: NextFunction
  ) {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    try {
      if (!token) {
        return res.status(401).json({ error: "missing JWT token" }).end();
      }

      const isBlacklisted = await this.repoBlacklist.isBlacklisted(token);

      if (isBlacklisted) {
        return res.status(401).json({ error: `token is blacklist` }).end();
      }

      const decoded = jwt.verify(token, secret);
      const id = decoded["id"];
      const username = decoded["username"];
      const role = decoded["role"];

      req.token = token;
      req.payload = {
        id: id,
        username: username,
        role: role,
      };

      return next();
    } catch (err) {
      console.error(`Auth failed for token ${token}: ${err}`);
      return res.status(400).json({ error: "authentication failed" }).end();
    }
  }
}
