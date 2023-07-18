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
            include: {
                customer: {
                    select: {
                        userId: true,
                    },
                },
            },
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
    async getBlogbyId(id) {
        return await this.db.blog.findUnique({
            where: {
                blogId: id,
            },
        });
    }
    async getBlogs() {
        return await this.db.blog.findMany({
            include: {
                customer: {
                    select: {
                        firstname: true,
                        address: true,
                    },
                },
            },
        });
    }
    async updateBlogbyId(msg) {
        const customerId = await this.db.blog.findUnique({
            where: {
                blogId: msg.id,
            },
        });
        if (!customerId) {
            return Promise.reject(`Not found Blog number ${customerId}`);
        }
        if (msg.customerId !== customerId.customerId) {
            return Promise.reject(`Id customer Not match`);
        }
        return await this.db.blog.update({
            where: {
                blogId: customerId.blogId,
            },
            data: {
                title: msg.title,
                body: msg.body,
                tag: msg.tag,
                province: msg.province,
                district: msg.district,
                sub_district: msg.sub_district,
                address: msg.address,
            },
        });
    }
}
//# sourceMappingURL=blog.js.map