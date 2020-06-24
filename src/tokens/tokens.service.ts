import { Injectable } from "@nestjs/common";
import { LoginInfo } from "../login-info-repository/schema/login-info.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateAccessTokenDto } from "./dto/create-access-token.dto";
import { verify } from "jsonwebtoken";
import { sign } from "jsonwebtoken";
import { LoginInfoRepositoryService } from "src/login-info-repository/login-info-repository.service";
import { TokensFabricService } from "src/tokens-fabric/tokens-fabric.service";

@Injectable()
export class TokensService {
  constructor(
    private loginInfoRepositoryService: LoginInfoRepositoryService,
    private tokensFabricService: TokensFabricService
  ) {}
  async generateAccessToken(createAccessTokenDto: CreateAccessTokenDto) {
    const isExist = await this.loginInfoRepositoryService.isRefreshTokenExist(
      createAccessTokenDto.refreshToken
    );
    if (isExist) {
      return verify(
        createAccessTokenDto.refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        async (err, user) => {
          if (err) return null;
          let result = await this.tokensFabricService.getAccessToken(user);
          return { accessToken: result };
        }
      );
    }
  }
}
