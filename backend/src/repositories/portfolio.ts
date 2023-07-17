import { PrismaClient } from "@prisma/client";
import { IRepositoryPortfolio } from ".";
import { HomeTag, ICreatePort, IPort } from "../entities";

export function newRepositoryPortfolio(db: PrismaClient) {
  return new RepositoryPortfolio(db);
}

class RepositoryPortfolio implements IRepositoryPortfolio {
  private db: PrismaClient;

  constructor(db: PrismaClient) {
    this.db = db;
  }

  async createPort(port: ICreatePort): Promise<IPort> {
    return await this.db.portfolio.create({
      data: {
        ...port,
        companyId: undefined,
        postedBy: {
          connect: {
            companyId: port.companyId,
          },
        },
      },
    });
  }

  async getPorts(): Promise<IPort[]> {
    return await this.db.portfolio.findMany();
  }

  async getPortById(portId: number): Promise<IPort | null> {
    return await this.db.portfolio.findUnique({ where: { portId } });
  }

  async getCompanyPorts(companyId: number): Promise<IPort[]> {
    return await this.db.portfolio.findMany({ where: { companyId } });
  }

  async updatePort(arg: {
    portId: number;
    title?: string;
    body?: string;
    tag?: HomeTag;
    address?: string;
    sub_district?: string;
    district?: string;
    province?: string;
    postCode?: number;
    updateAt: Date;
    companyId: number;
  }): Promise<IPort> {
    return await this.db.portfolio.update({
      where: { portId: arg.portId },
      data: {
        title: arg.title,
        body: arg.body,
        tag: arg.tag,
        address: arg.address,
        sub_district: arg.sub_district,
        district: arg.district,
        province: arg.province,
        postCode: arg.postCode,
        // updateAt: arg.updateAt,
      },
    });
  }

  async deletePortById(arg: {
    portId: number;
    companyId: number;
  }): Promise<IPort> {
    const port = await this.db.portfolio.findFirst({
      where: { portId: arg.portId, companyId: arg.companyId },
    });

    if (!port) {
      return Promise.reject(`no such port ${arg.portId} not found`);
    }

    return this.db.portfolio.delete({ where: { portId: arg.portId } });
  }
}
