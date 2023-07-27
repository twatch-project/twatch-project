import { PrismaClient } from "@prisma/client";
import { ICompany, ICreateUser, IUser } from "../entities";
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
    return await this.db.user.findUnique({
      where: { username },
      include: { company: { select: { companyId: true } } },
    });
  }

  async getId(userId: string): Promise<IUser | null> {
    return await this.db.user.findUnique({ where: { userId } });
  }

  async getCompanyIdByUser(userId: string): Promise<ICompany | null> {
    return await this.db.company.findUnique({ where: { userId } });
  }
}
