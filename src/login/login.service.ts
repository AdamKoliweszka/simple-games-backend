import { Injectable } from "@nestjs/common";
import { UserRepositoryService } from "src/user-repository/user-repository.service";
import bcrypt from "bcrypt";
import { TokensFabricService } from "src/tokens-fabric/tokens-fabric.service";

@Injectable()
export class LoginService {
  constructor(
    private userRepositoryService: UserRepositoryService,
    private tokensFabricService: TokensFabricService
  ) {}
  async getTokens(user) {
    const cryptedPassword = await this.userRepositoryService.getPasswordByUsername(
      user.username
    );
    if (!cryptedPassword) return null;
    if (!(await bcrypt.compare(user.password, cryptedPassword))) {
      return null;
    }
    const accessToken = await this.tokensFabricService.getAccessToken(user);
    const refreshToken = await this.tokensFabricService.getRefreshToken(user);
    await this.refreshTokenRepository.addRefreshToken(refreshToken);
    return { accessToken, refreshToken };
  }
}
