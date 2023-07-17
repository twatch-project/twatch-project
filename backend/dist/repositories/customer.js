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
    async updateCustomerById(msg) {
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
//# sourceMappingURL=customer.js.map