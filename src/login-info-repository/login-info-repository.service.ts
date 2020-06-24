import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { LoginInfo } from "./schema/login-info.schema";
import { LoginInfo as ILoginInfo } from "./interfaces/login-info.interface";
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

  async addRefreshToken(loginInfo: ILoginInfo) {
    return this.loginInfoModel.create(loginInfo, (error) => {
      if (error) console.log(error);
    });
  }
}
