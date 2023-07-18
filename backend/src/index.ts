import express from "express";
import cors from "cors";

import { PrismaClient } from "@prisma/client";
import { createClient } from "redis";
import { newRepositoryUser } from "./repositories/user";
import { newRepositoryBlacklist } from "./repositories/blacklists";
import { newHandlerUser } from "./handlers/user";
import { newHandlerMiddleware } from "./auth/jwt";
import { newRepositoryCompany } from "./repositories/company";
import { newHandlerCompany } from "./handlers/company";
import { newRepositoryPortfolio } from "./repositories/portfolio";
import { newHandlerPortfolio } from "./handlers/portfolio";

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
  const repoCompany = newRepositoryCompany(db);
  const handlerCompany = newHandlerCompany(repoCompany);
  const repoPort = newRepositoryPortfolio(db);
  const handlerPortfolio = newHandlerPortfolio(repoPort, repoCompany);

  const port = process.env.PORT || 8000;
  const server = express();
  const userRouter = express.Router();
  const authRouter = express.Router();
  const companyRouter = express.Router();
  const portfolioRouter = express.Router();

  server.use(cors());
  server.use(express.json());
  server.use(express.urlencoded({ extended: false }));

  server.use("/user", userRouter);
  server.use("/auth", authRouter);
  server.use("/company", companyRouter);
  server.use("/portfolio", portfolioRouter);

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

  // Company API
  companyRouter.post(
    "/",
    handlerMiddleware.jwtMiddleware.bind(handlerMiddleware),
    handlerCompany.createCompany.bind(handlerCompany)
  );
  companyRouter.get("/", handlerCompany.getCompanys.bind(handlerCompany));
  companyRouter.get(
    "/:companyId",
    handlerCompany.getCompanyById.bind(handlerCompany)
  );
  companyRouter.patch(
    "/:companyId",
    handlerMiddleware.jwtMiddleware.bind(handlerMiddleware),
    handlerCompany.updateCompanyInfo.bind(handlerCompany)
  );

  // Portfolio API
  portfolioRouter.post(
    "/",
    handlerMiddleware.jwtMiddleware.bind(handlerMiddleware),
    handlerPortfolio.createPortfolio.bind(handlerPortfolio)
  );
  portfolioRouter.get("/", handlerPortfolio.getPorts.bind(handlerPortfolio));
  portfolioRouter.get(
    "/:portId",
    handlerPortfolio.getPortById.bind(handlerPortfolio)
  );
  portfolioRouter.get(
    "/company/:companyId",
    handlerPortfolio.getCompanyPorts.bind(handlerPortfolio)
  );
  portfolioRouter.patch(
    "/:portId",
    handlerMiddleware.jwtMiddleware.bind(handlerMiddleware),
    handlerPortfolio.updatePort.bind(handlerPortfolio)
  );
  portfolioRouter.delete(
    "/:portId",
    handlerMiddleware.jwtMiddleware.bind(handlerMiddleware),
    handlerPortfolio.deletePortById.bind(handlerPortfolio)
  );

  // server
  server.listen(port, () => console.log(`server listening on ${port}`));
}

main();
