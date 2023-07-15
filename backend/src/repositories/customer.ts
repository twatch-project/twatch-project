import { PrismaClient } from "@prisma/client";
import { ICreatecustomer, ICustomer } from "../entities";

class RepositoryCustomer {
    private db: PrismaClient;

    constructor(db: PrismaClient) {
        this.db = db;
    }

    //Send Request arg for create customer detail to database
    async createCustomer(arg: ICreatecustomer): Promise<ICustomer> {
        return await this.db.customer.create({
            data: {
                ...arg,
            },
        });
    }
}
