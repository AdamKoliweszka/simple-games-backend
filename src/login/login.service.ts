import { Injectable } from "@nestjs/common";
import { UserRepositoryService } from "src/user-repository/user-repository.service";
import * as bcrypt from "bcrypt";
import { TokensFabricService } from "src/tokens-fabric/tokens-fabric.service";
import { LoginInfoRepositoryService } from "src/login-info-repository/login-info-repository.service";
import { LoginDataDto } from "./dto/login-data.dto";

@Injectable()
export class LoginService {
  constructor(
    private userRepositoryService: UserRepositoryService,
    private tokensFabricService: TokensFabricService,
    private loginInfoRepository: LoginInfoRepositoryService
  ) {}
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
    await this.loginInfoRepository.addRefreshToken(refreshToken);
    return { accessToken, refreshToken };
  }
}
