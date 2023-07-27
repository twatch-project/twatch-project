import { Response } from "express";
import { AppRequest, Empty, IHandlerUser, WithUser } from ".";
import { IRepositoryBlacklist, IRepositoryUser } from "../repositories";
import { compareHash, hashPassword } from "../auth/bcrypts";
import { JwtAuthRequest, Payload } from "../auth";
import { newJwt } from "../auth/jwt";

export function newHandlerUser(
  repoUser: IRepositoryUser,
  repoBlacklist: IRepositoryBlacklist
): IHandlerUser {
  return new HandlerUser(repoUser, repoBlacklist);
}

class HandlerUser implements IHandlerUser {
  private repo: IRepositoryUser;
  private repoBlacklist: IRepositoryBlacklist;

  constructor(repo: IRepositoryUser, repoBlacklist: IRepositoryBlacklist) {
    this.repo = repo;
    this.repoBlacklist = repoBlacklist;
  }

  async register(
    req: AppRequest<Empty, WithUser>,
    res: Response
  ): Promise<Response> {
    const { username, password, role, email } = req.body;
    const registeredAt = new Date();

    if (!username || !password || !role || !email) {
      return res
        .status(400)
        .json({
          error: "missing username or password or role or email in body",
        })
        .end();
    }

    const usernameData = await this.repo.getUsername(username);
    if (username === usernameData?.username) {
      return res
        .status(401)
        .json({ error: "This username is used already" })
        .end();
    }

    try {
      const newUser = await this.repo.createUser({
        username,
        password: await hashPassword(password),
        role,
        email,
        registeredAt,
      });
      return res.status(200).json({ newUser, status: "ok" }).end();
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: err }).end();
    }
  }

  async getId(
    req: JwtAuthRequest<Empty, Empty>,
    res: Response
  ): Promise<Response> {
    if (!req.payload.id) {
      return res
        .status(400)
        .json({ error: "wrong username or password" })
        .end();
    }
    try {
      const user = await this.repo.getId(req.payload.id);

      return res
        .status(200)
        .json({ user, company: req.payload.companyId, status: "ok" })
        .end();
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: `failed to get id` }).end();
    }
  }

  async login(
    req: AppRequest<Empty, WithUser>,
    res: Response
  ): Promise<Response> {
    const { username, password } = req.body;
    if (!username || !password) {
      return res
        .status(400)
        .json({ error: "missing username or password in body" })
        .end();
    }
    try {
      const user = await this.repo.getUserByUsername(username);
      if (!user) {
        return res
          .status(404)
          .json({ error: `no such user: ${username}`, statusCode: 404 })
          .end();
      }
      if (!compareHash(password, user.password)) {
        return res.status(401).json({ error: `invalid credentail` }).end();
      }

      const company = await this.repo.getCompanyIdByUser(user.userId);
      // if (!company) {
      //   return res
      //     .status(404)
      //     .json({ error: `no such company: ${username}`, statusCode: 404 })
      //     .end();
      // }
      console.log(company?.companyId);
      const payload: Payload = {
        id: user.userId,
        username: user.username,
        role: user.role,
        companyId: company?.companyId,
      };
      const token = newJwt(payload);
      return res
        .status(200)
        .json({
          status: "logined",
          id: user.userId,
          username: user.username,
          role: user.role,
          companyId: company?.companyId,
          registeredAt: user.registeredAt,
          accessToken: token,
        })
        .end();
    } catch (err) {
      console.error(err);
      return res
        .status(500)
        .json({ error: `failed to get user with error code ${err}` })
        .end();
    }
  }

  async logout(
    req: JwtAuthRequest<Empty, Empty>,
    res: Response
  ): Promise<Response> {
    try {
      await this.repoBlacklist.addToBlackList(req.token);
      return res.status(200).json({ status: `logged out successfully` }).end();
    } catch (err) {
      console.error(err);
      return res
        .status(500)
        .json({ error: `failed to logout ${err}` })
        .end();
    }
  }
}
