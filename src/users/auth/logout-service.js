import { removeRefreshToken } from "../tokens/refresh-token-repository";

export const logoutFunction = async (refreshToken) => {
  return removeRefreshToken(refreshToken);
};
