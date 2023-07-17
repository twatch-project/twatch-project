import { Response } from "express";
import { IRepositoryCustomer } from "../repositories";
import { JwtAuthRequest } from "../auth";
import { Empty, IHandlerCustomer, WithCustomer } from ".";

export function newHandlerCustomer(
    repo: IRepositoryCustomer,
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
        res: Response,
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
            dateOfBirth[2],
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
        };
        try {
            const getCreateCustomer = await this.repo.createCustomer(
                customerInfo,
            );
            return res.status(200).json(getCreateCustomer).end();
        } catch (err) {
            console.error(err);
            return res
                .status(500)
                .json({ err: `Can't Create customer ${err}` });
        }
    }
}
