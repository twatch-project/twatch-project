import { Request, Response } from "express";
import { IHandlerCompany, WithCompany, WithCompanyId } from ".";
import { JwtAuthRequest } from "../auth";
import { IRepositoryCompany } from "../repositories";
import {
  generateFileName,
  getObjectSignedUrl,
  uploadFile,
} from "../services/aws";
import sharp from "sharp";

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
      body,
      address,
      sub_district,
      district,
      province,
      contact,
      postCode,
      tag,
    } = req.body;

    if (
      !companyName ||
      !companyRegistration ||
      !body ||
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

    if (!req.files) {
      return res.status(400);
    }

    const fCompany = req.files["company"];
    const fContents = req.files["content"];

    const imageCompany = generateFileName();
    const imageContents: string[] = fContents.map(() => generateFileName());

    const fileBufferCompany = await sharp(fCompany[0]?.buffer)
      .resize({ height: 1920, width: 1080, fit: "contain" })
      .toBuffer();

    const fileBufferContents: Buffer[] = await Promise.all(
      fContents.map(async (fContent): Promise<Buffer> => {
        return await sharp(fContent.buffer)
          .resize({ height: 1920, width: 1080, fit: "contain" })
          .toBuffer();
      })
    );

    await uploadFile(fileBufferCompany, imageCompany, fCompany[0]?.mimetype);
    for (let i = 0; i < imageContents.length; i++) {
      await uploadFile(
        fileBufferContents[i],
        imageContents[i],
        fContents[i]?.mimetype
      );
    }

    const imageCompanyUrl = await getObjectSignedUrl(imageCompany);
    const imageContentUrls: string[] = await Promise.all(
      imageContents.map(async (imageContent): Promise<string> => {
        return await getObjectSignedUrl(imageContent);
      })
    );

    try {
      const company = await this.repo.createCompany({
        companyName,
        companyRegistration,
        imageCompany,
        imageCompanyUrl,
        imageContents,
        imageContentUrls,
        body,
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
      contact,
      tag,
      postCode,
    } = req.body;

    const userId = req.payload.id;

    let imageCompany;
    let imageCompanyUrl;
    let imageContents: string[] | undefined;
    let imageContentUrls: string[] | undefined;

    if (req.files) {
      const fCompany = req.files["company"];
      if (fCompany) {
        const imageCompany: string = generateFileName();

        const fileBufferCompany = await sharp(fCompany[0]?.buffer)
          .resize({ height: 1920, width: 1080, fit: "contain" })
          .toBuffer();

        await uploadFile(
          fileBufferCompany,
          imageCompany,
          fCompany[0]?.mimetype
        );

        imageCompanyUrl = await getObjectSignedUrl(imageCompany);
      }

      const fContents = req.files["content"];

      if (fContents) {
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
    }

    try {
      const updated = this.repo.updateCompanyInfo({
        imageCompany,
        imageCompanyUrl,
        imageContents,
        imageContentUrls,
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
