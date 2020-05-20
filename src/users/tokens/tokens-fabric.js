import { sign } from "jsonwebtoken";

export const getRefreshToken = async (user) => {
  return await sign(user, process.env.REFRESH_TOKEN_SECRET);
};

export const getAccessToken = async (user) => {
  let copyOfUser = Object.assign({}, user);
  if (copyOfUser.iat) delete copyOfUser.iat;
  return await sign(copyOfUser, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "10s",
  });
};
