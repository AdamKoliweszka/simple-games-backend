import { getPasswordByUsername } from "../user-repository";
import { getAccessToken, getRefreshToken } from "../tokens/tokens-fabric";
import bcrypt from "bcrypt";
import { addRefreshToken } from "../tokens/refresh-token-repository";

export const getTokens = async (user) => {
  const cryptedPassword = await getPasswordByUsername(user.name);
  console.log("1");
  if (!cryptedPassword) return null;
  console.log("2");
  if (!(await bcrypt.compare(user.password, cryptedPassword))) {
    console.log("3");
    return null;
  }
  console.log("4");
  const accessToken = await getAccessToken(user);
  console.log("5");
  const refreshToken = await getRefreshToken(user);
  console.log("6");
  await addRefreshToken(refreshToken);
  console.log("7");
  return { accessToken, refreshToken };
};
