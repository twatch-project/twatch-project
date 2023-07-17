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
}
//# sourceMappingURL=customer.js.map