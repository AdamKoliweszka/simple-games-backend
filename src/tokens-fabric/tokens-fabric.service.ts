import { Injectable } from "@nestjs/common";
import { sign } from "jsonwebtoken";

@Injectable()
export class TokensFabricService {
  async getRefreshToken(user) {
    return await sign(user, process.env.REFRESH_TOKEN_SECRET);
  }

  async getAccessToken(user) {
    let copyOfUser = Object.assign({}, user);
    if (copyOfUser.iat) delete copyOfUser.iat;
    return await sign(copyOfUser, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "15m",
    });
  }
}
