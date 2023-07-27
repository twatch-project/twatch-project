import { PrismaClient } from "@prisma/client";
import { IRepositoryCommentPort} from ".";
import { ICommentPort, ICreateCommentPort, IUpdateComment } from "../entities";

export function newRepositoryCommentPort(db: PrismaClient) {
  return new RepositoryCommentPort(db);
}

class RepositoryCommentPort implements IRepositoryCommentPort {
  private db: PrismaClient;

  constructor(db: PrismaClient) {
    this.db = db;
  }

  async createComment(msg: ICreateCommentPort): Promise<ICommentPort> {
    return await this.db.commentPortfolio.create({
      include: {
        portfolio: {
          select: {
            portId: true,
            commentBy: true,
          },
        },
      },
      data: {
        ...msg,
        portId: undefined,
        portfolio: {
          connect: {
            portId: msg.portId,
          },
        },
      },
    });
  }

  async getCommentPortfolioById(
    commentId: number
  ): Promise<ICommentPort | null> {
    return await this.db.commentPortfolio.findUnique({
      include: {
        portfolio: {
          select: {
            title: true,
            body: true,
            address: true,
            sub_district: true,
            portId: true,
            province: true,
          },
        },
      },
      where: { commentId },
    });
  }



  async getCommentPortByUserId(userId: string): Promise<ICommentPort[]> {
    return await this.db.commentPortfolio.findMany({
      where: { userId },
    });
  }

  async getCommentPortfolio(): Promise<ICommentPort[]> {
    return await this.db.commentPortfolio.findMany({});
  }

  async updateCommentPortfolio(msg: IUpdateComment): Promise<ICommentPort> {
    return await this.db.commentPortfolio.update({
      where: {
        commentId: msg.commentId,
      },
      data: {
        massage: msg.massage,
        rating: msg.rating,
      },
    });
  }

  async deleteCommentPortfolioById(arg: {
    commentId: number;
    userId: string;
  }): Promise<ICommentPort> {
    const comment = await this.db.commentPortfolio.findFirst({
      where: {
        userId: arg.userId,
        commentId: arg.commentId,
      },
    });
    if (!comment) {
      return Promise.reject(`no such comment ${comment} not found`);
    }
    return await this.db.commentPortfolio.delete({
      where: {
        commentId: arg.commentId,
      },
    });
  }
}
