import { Response } from "express";
import { IRepositoryBlog, IRepositoryCustomer } from "../repositories";
import { JwtAuthRequest } from "../auth";
import { Empty, IHandlerBlog, WithBlog, WithBlogId, WithBlogUpdate } from ".";

export function newHandlerBlog(
  repo: IRepositoryBlog,
  repoCus: IRepositoryCustomer,
) {
  return new HandlerBlog(repo, repoCus);
}

class HandlerBlog implements IHandlerBlog {
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

  async getBlogById(
    req: JwtAuthRequest<WithBlogId, Empty>,
    res: Response,
  ): Promise<Response> {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res
        .status(500)
        .json({ err: `Not found blog ${id}` })
        .end();
    }
    try {
      const getBlogId = await this.repo.getBlogbyId(id);
      return res.status(200).json(getBlogId).end();
    } catch (err) {
      console.error(err);
      return res
        .status(500)
        .json({ err: `Can't get blog ${err}` })
        .end();
    }
  }

  async getBlogsCustomer(_, res: Response): Promise<Response> {
    try {
      const getBlogs = await this.repo.getBlogs();
      return res.status(200).json(getBlogs).end();
    } catch (err) {
      console.error(err);
      return res
        .status(500)
        .json({ err: ` can't get all blogs with err ${err}` })
        .end();
    }
  }

  async updateCustomerBlog(
    req: JwtAuthRequest<WithBlogId, WithBlogUpdate>,
    res: Response,
  ): Promise<Response> {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res
        .status(500)
        .json({ err: `Not Found Blog id is ${id}` })
        .end();
    }
    const { title, body, tag, province, district, sub_district, address } =
      req.body;
    const getCustomerId = await this.repoCus.getCustomerToblog(req.payload.id);
    if (!getCustomerId) {
      return res.status(500).json({ err: `Not found ${getCustomerId}` });
    }
    try {
      const isUpdateBlog = await this.repo.updateBlogbyId({
        title,
        body,
        tag,
        province,
        district,
        sub_district,
        address,
        id: id,
        customerId: getCustomerId?.customerId,
        userId: req.payload.id,
      });
      return res.status(200).json(isUpdateBlog).end();
    } catch (err) {
      console.error(err);
      return res
        .status(500)
        .json({ err: `Found Blog err ${err}` })
        .end();
    }
  }
}
