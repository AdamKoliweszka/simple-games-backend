import { getPasswordByUsername } from "./user-repository";
import bcrypt from "bcrypt";
import { sign } from "jsonwebtoken";

export const getToken = async (user) => {
  const cryptedPassword = await getPasswordByUsername(user.name);
  if (!cryptedPassword) return null;
  if (!(await bcrypt.compare(user.password, cryptedPassword))) {
    return null;
  }
  const accessToken = await sign(user, process.env.ACCESS_TOKEN_SECRET);
  return accessToken;
};
