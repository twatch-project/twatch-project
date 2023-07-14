import express from "express";
import cors from "cors";

import { PrismaClient } from "@prisma/client";
import { createClient } from "redis";
import { newRepositoryUser } from "./repositories/user";
import { newRepositoryBlacklist } from "./repositories/blacklists";
import { newHandlerUser } from "./handlers/user";
import { newHandlerMiddleware } from "./auth/jwt";

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
  const repoBlacklist = newRepositoryBlacklist(redis);
  const handlerUser = newHandlerUser(repoUser, repoBlacklist);
  const handlerMiddleware = newHandlerMiddleware(repoBlacklist);

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
    handlerUser.getId.bind(handlerUser)
  );
  authRouter.get(
    "/logout",
    handlerMiddleware.jwtMiddleware.bind(handlerMiddleware),
    handlerUser.logout.bind(handlerUser)
  );

  // server
  server.listen(port, () => console.log(`server listening on ${port}`));
}

main();
