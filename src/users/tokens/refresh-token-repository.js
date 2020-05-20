import { RefreshTokenModel } from "./refresh-token-schema";

export class RefreshTokenRepository {
  async chechIfRefreshTokenExist(refreshToken) {
    return RefreshTokenModel.exists({ refreshToken });
  }

  async removeRefreshToken(refreshToken) {
    return RefreshTokenModel.deleteMany({ refreshToken });
  }

  async addRefreshToken(refreshToken) {
    return RefreshTokenModel.create({ refreshToken }, (error) => {
      if (error) console.log(error);
    });
  }
}
