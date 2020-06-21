import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { LoginInfo } from "./schema/login-info.schema";
import { Model } from "mongoose";

@Injectable()
export class LoginInfoRepositoryService {
  constructor(
    @InjectModel(LoginInfo.name) private loginInfoModel: Model<LoginInfo>
  ) {}

  async isRefreshTokenExist(refreshToken: string) {
    return this.loginInfoModel.exists({
      refreshToken: refreshToken,
    });
  }

  async removeRefreshToken(refreshToken: string) {
    return this.loginInfoModel.deleteMany({ refreshToken });
  }

  async addRefreshToken(refreshToken: string) {
    return this.loginInfoModel.create({ refreshToken }, (error) => {
      if (error) console.log(error);
    });
  }
}
