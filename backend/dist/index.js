"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const client_1 = require("@prisma/client");
const redis_1 = require("redis");
const user_1 = require("./repositories/user");
const blacklists_1 = require("./repositories/blacklists");
const user_2 = require("./handlers/user");
const jwt_1 = require("./auth/jwt");
const customer_1 = require("./handlers/customer");
const customer_2 = require("./repositories/customer");
const blog_1 = require("./handlers/blog");
const blog_2 = require("./repositories/blog");
async function main() {
    const db = new client_1.PrismaClient();
    const redis = (0, redis_1.createClient)();
    try {
        await redis.connect();
        await db.$connect();
    }
    catch (err) {
        console.error(err);
        return;
    }
    const repoUser = (0, user_1.newRepositoryUser)(db);
    const repoCustomer = (0, customer_2.newRepositoryCustomer)(db);
    const repoBlacklist = (0, blacklists_1.newRepositoryBlacklist)(redis);
    const repoBlog = (0, blog_2.newRepositoryBlog)(db);
    const handlerUser = (0, user_2.newHandlerUser)(repoUser, repoBlacklist);
    const handlerMiddleware = (0, jwt_1.newHandlerMiddleware)(repoBlacklist);
    const handlerCustomer = (0, customer_1.newHandlerCustomer)(repoCustomer);
    const handlerBlog = (0, blog_1.newHandlerBlog)(repoBlog, repoCustomer);
    const port = process.env.PORT || 8000;
    const server = (0, express_1.default)();
    const userRouter = express_1.default.Router();
    const authRouter = express_1.default.Router();
    const userBlog = express_1.default.Router();
    server.use((0, cors_1.default)());
    server.use(express_1.default.json());
    server.use(express_1.default.urlencoded({ extended: false }));
    server.use("/user", userRouter);
    server.use("/auth", authRouter);
    server.use("/blog", userBlog);
    // Check server status
    server.get("/", (_, res) => {
        return res.status(200).json({ status: "ok" }).end();
    });
    // User API
    userRouter.post("/", handlerUser.register.bind(handlerUser));
    authRouter.post("/login", handlerUser.login.bind(handlerUser));
    authRouter.get("/me", handlerMiddleware.jwtMiddleware.bind(handlerMiddleware), handlerUser.getId.bind(handlerUser));
    authRouter.get("/logout", handlerMiddleware.jwtMiddleware.bind(handlerMiddleware), handlerUser.logout.bind(handlerUser));
    //customer API
    //createcustomer
    userRouter.post("/customer", handlerMiddleware.jwtMiddleware.bind(handlerMiddleware), handlerCustomer.createCustomer.bind(handlerCustomer));
    userRouter.get("/customer/:id", handlerCustomer.getCustomerId.bind(handlerCustomer));
    userRouter.get("/customer", handlerCustomer.getCustomers.bind(handlerCustomer));
    userRouter.patch("/customer/:id", handlerMiddleware.jwtMiddleware.bind(handlerMiddleware), handlerCustomer.updateCustomer.bind(handlerCustomer));
    //Create blog
    userRouter.post("/customer/blog", handlerMiddleware.jwtMiddleware.bind(handlerMiddleware), handlerBlog.createCustomerBlog.bind(handlerBlog));
    userRouter.patch("/customer/blog/:id", handlerMiddleware.jwtMiddleware.bind(handlerMiddleware), handlerBlog.updateCustomerBlog.bind(handlerBlog));
    userBlog.get("/", handlerBlog.getBlogsCustomer.bind(handlerBlog));
    userRouter.get("/customer/blog/:id", handlerBlog.getBlogById.bind(handlerBlog));
    // server
    server.listen(port, () => console.log(`server listening on ${port}`));
}
main();
//# sourceMappingURL=index.js.map