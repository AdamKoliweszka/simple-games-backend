import { RefreshTokenRepository } from "./refresh-token-repository";
import { verify } from "jsonwebtoken";
import { TokensFabric } from "./tokens-fabric";

export class TokenService {
  constructor() {
    this.refreshTokenRepository = new RefreshTokenRepository();
    this.tokensFabric = new TokensFabric();
  }
  async generateAccessToken(refreshToken) {
    const isTokenExist = await this.refreshTokenRepository.chechIfRefreshTokenExist(
      refreshToken
    );
    if (isTokenExist) {
      return verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        async (err, user) => {
          if (err) return null;
          let result = await this.tokensFabric.getAccessToken(user);
          return result;
        }
      );
    } else return null;
  }
}
