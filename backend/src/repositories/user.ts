import { PrismaClient } from "@prisma/client";
import { ICreateUser, IUser } from "../entities";
import { IRepositoryUser } from ".";

export function newRepositoryUser(db: PrismaClient) {
  return new RepositoryUser(db);
}

class RepositoryUser implements IRepositoryUser {
  private db: PrismaClient;

  constructor(db: PrismaClient) {
    this.db = db;
  }

  async createUser(user: ICreateUser): Promise<IUser> {
    return await this.db.user.create({ data: user });
  }

  async getUserByUsername(username: string): Promise<IUser | null> {
    return await this.db.user.findUnique({ where: { username } });
  }

  async getId(userId: string): Promise<IUser | null> {
    return await this.db.user.findUnique({ where: { userId } });
  }
}
