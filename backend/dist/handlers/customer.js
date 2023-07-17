"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.newHandlerCustomer = void 0;
function newHandlerCustomer(repo) {
    return new HandlerCustomer(repo);
}
exports.newHandlerCustomer = newHandlerCustomer;
class HandlerCustomer {
    constructor(repo) {
        this.repo = repo;
    }
    async createCustomer(req, res) {
        const { firstname, lastname, gender, dateOfBirth, citizenId, province, district, sub_district, address, contact, } = req.body;
        if (!firstname ||
            !lastname ||
            !citizenId ||
            !province ||
            !district ||
            !sub_district) {
            res.status(500).json({ err: `Must have fill` }).end();
        }
        const covertDateOfBirth = new Date(dateOfBirth[0], dateOfBirth[1], dateOfBirth[2]); // (year , mouth 0-11 , day 0-30)
        const userId = req.payload.id;
        const customerInfo = {
            firstname,
            lastname,
            gender,
            dateOfBirth: covertDateOfBirth,
            citizenId,
            province,
            district,
            sub_district,
            address,
            contact,
            userId,
        };
        try {
            const getCreateCustomer = await this.repo.createCustomer(customerInfo);
            return res.status(200).json(getCreateCustomer).end();
        }
        catch (err) {
            console.error(err);
            return res
                .status(500)
                .json({ err: `Can't Create customer ${err}` });
        }
    }
}
//# sourceMappingURL=customer.js.map