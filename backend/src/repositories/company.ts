import { PrismaClient } from "@prisma/client";
import { IRepositoryCompany } from ".";
import { ICompany, ICreateCompany } from "../entities";

export function newRepositoryCompany(db: PrismaClient) {
  return new RepositoryCompany(db);
}

class RepositoryCompany implements IRepositoryCompany {
  private db: PrismaClient;

  constructor(db: PrismaClient) {
    this.db = db;
  }

  async createCompany(company: ICreateCompany): Promise<ICompany> {
    return await this.db.company.create({
      include: {
        userCompany: {
          select: {
            username: true,
            role: true,
            email: true,
            registeredAt: true,
            password: false,
          },
        },
      },
      data: {
        ...company,
        userId: undefined,
        userCompany: {
          connect: {
            userId: company.userId,
          },
        },
      },
    });
  }

  async getCompanys(): Promise<ICompany[]> {
    return await this.db.company.findMany({
      include: {
        userCompany: {
          select: {
            username: true,
            role: true,
            email: true,
            registeredAt: true,
            password: false,
          },
        },
      },
    });
  }

  async getCompanyById(companyId: number): Promise<ICompany | null> {
    return await this.db.company.findUnique({
      include: {
        userCompany: {
          select: {
            username: true,
            role: true,
            email: true,
            registeredAt: true,
            password: false,
          },
        },
      },

      where: { companyId },
    });
  }

  async updateCompanyInfo(arg: {
    companyId: number;
    address?: string;
    sub_district?: string;
    district?: string;
    province?: string;
    postCode?: number;
    contact?: string;
    tag?: string[];
    userId: string;
  }): Promise<ICompany> {
    return await this.db.company.update({
      include: {
        userCompany: {
          select: {
            username: true,
            role: true,
            email: true,
            registeredAt: true,
            password: false,
          },
        },
      },
      where: { companyId: arg.companyId },
      data: { ...arg, companyId: undefined },
    });
  }

  async getCompanyId(userId: string): Promise<ICompany | null> {
    return await this.db.company.findUnique({
      include: {
        userCompany: {
          select: {
            username: true,
            role: true,
            email: true,
            registeredAt: true,
            password: false,
          },
        },
      },
      where: { userId },
    });
  }
}
