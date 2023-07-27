import { Response } from "express";
import { IRepositoryCustomer } from "../repositories";
import { JwtAuthRequest } from "../auth";
import {
  Empty,
  IHandlerCustomer,
  WithCustomer,
  WithIdCustomer,
  WithUpdateCustomer,
} from ".";

export function newHandlerCustomer(
  repo: IRepositoryCustomer
): IHandlerCustomer {
  return new HandlerCustomer(repo);
}
class HandlerCustomer implements IHandlerCustomer {
  private repo: IRepositoryCustomer;
  constructor(repo: IRepositoryCustomer) {
    this.repo = repo;
  }

  async createCustomer(
    req: JwtAuthRequest<Empty, WithCustomer>,
    res: Response
  ): Promise<Response> {
    const {
      firstname,
      lastname,
      gender,
      dateOfBirth,
      citizenId,
      province,
      district,
      sub_district,
      address,
      contact,
      postCode,
    } = req.body;

    if (
      !firstname ||
      !lastname ||
      !citizenId ||
      !province ||
      !district ||
      !sub_district
    ) {
      res.status(500).json({ err: `Must have fill` }).end();
    }
    const covertDateOfBirth: Date = new Date(
      dateOfBirth[0],
      dateOfBirth[1],
      dateOfBirth[2]
    ); // (year , mouth 0-11 , day 0-30)
    const userId = req.payload.id;
    const customerInfo = {
      firstname,
      lastname,
      gender,
      dateOfBirth: covertDateOfBirth,
      citizenId,
      province,
      district,
      sub_district,
      address,
      contact,
      userId,
      postCode,
    };
    try {
      const getCreateCustomer = await this.repo.createCustomer(customerInfo);
      return res.status(200).json(getCreateCustomer).end();
    } catch (err) {
      console.error(err);
      return res.status(500).json({ err: `Can't Create customer ${err}` });
    }
  }

  async getCustomerId(
    req: JwtAuthRequest<WithIdCustomer, Empty>,
    res: Response
  ): Promise<Response> {
    const id = Number(req.params.id);
    if (!id) {
      return res
        .status(500)
        .json({ err: `Not found customer ID ${id}` })
        .end();
    }
    if (isNaN(id)) {
      return res
        .status(500)
        .json({ err: `ID ${id} is not a number !!!` })
        .end();
    }
    try {
      const getCustomerId = await this.repo.getCustomerById(id);
      return res.status(200).json(getCustomerId).end();
    } catch (err) {
      console.error(err);
      return res
        .status(500)
        .json({ err: ` Can get Customer By id Err : ${err}` })
        .end();
    }
  }

  async getCustomers(_, res: Response): Promise<Response> {
    try {
      const getAllCustomer = await this.repo.getDetailCustomers();
      return res.status(200).json(getAllCustomer).end();
    } catch (err) {
      console.error(err);
      return res
        .status(500)
        .json({ msg: `Can't get all Customer err : ${err}` })
        .end();
    }
  }

  async updateCustomer(
    req: JwtAuthRequest<WithIdCustomer, WithUpdateCustomer>,
    res: Response
  ): Promise<Response> {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res
        .status(500)
        .json({ err: `Not Found Customer id is ${id}` })
        .end();
    }
    const {
      firstname,
      lastname,
      gender,
      province,
      district,
      sub_district,
      address,
      contact,
      postCode,
    } = req.body;
    try {
      const isUpdate = await this.repo.updateCustomerById({
        firstname,
        lastname,
        gender,
        province,
        district,
        sub_district,
        address,
        contact,
        postCode,
        id: id,
        userId: req.payload.id,
      });
      return res.status(200).json(isUpdate).end();
    } catch (err) {
      console.error(err);
      return res
        .status(500)
        .json({ err: `Can't Update ${err}` })
        .end();
    }
  }
}
