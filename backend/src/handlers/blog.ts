import { Response } from "express";
import { IRepositoryBlog, IRepositoryCustomer } from "../repositories";
import { JwtAuthRequest } from "../auth";
import { Empty, WithBlog } from ".";

export function newHandlerBlog(
  repo: IRepositoryBlog,
  repoCus: IRepositoryCustomer,
) {
  return new HandlerBlog(repo, repoCus);
}

class HandlerBlog {
  private repo: IRepositoryBlog;
  private repoCus: IRepositoryCustomer;

  constructor(repo: IRepositoryBlog, repoCus: IRepositoryCustomer) {
    this.repo = repo;
    this.repoCus = repoCus;
  }

  async createCustomerBlog(
    req: JwtAuthRequest<Empty, WithBlog>,
    res: Response,
  ): Promise<Response> {
    const { title, body, tag, province, district, sub_district, address } =
      req.body;
    if (!title || !body || !province) {
      return res
        .status(500)
        .json({ err: `Must have title body and province` })
        .end();
    }
    const getCustomer = await this.repoCus.getCustomerToblog(req.payload.id);
    if (!getCustomer) {
      return res.status(500).json({ err: `No Have Token` });
    }
    try {
      const isCreateBlog = await this.repo.createBlog({
        title,
        body,
        tag,
        province,
        district,
        sub_district,
        address,
        customerId: getCustomer?.customerId,
      });
      return res.status(200).json(isCreateBlog).end();
    } catch (err) {
      console.error(err);
      return res
        .status(500)
        .json({ err: `Can't create blog with error code ${err}` });
    }
  }
}
