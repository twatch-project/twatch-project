import {
  Empty,
  IHandlerComment,
  WithCommentId,
  WithCommentPort,
  WithUpdateComment,
} from ".";
import { JwtAuthRequest } from "../auth";
import { IRepositoryCommentPort } from "../repositories";
import { Response } from "express";

export function newHandlerCommentPort(repoCommentPort: IRepositoryCommentPort) {
  return new HandlerCommentPort(repoCommentPort);
}

class HandlerCommentPort implements IHandlerComment {
  private repo: IRepositoryCommentPort;

  constructor(repo: IRepositoryCommentPort) {
    this.repo = repo;
  }

  async createCommentPort(
    req: JwtAuthRequest<WithCommentId, WithCommentPort>,
    res: Response,
  ): Promise<Response> {
    const commentId = Number(req.params.commentId);
    if (isNaN(commentId)) {
      return res
        .status(401)
        .json({ err: `Not Found comment ID is : ${commentId}` })
        .end();
    }
    const { massage, rating } = req.body;
    if (!massage) {
      return res.status(500).json({ err: `fill some massage` }).end();
    }
    if (rating > 5 && rating < 0) {
      return res.status(500).json({ err: `rating can store 0-5` }).end();
    }
    const user = req.payload;
    if (user.role !== "CUSTOMER") {
      return res
        .status(500)
        .json({ err: `${user.role} Can't create comment` })
        .end();
    }
    try {
      const isCreateComment = await this.repo.createComment({
        massage,
        rating,
        userId: user.id,
        portId: commentId,
      });
      return res.status(200).json(isCreateComment).end();
    } catch (err) {
      console.error(err);
      return res.status(500).json(`Can't Create comment ${err}`).end();
    }
  }

  async updateCommentPortfolio(
    req: JwtAuthRequest<WithCommentId, WithUpdateComment>,
    res: Response,
  ): Promise<Response> {
    const commentId = Number(req.params.commentId);
    if (isNaN(commentId)) {
      return res
        .status(500)
        .json({ err: `${commentId} is not a number` })
        .end();
    }
    const { massage, rating } = req.body;
    if (rating > 5 && rating < 0) {
      return res.status(500).json({ err: `rating can store 0-5` }).end();
    }
    const userId = req.payload.id;
    const ownerId = await this.repo.getCommentPortfolioById(commentId);
    if (ownerId === null) {
      return res.status(500).json({ err: "not found comment" }).end();
    }
    if (userId !== ownerId.userId) {
      return res
        .status(500)
        .json({ err: `userid ${userId} is not owner this comment` })
        .end();
    }
    try {
      const getUpdateComent = await this.repo.updateCommentPortfolio({
        commentId,
        massage,
        rating,
      });
      return res.status(200).json({ getUpdateComent, status: "ok" }).end();
    } catch (err) {
      console.error(err);
      return res
        .status(500)
        .json({ err: `Can't update this comment with error code : ${err}` })
        .end();
    }
  }

  async getCommentPortfolioById(
    req: JwtAuthRequest<WithCommentId, Empty>,
    res: Response,
  ): Promise<Response> {
    const commentId = Number(req.params.commentId);
    if (isNaN(commentId)) {
      return res
        .status(500)
        .json({ err: `${commentId} is not a number` })
        .end();
    }
    try {
      const getCommentId = await this.repo.getCommentPortfolioById(commentId);
      return res.status(200).json({ getCommentId, status: "ok" }).end();
    } catch (err) {
      console.error(err);
      return res
        .status(500)
        .json({
          err: `Can't get comment ${commentId} with error code : ${err}`,
        })
        .end();
    }
  }

  async getCommentPortfolios(_, res: Response): Promise<Response> {
    try {
      const getComments = await this.repo.getCommentPortfolio();
      return res.status(200).json({ getComments, status: "ok" }).end();
    } catch (err) {
      console.error(err);
      return res
        .status(500)
        .json({ err: `Cannt get Comments with error : ${err}` })
        .end();
    }
  }

  async deleteCommentPortfolio(
    req: JwtAuthRequest<WithCommentId, WithCommentPort>,
    res: Response,
  ): Promise<Response> {
    const commentId = Number(req.params.commentId);
    if (isNaN(commentId)) {
      return res
        .status(500)
        .json({ err: `${commentId} is not a number` })
        .end();
    }
    const userId = req.payload.id;
    if (!userId) {
      return res.status(500).json({ err: "user not found" }).end();
    }
    const getCommentOwner = await this.repo.getCommentPortByUserId(userId);
    if (!getCommentOwner) {
      return res
        .status(500)
        .json({ err: ` Cann't get ${getCommentOwner}` })
        .end();
    }
    try {
      const deleteCommentById = await this.repo.dateleCommentPortfolioById({
        commentId,
        userId,
      });
      return res.status(200).json({ deleteCommentById, status: "ok" }).end();
    } catch (err) {
      console.error(err);
      return res.status(500).json(`Fail to delete ${err}`).end();
    }
  }
}
