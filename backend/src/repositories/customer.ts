import { PrismaClient } from "@prisma/client";
import { ICreateCustomer, ICustomer } from "../entities";
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
}
