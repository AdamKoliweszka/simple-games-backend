import { UserRepository } from "../user-repository";
import { TokensFabric } from "../tokens/tokens-fabric";
import bcrypt from "bcrypt";
import { RefreshTokenRepository } from "../tokens/refresh-token-repository";

export class LoginService {
  constructor() {
    this.refreshTokenRepository = new RefreshTokenRepository();
    this.userRepository = new UserRepository();
    this.tokensFabric = new TokensFabric();
  }

  async getTokens(user) {
    const cryptedPassword = await this.userRepository.getPasswordByUsername(
      user.username
    );
    if (!cryptedPassword) return null;
    if (!(await bcrypt.compare(user.password, cryptedPassword))) {
      return null;
    }
    const accessToken = await this.tokensFabric.getAccessToken(user);
    const refreshToken = await this.tokensFabric.getRefreshToken(user);
    await this.refreshTokenRepository.addRefreshToken(refreshToken);
    return { accessToken, refreshToken };
  }
}
