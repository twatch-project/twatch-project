import { PrismaClient } from "@prisma/client";
import { IBlog, ICreateBlog, IUpdateBlog } from "../entities";
import { IRepositoryBlog } from ".";

export function newRepositoryBlog(prisma: PrismaClient) {
  return new RepositoryBlog(prisma);
}

class RepositoryBlog implements IRepositoryBlog {
  private db: PrismaClient;

  constructor(db: PrismaClient) {
    this.db = db;
  }

  async createBlog(arg: ICreateBlog): Promise<IBlog> {
    return await this.db.blog.create({
      include: {
        customer: {
          select: {
            userId: true,
          },
        },
      },
      data: {
        title: arg.title,
        body: arg.body,
        tag: arg.tag,
        province: arg.province,
        district: arg.district,
        sub_district: arg.sub_district,
        address: arg.address,
        customer: {
          connect: {
            customerId: arg.customerId,
          },
        },
      },
    });
  }

  async updateBlogbyId(msg: IUpdateBlog): Promise<IBlog> {
    const customerId = await this.db.blog.findUnique({
      where: {
        blogId: msg.id,
      },
    });
    if (!customerId) {
      return Promise.reject(`Not found Blog number ${customerId}`);
    }
    if (msg.customerId !== customerId.customerId) {
      return Promise.reject(`Id customer Not match`);
    }
    return await this.db.blog.update({
      where: {
        blogId: customerId.blogId,
      },
      data: {
        title: msg.title,
        body: msg.body,
        tag: msg.tag,
        province: msg.province,
        district: msg.district,
        sub_district: msg.sub_district,
        address: msg.address,
      },
    });
  }
}
