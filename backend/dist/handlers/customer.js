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
        console.log("user id ", userId);
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
            return res.status(500).json({ err: `Can't Create customer ${err}` });
        }
    }
    async getCustomerId(req, res) {
        const id = Number(req.params.id);
        if (!id) {
            return res
                .status(500)
                .json({ err: `Not found customer ID ${id}` })
                .end();
        }
        if (isNaN(id)) {
            return res
                .status(500)
                .json({ err: `ID ${id} is not a number !!!` })
                .end();
        }
        try {
            const getCustomerId = await this.repo.getCustomerById(id);
            return res.status(200).json(getCustomerId).end();
        }
        catch (err) {
            console.error(err);
            return res
                .status(500)
                .json({ err: ` Can get Customer By id Err : ${err}` })
                .end();
        }
    }
    async getCustomers(_, res) {
        try {
            const getAllCustomer = await this.repo.getDetailCustomers();
            return res.status(200).json(getAllCustomer).end();
        }
        catch (err) {
            console.error(err);
            return res
                .status(500)
                .json({ msg: `Can't get all Customer err : ${err}` })
                .end();
        }
    }
    async updateCustomer(req, res) {
        const id = Number(req.params.id);
        if (isNaN(id)) {
            return res
                .status(500)
                .json({ err: `Not Found Customer id is ${id}` })
                .end();
        }
        const { firstname, lastname, gender, province, district, sub_district, address, contact, } = req.body;
        try {
            const isUpdate = await this.repo.updateCustomerById({
                firstname,
                lastname,
                gender,
                province,
                district,
                sub_district,
                address,
                contact,
                id: id,
                userId: req.payload.id,
            });
            return res.status(200).json(isUpdate).end();
        }
        catch (err) {
            console.error(err);
            return res
                .status(500)
                .json({ err: `Can't Update ${err}` })
                .end();
        }
    }
}
//# sourceMappingURL=customer.js.map