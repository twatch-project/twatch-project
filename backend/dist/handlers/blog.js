"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.newHandlerBlog = void 0;
function newHandlerBlog(repo, repoCus) {
    return new HandlerBlog(repo, repoCus);
}
exports.newHandlerBlog = newHandlerBlog;
class HandlerBlog {
    constructor(repo, repoCus) {
        this.repo = repo;
        this.repoCus = repoCus;
    }
    async createCustomerBlog(req, res) {
        const { title, body, tag, province, district, sub_district, address } = req.body;
        if (!title || !body || !province) {
            return res
                .status(500)
                .json({ err: `Must have title body and province` })
                .end();
        }
        const getCustomer = await this.repoCus.getCustomerToblog(req.payload.id);
        if (!getCustomer) {
            return res.status(500).json({ err: `No Have Token` });
        }
        try {
            const isCreateBlog = await this.repo.createBlog({
                title,
                body,
                tag,
                province,
                district,
                sub_district,
                address,
                customerId: getCustomer?.customerId,
            });
            return res.status(200).json(isCreateBlog).end();
        }
        catch (err) {
            console.error(err);
            return res
                .status(500)
                .json({ err: `Can't create blog with error code ${err}` });
        }
    }
}
//# sourceMappingURL=blog.js.map