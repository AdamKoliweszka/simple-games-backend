import { Schema, model } from "mongoose";
let UserSchema = Schema({
  name: String,
  password: String,
});

export const UserModel = model("User", UserSchema, "users");
