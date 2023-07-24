import { Request, Response } from "express";
import { IHandlerCompany, WithCompany, WithCompanyId } from ".";
import { JwtAuthRequest } from "../auth";
import { IRepositoryCompany } from "../repositories";
import { getObjectSignedUrl, uploadFile } from "../services/aws";
import sharp from "sharp";
import crypto from "crypto";

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
    res: Response
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
      // postCode,
      contact,
      // tag,
    } = req.body;

    if (
      !companyName ||
      !companyRegistration ||
      !address ||
      !sub_district ||
      !district ||
      !province ||
      // !postCode ||
      !contact
      // !tag
    ) {
      return res.status(400).json({ error: "missing json body" }).end();
    }

    const generateFileName = (bytes = 32) =>
      crypto.randomBytes(bytes).toString("hex");

    const file = req.file;
    // const file2 = req.file("image");

    const imageCompany = generateFileName();
    // const imageContent = generateFileName();

    const fileBuffer1 = await sharp(file?.buffer)
      .resize({ height: 1920, width: 1080, fit: "contain" })
      .toBuffer();

    // const fileBuffer2 = await sharp(file2?.buffer)
    //   .resize({ height: 1920, width: 1080, fit: "contain" })
    //   .toBuffer();

    await uploadFile(fileBuffer1, imageCompany, file?.mimetype);
    // await uploadFile(fileBuffer2, imageCompany, file2?.mimetype);

    const imageCompanyUrl = await getObjectSignedUrl(imageCompany);
    // const imageContentUrl = await getObjectSignedUrl(imageContent);

    try {
      const company = await this.repo.createCompany({
        companyName,
        companyRegistration,
        imageCompany,
        imageCompanyUrl,
        // imageContent,
        // imageContentUrl,
        address,
        sub_district,
        district,
        province,
        // postCode,
        contact,
        // tag,
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
    res: Response
  ): Promise<Response> {
    const companyId = Number(req.params.companyId);

    if (isNaN(companyId)) {
      return res
        .status(400)
        .json({ error: `id ${req.params.companyId} is not a number` });
    }

    try {
      const company = await this.repo.getCompanyById(companyId);
      if (!company) {
        return res.status(404).json({ err: "No such company" }).end();
      }
      return res.status(200).json({ company, status: "ok" }).end();
    } catch (err) {
      console.error(err);
      return res
        .status(500)
        .json(`Can't get Company with error : ${err}`)
        .end();
    }
  }

  async updateCompanyInfo(
    req: JwtAuthRequest<WithCompanyId, WithCompany>,
    res: Response
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

    try {
      const updated = this.repo.updateCompanyInfo({
        address,
        sub_district,
        district,
        province,
        postCode,
        contact,
        tag,
        companyId: companyId,
        userId,
      });
      return res.status(201).json({ updated, status: "ok" }).end();
    } catch (err) {
      console.error(err);
      return res
        .status(500)
        .json(`Can't update Company with error : ${err}`)
        .end();
    }
  }
}
