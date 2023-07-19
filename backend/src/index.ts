import express from "express";
import cors from "cors";

import { PrismaClient } from "@prisma/client";
import { createClient } from "redis";
import { newRepositoryUser } from "./repositories/user";
import { newRepositoryBlacklist } from "./repositories/blacklists";
import { newHandlerUser } from "./handlers/user";
import { newHandlerMiddleware } from "./auth/jwt";
import { newHandlerCustomer } from "./handlers/customer";
import { newRepositoryCustomer } from "./repositories/customer";
import { newHandlerBlog } from "./handlers/blog";
import { newRepositoryBlog } from "./repositories/blog";

async function main() {
  const db = new PrismaClient();
  const redis = createClient<any, any, any>();

  try {
    await redis.connect();
    await db.$connect();
  } catch (err) {
    console.error(err);
    return;
  }

  const repoUser = newRepositoryUser(db);
  const repoCustomer = newRepositoryCustomer(db);
  const repoBlacklist = newRepositoryBlacklist(redis);
  const repoBlog = newRepositoryBlog(db);
  const handlerUser = newHandlerUser(repoUser, repoBlacklist);
  const handlerMiddleware = newHandlerMiddleware(repoBlacklist);
  const handlerCustomer = newHandlerCustomer(repoCustomer);
  const handlerBlog = newHandlerBlog(repoBlog, repoCustomer);

  const port = process.env.PORT || 8000;
  const server = express();
  const userRouter = express.Router();
  const authRouter = express.Router();
  const userBlog = express.Router();
  const customerRouter = express.Router();

  server.use(cors());
  server.use(express.json());
  server.use(express.urlencoded({ extended: false }));

  server.use("/user", userRouter);
  server.use("/auth", authRouter);
  server.use("/blog", userBlog);
  server.use("/customer", customerRouter);

  // Check server status
  server.get("/", (_, res) => {
    return res.status(200).json({ status: "ok" }).end();
  });

  // User API
  userRouter.post("/", handlerUser.register.bind(handlerUser));
  authRouter.post("/login", handlerUser.login.bind(handlerUser));
  authRouter.get(
    "/me",
    handlerMiddleware.jwtMiddleware.bind(handlerMiddleware),
    handlerUser.getId.bind(handlerUser),
  );
  authRouter.get(
    "/logout",
    handlerMiddleware.jwtMiddleware.bind(handlerMiddleware),
    handlerUser.logout.bind(handlerUser),
  );

  //customer API
  //createcustomer
  customerRouter.post(
    "/",
    handlerMiddleware.jwtMiddleware.bind(handlerMiddleware),
    handlerCustomer.createCustomer.bind(handlerCustomer),
  );
  customerRouter.get(
    "/:id",
    handlerCustomer.getCustomerId.bind(handlerCustomer),
  );
  customerRouter.get("/", handlerCustomer.getCustomers.bind(handlerCustomer));
  customerRouter.patch(
    "/:id",
    handlerMiddleware.jwtMiddleware.bind(handlerMiddleware),
    handlerCustomer.updateCustomer.bind(handlerCustomer),
  );

  //Create blog
  customerRouter.post(
    "/blog",
    handlerMiddleware.jwtMiddleware.bind(handlerMiddleware),
    handlerBlog.createCustomerBlog.bind(handlerBlog),
  );
  customerRouter.patch(
    "/blog/:id",
    handlerMiddleware.jwtMiddleware.bind(handlerMiddleware),
    handlerBlog.updateCustomerBlog.bind(handlerBlog),
  );
  userBlog.get("/", handlerBlog.getBlogsCustomer.bind(handlerBlog));
  customerRouter.get("/blog/:id", handlerBlog.getBlogById.bind(handlerBlog));

  // server
  server.listen(port, () => console.log(`server listening on ${port}`));
}

main();
