"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.newRepositoryUser = void 0;
function newRepositoryUser(db) {
    return new RepositoryUser(db);
}
exports.newRepositoryUser = newRepositoryUser;
class RepositoryUser {
    constructor(db) {
        this.db = db;
    }
    async createUser(user) {
        return await this.db.user.create({ data: user });
    }
    async getUserByUsername(username) {
        return await this.db.user.findUnique({ where: { username } });
    }
    async getId(userId) {
        return await this.db.user.findUnique({ where: { userId } });
    }
}
//# sourceMappingURL=user.js.map