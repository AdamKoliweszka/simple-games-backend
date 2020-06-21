import { Injectable } from "@nestjs/common";
import { LoginInfo } from "./schema/login-info.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateAccessTokenDto } from "./dto/create-access-token.dto";
import { verify } from "jsonwebtoken";
import { sign } from "jsonwebtoken";

@Injectable()
export class TokensService {
  constructor(
    @InjectModel(LoginInfo.name) private loginInfoModel: Model<LoginInfo>
  ) {}
  async generateAccessToken(createAccessTokenDto: CreateAccessTokenDto) {
    const isExist = await this.isRefreshTokenExist(createAccessTokenDto);
    if (isExist) {
      return verify(
        createAccessTokenDto.refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        async (err, user) => {
          if (err) return null;
          let result = await this.getAccessToken(user);
          return result;
        }
      );
    }
  }
  async isRefreshTokenExist(createAccessTokenDto: CreateAccessTokenDto) {
    return this.loginInfoModel.exists({
      refreshToken: createAccessTokenDto.refreshToken,
    });
  }

  async getAccessToken(user) {
    let copyOfUser = Object.assign({}, user);
    if (copyOfUser.iat) delete copyOfUser.iat;
    return await sign(copyOfUser, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "15m",
    });
  }
}
