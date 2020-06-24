import { Injectable } from "@nestjs/common";
import { sign } from "jsonwebtoken";
import { LoginData } from "./interfaces/login-data.interface";

@Injectable()
export class TokensFabricService {
  async getRefreshToken(user: LoginData) {
    return await sign(user, process.env.REFRESH_TOKEN_SECRET);
  }

  async getAccessToken(user: LoginData) {
    let copyOfUser = { username: user.username, password: user.password };
    return await sign(copyOfUser, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "1m",
    });
  }
}
