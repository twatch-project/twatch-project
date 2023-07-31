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
import { newRepositoryCompany } from "./repositories/company";
import { newHandlerCompany } from "./handlers/company";
import { newRepositoryPortfolio } from "./repositories/portfolio";
import { newHandlerPortfolio } from "./handlers/portfolio";
import { newRepositoryCommentPort } from "./repositories/commentport";
import { newHandlerCommentPort } from "./handlers/commentport";
import multer from "multer";

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
  const repoCompany = newRepositoryCompany(db);
  const handlerCompany = newHandlerCompany(repoCompany);
  const repoPort = newRepositoryPortfolio(db);
  const handlerPortfolio = newHandlerPortfolio(repoPort, repoCompany);
  const repoCommentPort = newRepositoryCommentPort(db);
  const handlerCommentPort = newHandlerCommentPort(repoCommentPort);

  const port = process.env.PORT || 8000;
  const server = express();
  const userRouter = express.Router();
  const authRouter = express.Router();
  const userBlog = express.Router();
  const customerRouter = express.Router();
  const companyRouter = express.Router();
  const portfolioRouter = express.Router();
  const commentRouter = express.Router();
  const storage = multer.memoryStorage();
  const upload = multer({ storage: storage });

  server.use(cors());
  server.use(express.json());
  server.use(express.urlencoded({ extended: false }));
  server.use(express.static("public"));

  server.use("/user", userRouter);
  server.use("/auth", authRouter);
  server.use("/blog", userBlog);
  server.use("/customer", customerRouter);
  server.use("/company", companyRouter);
  server.use("/portfolio", portfolioRouter);
  server.use("/comment", commentRouter);

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

  //customer API
  //createcustomer
  customerRouter.post(
    "/",
    handlerMiddleware.jwtMiddleware.bind(handlerMiddleware),
    handlerCustomer.createCustomer.bind(handlerCustomer)
  );
  customerRouter.get(
    "/:id",
    handlerCustomer.getCustomerId.bind(handlerCustomer)
  );
  customerRouter.get("/", handlerCustomer.getCustomers.bind(handlerCustomer));
  customerRouter.patch(
    "/:id",
    handlerMiddleware.jwtMiddleware.bind(handlerMiddleware),
    handlerCustomer.updateCustomer.bind(handlerCustomer)
  );

  //Create blog
  customerRouter.post(
    "/blog",
    handlerMiddleware.jwtMiddleware.bind(handlerMiddleware),
    handlerBlog.createCustomerBlog.bind(handlerBlog)
  );
  customerRouter.patch(
    "/blog/:id",
    handlerMiddleware.jwtMiddleware.bind(handlerMiddleware),
    handlerBlog.updateCustomerBlog.bind(handlerBlog)
  );
  userBlog.get("/", handlerBlog.getBlogsCustomer.bind(handlerBlog));
  customerRouter.get("/blog/:id", handlerBlog.getBlogById.bind(handlerBlog));
  handlerUser.logout.bind(handlerUser);

  // Company API
  companyRouter.post(
    "/",
    handlerMiddleware.jwtMiddleware.bind(handlerMiddleware),
    upload.fields([
      { name: "company", maxCount: 1 },
      { name: "content", maxCount: 5 },
    ]),
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
    upload.fields([
      { name: "company", maxCount: 1 },
      { name: "content", maxCount: 5 },
    ]),
    handlerCompany.updateCompanyInfo.bind(handlerCompany)
  );

  // Portfolio API
  portfolioRouter.post(
    "/",
    handlerMiddleware.jwtMiddleware.bind(handlerMiddleware),
    upload.fields([{ name: "content", maxCount: 5 }]),
    handlerPortfolio.createPortfolio.bind(handlerPortfolio)
  );
  portfolioRouter.get("/", handlerPortfolio.getPorts.bind(handlerPortfolio));
  portfolioRouter.get(
    "/:portId",
    handlerPortfolio.getPortById.bind(handlerPortfolio),
    handlerPortfolio.getRatingByPortId.bind(handlerPortfolio)
  );
  portfolioRouter.get(
    "/company/:companyId",
    handlerPortfolio.getCompanyPorts.bind(handlerPortfolio)
  );
  portfolioRouter.patch(
    "/:portId",
    handlerMiddleware.jwtMiddleware.bind(handlerMiddleware),
    upload.fields([{ name: "content", maxCount: 5 }]),
    handlerPortfolio.updatePort.bind(handlerPortfolio)
  );
  portfolioRouter.delete(
    "/:portId",
    handlerMiddleware.jwtMiddleware.bind(handlerMiddleware),
    handlerPortfolio.deletePortById.bind(handlerPortfolio)
  );

  //Comment API
  commentRouter.post(
    "/:portId",
    handlerMiddleware.jwtMiddleware.bind(handlerMiddleware),
    handlerCommentPort.createCommentPort.bind(handlerCommentPort)
  );
  commentRouter.get(
    "/:portId",
    handlerCommentPort.getCommentByPortId.bind(handlerCommentPort)
  );
  commentRouter.patch(
    "/:commentId",
    handlerMiddleware.jwtMiddleware.bind(handlerMiddleware),
    handlerCommentPort.updateCommentPortfolio.bind(handlerCommentPort)
  );
  commentRouter.delete(
    "/:commentId", console.log("hello"),
    handlerMiddleware.jwtMiddleware.bind(handlerMiddleware),
    handlerCommentPort.deleteCommentPortfolio.bind(handlerCommentPort)
  );

  // server
  server.listen(port, () => console.log(`server listening on ${port}`));
}

main();
