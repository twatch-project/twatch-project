"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.newRepositoryBlog = void 0;
function newRepositoryBlog(prisma) {
    return new RepositoryBlog(prisma);
}
exports.newRepositoryBlog = newRepositoryBlog;
class RepositoryBlog {
    constructor(db) {
        this.db = db;
    }
    async createBlog(arg) {
        return await this.db.blog.create({
            data: {
                title: arg.title,
                body: arg.body,
                tag: arg.tag,
                province: arg.province,
                district: arg.district,
                sub_district: arg.sub_district,
                address: arg.address,
                customer: {
                    connect: {
                        customerId: arg.customerId,
                    },
                },
            },
        });
    }
}
//# sourceMappingURL=blog.js.map