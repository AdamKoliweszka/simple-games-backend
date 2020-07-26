import { Injectable } from "@nestjs/common";
import { UserRepositoryService } from "src/user-repository/user-repository.service";
import * as bcrypt from "bcrypt";
import { TokensFabricService } from "src/tokens-fabric/tokens-fabric.service";
import { LoginInfoRepositoryService } from "src/login-info-repository/login-info-repository.service";
import { LoginDataDto } from "./dto/login-data.dto";
import { LoginResult } from "./interfaces/login-result.interface";
import { PermissionsRepositoryService } from "../permissions-repository/permissions-repository.service";

@Injectable()
export class LoginService {
  constructor(
    private userRepositoryService: UserRepositoryService,
    private tokensFabricService: TokensFabricService,
    private loginInfoRepository: LoginInfoRepositoryService,
    private permissionsRepository: PermissionsRepositoryService
  ) {}

  async login(loginDataDto: LoginDataDto): Promise<LoginResult> {
    let tokens = await this.getTokens(loginDataDto);
    if (tokens) {
      let permissions = await this.permissionsRepository.getAllPermissionByUsername(
        loginDataDto.username
      );
      let result: LoginResult = {
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
        username: loginDataDto.username,
        permissions: permissions,
      };
      return result;
    } else return null;
  }
  async getTokens(user: LoginDataDto) {
    const cryptedPassword = await this.userRepositoryService.getPasswordByUsername(
      user.username
    );
    if (!cryptedPassword) return null;
    if (!(await bcrypt.compare(user.password, cryptedPassword))) {
      return null;
    }
    const accessToken = await this.tokensFabricService.getAccessToken(user);
    const refreshToken = await this.tokensFabricService.getRefreshToken(user);
    await this.loginInfoRepository.addRefreshToken({
      refreshToken: refreshToken,
      dateOfLogin: new Date(),
    });
    return { accessToken, refreshToken };
  }
}
