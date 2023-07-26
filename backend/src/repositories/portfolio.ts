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

  async getRatingByPortId(
    portId: number
  ): Promise<{ _avg: { rating: boolean | null } }> {
    return await this.db.commentPortfolio.groupBy({
      by: ["portId"],
      where: { portId: portId },
      _avg: {
        rating: true,
      },
    });
  }

  // async getRatingByCompanyId(companyId: number): Promise<any> {
  //   const ports = await this.db.portfolio.findMany({
  //     where: { companyId },
  //   });

  //   const port = ports.map((port) => port.portId);

  //   let portRatings: number[] = [];
  //   for (let i = 0; i < port.length; i++) {
  //     const ratingInPortId = await this.db.commentPortfolio.groupBy({
  //       by: ["portId"],
  //       where: { portId: port[i] },
  //     });
  //     const ratings: number[] = ratingInPortId
  //       .map((ratings) => ratings.portId)
  //       .map((rating) => rating);

  //     let sumRating = ratings[0];
  //     for (let j = 1; j < ratings.length; j++) {
  //       sumRating = ratings[i] + sumRating;
  //     }
  //     portRatings.push(sumRating);
  //   }

  //   let rating: number = portRatings[0];
  //   for (let k = 1; k < portRatings.length; k++) {
  //     rating = rating + portRatings[k];
  //   }
  // }

  async getPorts(): Promise<IPort[]> {
    return await this.db.portfolio.findMany({
      include: { postedBy: { select: { companyName: true } } },
    });
  }

  async getPortById(portId: number): Promise<IPort | null> {
    return await this.db.portfolio.findUnique({
      include: {
        postedBy: { select: { companyName: true } },
        commentBy: {
          select: {
            rating: true,
          },
        },
      },
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
      for (let i = 0; i < port.imageContents.length; i++) {
        await deleteFile(port.imageContents[i]);
        await deleteFile(port.imageContentUrls[i]);
      }
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

    for (let i = 0; i < port.imageContents.length; i++) {
      await deleteFile(port.imageContents[i]);
      await deleteFile(port.imageContentUrls[i]);
    }

    return this.db.portfolio.delete({ where: { portId: arg.portId } });
  }
}
