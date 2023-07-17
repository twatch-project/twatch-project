"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.newRepositoryCustomer = void 0;
function newRepositoryCustomer(prisma) {
    return new RepositoryCustomer(prisma);
}
exports.newRepositoryCustomer = newRepositoryCustomer;
class RepositoryCustomer {
    constructor(db) {
        this.db = db;
    }
    //Send Request arg for create customer detail to database
    async createCustomer(arg) {
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
    async getCustomerById(id) {
        return await this.db.customer.findUnique({
            where: {
                customerId: id,
            },
        });
    }
    async getDetailCustomers() {
        return await this.db.customer.findMany({});
    }
}
//# sourceMappingURL=customer.js.map