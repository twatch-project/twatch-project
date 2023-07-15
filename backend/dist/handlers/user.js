"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.newHandlerUser = void 0;
const bcrypts_1 = require("../auth/bcrypts");
const jwt_1 = require("../auth/jwt");
function newHandlerUser(repo, repoBlacklist) {
    return new HandlerUser(repo, repoBlacklist);
}
exports.newHandlerUser = newHandlerUser;
class HandlerUser {
    constructor(repo, repoBlacklist) {
        this.repo = repo;
        this.repoBlacklist = repoBlacklist;
    }
    async register(req, res) {
        const { username, password, role, email } = req.body;
        const registeredAt = new Date();
        if (!username || !password || !role || !email) {
            return res.status(400).json({
                error: "missing username or password or role or email in body",
            });
        }
        return this.repo
            .createUser({
            username,
            password: await (0, bcrypts_1.hashPassword)(password),
            role,
            email,
            registeredAt,
        })
            .then((newUser) => res
            .status(201)
            .json({ ...newUser, password: undefined })
            .end())
            .catch((err) => {
            const errMsg = `failed to create user ${username}`;
            console.error(`${errMsg}: ${err}`);
            return res.status(500).json({ error: errMsg }).end();
        });
    }
    async getId(req, res) {
        if (!req.payload.id) {
            return res.status(400).json({ error: "wrong username or password" });
        }
        console.log(req.payload.id);
        return this.repo
            .getId(req.payload.id)
            .then((user) => res.status(200).json(user))
            .catch((err) => {
            const errMsg = `failed to get id`;
            console.error(`${errMsg}: ${err}`);
            return res.status(500).json({ error: `failed to get id` });
        });
    }
    async login(req, res) {
        const { username, password } = req.body;
        if (!username || !password) {
            return res
                .status(400)
                .json({ error: "missing username or password in body" });
        }
        return this.repo
            .getUserByUsername(username)
            .then((user) => {
            if (!user) {
                return res
                    .status(404)
                    .json({ error: `no such user: ${username}`, statusCode: 401 });
            }
            if (!(0, bcrypts_1.compareHash)(password, user.password)) {
                return res.status(401).json({ error: `invalid credentail` });
            }
            const payload = { id: user.userId, username: user.username };
            const token = (0, jwt_1.newJwt)(payload);
            return res.status(200).json({
                status: "logined",
                id: user.userId,
                username: user.username,
                role: user.role,
                registeredAt: user.registeredAt,
                accessToken: token,
            });
        })
            .catch((err) => {
            const errMsg = `failed to get user ${username}`;
            console.error(`${errMsg}: ${err}`);
            return res
                .status(500)
                .json({ error: `failed to login user ${username}` });
        });
    }
    async logout(req, res) {
        return this.repoBlacklist
            .addToBlackList(req.token)
            .then(() => res.status(200).json({ status: `logged out successfully` }).end())
            .catch((err) => {
            const errMsg = `failed to logout`;
            console.error(`${errMsg}: ${err}`);
            return res.status(500).json({ error: `failed to logout` });
        });
    }
}
//# sourceMappingURL=user.js.map