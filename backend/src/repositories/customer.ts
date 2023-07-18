import { PrismaClient } from "@prisma/client";
import { ICreateCustomer, ICustomer, IUpdateCustomer } from "../entities";
import { IRepositoryCustomer } from ".";

export function newRepositoryCustomer(
  prisma: PrismaClient,
): IRepositoryCustomer {
  return new RepositoryCustomer(prisma);
}
class RepositoryCustomer {
  private db: PrismaClient;

  constructor(db: PrismaClient) {
    this.db = db;
  }

  //Send Request arg for create customer detail to database
  async createCustomer(arg: ICreateCustomer): Promise<ICustomer> {
    return await this.db.customer.create({
      data: {
        ...arg,
        userId: undefined,
        userCustomer: {
          connect: {
            userId: arg.userId,
          },
        },
      },
    });
  }

  async getCustomerById(id: number): Promise<ICustomer | null> {
    return await this.db.customer.findUnique({
      where: {
        customerId: id,
      },
    });
  }

  async getCustomerToblog(id: string): Promise<ICustomer | null> {
    return await this.db.customer.findUnique({
      where: {
        userId: id,
      },
    });
  }

  async getDetailCustomers(): Promise<ICustomer[]> {
    return await this.db.customer.findMany({});
  }

  async updateCustomerById(msg: IUpdateCustomer): Promise<ICustomer> {
    const customerId = await this.db.customer.findUnique({
      where: {
        customerId: msg.id,
      },
    });
    if (!customerId) {
      return Promise.reject(`Not found customer Id number ${customerId}`);
    }
    if (msg.userId !== customerId.userId) {
      return Promise.reject(`Id is not match`);
    }
    return await this.db.customer.update({
      where: {
        customerId: customerId.customerId,
      },
      data: {
        firstname: msg.firstname,
        lastname: msg.lastname,
        gender: msg.gender,
        province: msg.province,
        sub_district: msg.sub_district,
        address: msg.address,
        contact: msg.contact,
      },
    });
  }
}
