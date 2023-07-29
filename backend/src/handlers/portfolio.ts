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
import {
  generateFileName,
  getObjectSignedUrl,
  uploadFile,
} from "../services/aws";
import sharp from "sharp";

export function newHandlerPortfolio(
  repoPort: IRepositoryPortfolio,
  repoCompany: IRepositoryCompany
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
    res: Response
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

    if (!req.files) {
      return res.status(400);
    }

    const fContents = req.files["content"];

    const imageContents: string[] = fContents.map(() => generateFileName());

    const fileBufferContents: Buffer[] = await Promise.all(
      fContents.map(async (fContent): Promise<Buffer> => {
        return await sharp(fContent.buffer)
          .resize({ height: 1920, width: 1080, fit: "contain" })
          .toBuffer();
      })
    );

    for (let i = 0; i < imageContents.length; i++) {
      await uploadFile(
        fileBufferContents[i],
        imageContents[i],
        fContents[i]?.mimetype
      );
    }

    const imageContentUrls: string[] = await Promise.all(
      imageContents.map(async (imageContent): Promise<string> => {
        return await getObjectSignedUrl(imageContent);
      })
    );

    const updateAt = new Date();
    const createAt = new Date();
    const userId = req.payload.id;

    const company = await this.repoCompany.getCompanyId(userId);
    if (!company) throw new Error("company id not found");

    try {
      const port = await this.repoPort.createPort({
        title,
        imageContents,
        imageContentUrls,
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
    req: JwtAuthRequest<WithPortId, Empty>,
    res: Response
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

  async getRatingByPortId(
    req: JwtAuthRequest<WithPortId, Empty>,
    res: Response
  ): Promise<Response> {
    const portId = Number(req.params.portId);

    if (isNaN(portId)) {
      return res
        .status(400)
        .json({ error: `id ${req.params.portId} is not a number` });
    }
    try {
      const port = await this.repoPort.getRatingByPortId(portId);
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
    res: Response
  ): Promise<Response> {
    const companyId = Number(req.params.companyId);

    if (isNaN(companyId)) {
      return res
        .status(400)
        .json({ error: `id ${req.params.companyId} is not a number` });
    }
    try {
      const ports = await this.repoPort.getCompanyPorts(companyId);
      if (!ports) {
        return res.status(401).json("No such a company port").end();
      }
      return res.status(200).json({ ports, status: "ok" }).end();
    } catch (err) {
      console.error(err);
      return res
        .status(500)
        .json(`Can't get company port with error code : ${err}`)
        .end();
    }
  }

  async updatePort(
    req: JwtAuthRequest<WithPortId, WithPort>,
    res: Response
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
      tag,
      postCode,
    } = req.body;

    const userId = req.payload.id;
    const company = await this.repoCompany.getCompanyId(userId);
    if (!company) throw new Error("company id not found");

    const updateAt = new Date();
    let imageContents: string[] | undefined;
    let imageContentUrls: string[] | undefined;

    if (req.files) {
      const fContents = req.files["content"];

      const imageContents: string[] = fContents.map(() => generateFileName());

      const fileBufferContents: Buffer[] = await Promise.all(
        fContents.map(async (fContent): Promise<Buffer> => {
          return await sharp(fContent.buffer)
            .resize({ height: 1920, width: 1080, fit: "contain" })
            .toBuffer();
        })
      );

      for (let i = 0; i < imageContents.length; i++) {
        await uploadFile(
          fileBufferContents[i],
          imageContents[i],
          fContents[i]?.mimetype
        );
      }

      imageContentUrls = await Promise.all(
        imageContents.map(async (imageContent): Promise<string> => {
          return await getObjectSignedUrl(imageContent);
        })
      );
    }

    try {
      const updated = this.repoPort.updatePort({
        portId,
        title,
        imageContents,
        imageContentUrls,
        body,
        tag,
        address,
        sub_district,
        district,
        province,
        postCode,
        updateAt,
        companyId: company.companyId,
      });
      return res.status(200).json({ updated, status: "ok" }).end();
    } catch (err) {
      console.error(err);
      return res
        .status(500)
        .json(`Can't update port with error code : ${err}`)
        .end();
    }
  }

  async deletePortById(
    req: JwtAuthRequest<WithPortId, WithPort>,
    res: Response
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

    try {
      const deleted = this.repoPort.deletePortById({
        portId: portId,
        companyId: company.companyId,
      });
      return res.status(200).json({ deleted, status: "ok" }).end();
    } catch (err) {
      console.error(err);
      return res
        .status(500)
        .json(`Can't delete This port with error code : ${err}`)
        .end();
    }
  }
}
