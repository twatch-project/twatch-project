import { Request, Response } from "express";
import { IRepositoryCompany, IRepositoryPortfolio } from "../repositories";
import {
  Empty,
  IHandlerPorfolio,
  WithCompanyId,
  WithPort,
  WithPortId,
} from ".";
import { JwtAuthRequest } from "../auth";

export function newHandlerPortfolio(
  repoPort: IRepositoryPortfolio,
  repoCompany: IRepositoryCompany,
) {
  return new HandlerPortfolio(repoPort, repoCompany);
}

class HandlerPortfolio implements IHandlerPorfolio {
  private repoPort: IRepositoryPortfolio;
  private repoCompany: IRepositoryCompany;

  constructor(repoPort: IRepositoryPortfolio, repoCompany: IRepositoryCompany) {
    this.repoPort = repoPort;
    this.repoCompany = repoCompany;
  }

  async createPortfolio(
    req: JwtAuthRequest<Request, WithPort>,
    res: Response,
  ): Promise<Response> {
    const companyRole = req.payload.role;
    if (companyRole !== "COMPANY") {
      return res.status(400).json({ error: "not company role" }).end();
    }

    const {
      title,
      body,
      tag,
      address,
      sub_district,
      district,
      province,
      postCode,
    } = req.body;

    if (
      !title ||
      !body ||
      !tag ||
      !address ||
      !sub_district ||
      !district ||
      !province ||
      !postCode
    ) {
      return res.status(400).json({ error: "missing json body" }).end();
    }
    const updateAt = new Date();
    const createAt = new Date();
    const userId = req.payload.id;

    const company = await this.repoCompany.getCompanyId(userId);
    if (!company) throw new Error("company id not found");

    try {
      const port = this.repoPort.createPort({
        title,
        body,
        tag,
        address,
        sub_district,
        district,
        province,
        postCode,
        updateAt,
        createAt,
        companyId: company.companyId,
      });
      return res.status(201).json({ port, status: "ok" }).end();
    } catch (err) {
      console.error(err);
      return res
        .status(500)
        .json(`Can't Create portfolio with error : ${err}`)
        .end();
    }
  }

  async getPorts(_, res: Response): Promise<Response> {
    try {
      const ports = await this.repoPort.getPorts();
      return res.status(200).json({ ports, status: "ok" }).end();
    } catch (err) {
      console.error(err);
      return res
        .status(500)
        .json(`Can't Get Portfolio with error : ${err}`)
        .end();
    }
  }

  async getPortById(
    req: JwtAuthRequest<WithPortId, WithPort>,
    res: Response,
  ): Promise<Response> {
    const portId = Number(req.params.portId);

    if (isNaN(portId)) {
      return res
        .status(400)
        .json({ error: `id ${req.params.portId} is not a number` });
    }
    try {
      const port = await this.repoPort.getPortById(portId);
      if (!port) {
        return res.status(401).json("No such a Port").end();
      }
      return res.status(200).json({ port, status: "ok" }).end();
    } catch (err) {
      console.error(err);
      return res
        .status(500)
        .json(`Can't get Port ID with Error Code ${err}`)
        .end();
    }
  }

  async getCompanyPorts(
    req: JwtAuthRequest<WithCompanyId, Empty>,
    res: Response,
  ): Promise<Response> {
    const companyId = Number(req.params.companyId);

    if (isNaN(companyId)) {
      return res
        .status(400)
        .json({ error: `id ${req.params.companyId} is not a number` });
    }

    return this.repoPort
      .getCompanyPorts(companyId)
      .then((ports) => res.status(200).json(ports).end())
      .catch((err) => {
        console.error(`failed to get ports: ${err}`);
        return res.status(500).json({ error: `failed to get ports` }).end();
      });
  }

  async updatePort(
    req: JwtAuthRequest<WithPortId, WithPort>,
    res: Response,
  ): Promise<Response> {
    const companyRole = req.payload.role;
    if (companyRole !== "COMPANY") {
      return res.status(400).json({ error: "not company role" }).end();
    }

    const portId = Number(req.params.portId);
    // isNaN checks if its arg is NaN
    if (isNaN(portId)) {
      return res
        .status(400)
        .json({ error: `id ${req.params.portId} is not a number` });
    }
    const {
      title,
      body,
      address,
      sub_district,
      district,
      province,
      postCode,
      tag,
    } = req.body;

    const userId = req.payload.id;
    const company = await this.repoCompany.getCompanyId(userId);
    if (!company) throw new Error("company id not found");

    const updateAt = new Date();

    return this.repoPort
      .updatePort({
        portId,
        title,
        body,
        tag,
        address,
        sub_district,
        district,
        province,
        postCode,
        updateAt,
        companyId: company.companyId,
      })
      .then((updated) => res.status(201).json(updated).end())
      .catch((err) => {
        const errMsg = `failed to update port ${portId}: ${err}`;
        console.error(errMsg);
        return res.status(500).json({ error: errMsg }).end();
      });
  }

  async deletePortById(
    req: JwtAuthRequest<WithPortId, WithPort>,
    res: Response,
  ): Promise<Response> {
    const companyRole = req.payload.role;
    if (companyRole !== "COMPANY") {
      return res.status(400).json({ error: "not company role" }).end();
    }

    const portId = Number(req.params.portId);
    // isNaN checks if its arg is NaN
    if (isNaN(portId)) {
      return res
        .status(400)
        .json({ error: `id ${req.params.portId} is not a number` });
    }

    const userId = req.payload.id;
    const company = await this.repoCompany.getCompanyId(userId);
    if (!company) throw new Error("company id not found");

    return this.repoPort
      .deletePortById({ portId: portId, companyId: company.companyId })
      .then((deleted) => res.status(200).json(deleted).end())
      .catch((err) => {
        console.error(`failed to delete port ${portId}: ${err}`);
        return res
          .status(500)
          .json({ error: `failed to delete port ${portId}` });
      });
  }
}
