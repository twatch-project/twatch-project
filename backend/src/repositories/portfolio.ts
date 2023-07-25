import { PrismaClient } from "@prisma/client";
import { IRepositoryPortfolio } from ".";
import { ICreatePort, IPort } from "../entities";
import { deleteFile } from "../services/aws";

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
      include: { postedBy: { select: { companyName: true } } },
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
    return await this.db.portfolio.findMany({
      include: { postedBy: { select: { companyName: true } } },
    });
  }

  async getPortById(portId: number): Promise<IPort | null> {
    return await this.db.portfolio.findUnique({
      include: { postedBy: { select: { companyName: true } } },
      where: { portId },
    });
  }

  async getCompanyPorts(companyId: number): Promise<IPort[]> {
    return await this.db.portfolio.findMany({
      include: { postedBy: { select: { companyName: true } } },
      where: { companyId },
    });
  }

  async updatePort(arg: {
    portId: number;
    imageContents?: string[];
    imageContentUrls?: string[];
    title?: string;
    body?: string;
    tag?: string[];
    address?: string;
    sub_district?: string;
    district?: string;
    province?: string;
    postCode?: string;
    updateAt: Date;
    companyId: number;
  }): Promise<IPort> {
    const port = await this.db.portfolio.findFirst({
      where: { portId: arg.portId, companyId: arg.companyId },
    });

    if (!port) {
      return Promise.reject(`no such port ${arg.portId} not found`);
    }

    if (arg.imageContentUrls && arg.imageContents) {
      await deleteFile(port.imageContents);
      await deleteFile(port.imageContentUrls);
    }

    return await this.db.portfolio.update({
      include: { postedBy: { select: { companyName: true } } },
      where: { portId: arg.portId },
      data: {
        title: arg.title,
        imageContents: arg.imageContents,
        imageContentUrls: arg.imageContentUrls,
        body: arg.body,
        tag: arg.tag,
        address: arg.address,
        sub_district: arg.sub_district,
        district: arg.district,
        province: arg.province,
        postCode: arg.postCode,
        updateAt: arg.updateAt,
      },
    });
  }

  //@TODO Try catch

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

    await deleteFile(port.imageContents);
    await deleteFile(port.imageContentUrls);

    return this.db.portfolio.delete({ where: { portId: arg.portId } });
  }
}
