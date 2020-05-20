import { Schema, model } from "mongoose";
let ChatSchema = Schema({
  username: String,
  message: String,
  date: Date,
});

export const ChatModel = model("Chat", ChatSchema, "chat");
