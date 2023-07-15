"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RepositoryCustomer {
    constructor(db) {
        this.db = db;
    }
    //Send Request arg for create customer detail to database
    async createCustomer(arg) {
        return await this.db.customer.create({
            data: {
                ...arg,
            },
        });
    }
}
//# sourceMappingURL=customer.js.map