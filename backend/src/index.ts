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

  server.use(cors());
  server.use(express.json());
  server.use(express.urlencoded({ extended: false }));

  server.use("/user", userRouter);
  server.use("/auth", authRouter);

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
  userRouter.post(
    "/customer",
    handlerMiddleware.jwtMiddleware.bind(handlerMiddleware),
    handlerCustomer.createCustomer.bind(handlerCustomer),
  );
  userRouter.get(
    "/customer/:id",
    handlerCustomer.getCustomerId.bind(handlerCustomer),
  );
  userRouter.get(
    "/customer",
    handlerCustomer.getCustomers.bind(handlerCustomer),
  );
  userRouter.patch(
    "/customer/:id",
    handlerMiddleware.jwtMiddleware.bind(handlerMiddleware),
    handlerCustomer.updateCustomer.bind(handlerCustomer),
  );

  //Create blog
  userRouter.post(
    "/customer/blog",
    handlerMiddleware.jwtMiddleware.bind(handlerMiddleware),
    handlerBlog.createCustomerBlog.bind(handlerBlog),
  );
  userRouter.patch(
    "/customer/blog/:id",
    handlerMiddleware.jwtMiddleware.bind(handlerMiddleware),
    handlerBlog.updateCustomerBlog.bind(handlerBlog),
  );
  userRouter.get(
    "/customer/blog/:id",
    handlerBlog.getBlogById.bind(handlerBlog),
  );

  // server
  server.listen(port, () => console.log(`server listening on ${port}`));
}

main();
