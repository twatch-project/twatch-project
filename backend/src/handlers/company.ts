import { Request, Response } from "express";
import { IHandlerCompany, WithCompany, WithCompanyId } from ".";
import { JwtAuthRequest } from "../auth";
import { IRepositoryCompany } from "../repositories";

export function newHandlerCompany(repoCompany: IRepositoryCompany) {
  return new HandlerCompany(repoCompany);
}

class HandlerCompany implements IHandlerCompany {
  private repo: IRepositoryCompany;

  constructor(repo: IRepositoryCompany) {
    this.repo = repo;
  }

  async createCompany(
    req: JwtAuthRequest<Request, WithCompany>,
    res: Response,
  ): Promise<Response> {
    const companyRole = req.payload.role;
    if (companyRole !== "COMPANY") {
      return res.status(400).json({ error: "not company role" }).end();
    }

    const {
      companyName,
      companyRegistration,
      address,
      sub_district,
      district,
      province,
      postCode,
      contact,
      tag,
    } = req.body;

    if (
      !companyName ||
      !companyRegistration ||
      !address ||
      !sub_district ||
      !district ||
      !province ||
      !postCode ||
      !contact ||
      !tag
    ) {
      return res.status(400).json({ error: "missing json body" }).end();
    }
    try {
      const company = await this.repo.createCompany({
        companyName,
        companyRegistration,
        address,
        sub_district,
        district,
        province,
        postCode,
        contact,
        tag,
        userId: req.payload.id,
      });
      return res.status(200).json({ company, status: "ok" }).end();
    } catch (err) {
      console.error(err);
      return res
        .status(500)
        .json({ error: `failed to create company with error : ${err}` })
        .end();
    }
  }

  async getCompanys(_, res: Response): Promise<Response> {
    try {
      const companys = await this.repo.getCompanys();
      return res.status(200).json({ companys, status: "ok" }).end();
    } catch (err) {
      console.error(err);
      return res
        .status(500)
        .json({ err: `failed to get companys with error : ${err}` })
        .end();
    }
  }

  async getCompanyById(
    req: JwtAuthRequest<WithCompanyId, WithCompany>,
    res: Response,
  ): Promise<Response> {
    const companyId = Number(req.params.companyId);

    if (isNaN(companyId)) {
      return res
        .status(400)
        .json({ error: `id ${req.params.companyId} is not a number` });
    }

    return this.repo
      .getCompanyById(companyId)
      .then((company) => {
        if (!company) {
          return res
            .status(404)
            .json({ error: `no such todo: ${companyId}` })
            .end();
        }

        return res.status(200).json(company).end();
      })
      .catch((err) => {
        const errMsg = `failed to get todo ${companyId}: ${err}`;
        console.error(errMsg);
        return res.status(500).json({ error: errMsg });
      });
  }

  async updateCompanyInfo(
    req: JwtAuthRequest<WithCompanyId, WithCompany>,
    res: Response,
  ): Promise<Response> {
    const companyRole = req.payload.role;
    if (companyRole !== "COMPANY") {
      return res.status(400).json({ error: "not company role" }).end();
    }

    const companyId = Number(req.params.companyId);
    // isNaN checks if its arg is NaN
    if (isNaN(companyId)) {
      return res
        .status(400)
        .json({ error: `id ${req.params.companyId} is not a number` });
    }

    const {
      address,
      sub_district,
      district,
      province,
      postCode,
      contact,
      tag,
    } = req.body;

    const userId = req.payload.id;

    return this.repo
      .updateCompanyInfo({
        address,
        sub_district,
        district,
        province,
        postCode,
        contact,
        tag,
        companyId: companyId,
        userId,
      })
      .then((updated) => res.status(201).json(updated).end())
      .catch((err) => {
        const errMsg = `failed to update company ${companyId}: ${err}`;
        console.error(errMsg);
        return res.status(500).json({ error: errMsg }).end();
      });
  }
}
