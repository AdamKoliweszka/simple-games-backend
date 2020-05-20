import { RefreshTokenRepository } from "../tokens/refresh-token-repository";

export class LogoutService {
  constructor() {
    this.refreshTokenRepository = new RefreshTokenRepository();
  }
  async removeRefreshToken(refreshToken) {
    return this.refreshTokenRepository.removeRefreshToken(refreshToken);
  }
}
