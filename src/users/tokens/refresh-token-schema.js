import { Schema, model } from "mongoose";
let RefreshTokenSchema = Schema({
  refreshToken: String,
});

export const RefreshTokenModel = model(
  "RefreshToken",
  RefreshTokenSchema,
  "refresh_tokens"
);
