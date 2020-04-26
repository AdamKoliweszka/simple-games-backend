import { chechIfRefreshTokenExist } from "./refresh-token-repository";
import { verify } from "jsonwebtoken";
import { getAccessToken } from "./tokens-fabric";

export const generateAccessToken = async (refreshToken) => {
  const isTokenExist = await chechIfRefreshTokenExist(refreshToken);
  if (isTokenExist) {
    return verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      async (err, user) => {
        if (err) return null;
        return await getAccessToken(user);
      }
    );
  } else return null;
};
