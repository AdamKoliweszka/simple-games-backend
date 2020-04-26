import { sign } from "jsonwebtoken";

export const getRefreshToken = async (user) => {
  return await sign(user, process.env.REFRESH_TOKEN_SECRET);
};

export const getAccessToken = async (user) => {
  return await sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "10m",
  });
};
