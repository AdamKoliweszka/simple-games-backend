import { RefreshTokenModel } from "./refresh-token-schema";

export const chechIfRefreshTokenExist = async (refreshToken) => {
  return RefreshTokenModel.exists({ refreshToken });
};

export const removeRefreshToken = async (refreshToken) => {
  return RefreshTokenModel.deleteMany({ refreshToken });
};

export const addRefreshToken = async (refreshToken) => {
  return RefreshTokenModel.create({ refreshToken }, (error) => {
    console.log(error);
  });
};
