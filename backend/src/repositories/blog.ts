import { PrismaClient } from "@prisma/client";
import { IBlog, ICreateBlog } from "../entities";

export function newRepositoryBlog(prisma: PrismaClient) {
  return new RepositoryBlog(prisma);
}

class RepositoryBlog {
  private db: PrismaClient;

  constructor(db: PrismaClient) {
    this.db = db;
  }

  async createBlog(arg: ICreateBlog): Promise<IBlog> {
    return await this.db.blog.create({
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
}
