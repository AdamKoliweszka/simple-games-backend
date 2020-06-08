import { Schema, model } from "mongoose";
let UserSchema = Schema({
  username: String,
  password: String,
  email: String,
  gender: Number,
  dateOfBirth: Date,
});

export const UserModel = model("User", UserSchema, "users");
