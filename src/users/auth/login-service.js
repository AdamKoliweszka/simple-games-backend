import { getPasswordByUsername } from "../user-repository";
import { getAccessToken, getRefreshToken } from "../tokens/tokens-fabric";
import bcrypt from "bcrypt";
import { addRefreshToken } from "../tokens/refresh-token-repository";

export const getTokens = async (user) => {
  const cryptedPassword = await getPasswordByUsername(user.name);
  if (!cryptedPassword) return null;
  if (!(await bcrypt.compare(user.password, cryptedPassword))) {
    return null;
  }
  const accessToken = await getAccessToken(user);
  const refreshToken = await getRefreshToken(user);
  await addRefreshToken(refreshToken);
  return { accessToken, refreshToken };
};
