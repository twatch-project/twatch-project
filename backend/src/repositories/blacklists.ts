import { RedisClientType } from "redis";
import { IRepositoryBlacklist } from ".";
import jwt from "jsonwebtoken";

export const keyBlacklist = "todo-jwt-blacklist"; // set
export const keyJwtExpire = "todo-jwt-expirations"; // hash

export function newRepositoryBlacklist(
  db: RedisClientType<any, any, any>,
): IRepositoryBlacklist {
  return new RepositoryBlacklist(db);
}

class RepositoryBlacklist implements IRepositoryBlacklist {
  private db: RedisClientType<any, any, any>;

  constructor(db: RedisClientType<any, any, any>) {
    this.db = db;
  }

  private async sAdd(token: string): Promise<void> {
    await this.db.sAdd(keyBlacklist, token);
  }

  async addToBlackList(token: string): Promise<void> {
    const decoded = jwt.decode(token);

    if (!decoded) {
      return this.sAdd(token);
    }

    if (typeof decoded === "string") {
      return this.sAdd(token);
    }

    const exp = decoded.exp;
    if (!exp) {
      return this.sAdd(token);
    }

    await this.sAdd(token);
    await this.db.hSet(keyJwtExpire, token, token);
  }

  async isBlacklisted(token: string): Promise<boolean> {
    return await this.db.sIsMember(keyBlacklist, token);
  }
}
