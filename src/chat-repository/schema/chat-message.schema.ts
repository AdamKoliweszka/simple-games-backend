import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class ChatMessage extends Document {
  @Prop()
  username: string;
  @Prop()
  message: string;
  @Prop()
  date: Date;
}

export const ChatMessageSchema = SchemaFactory.createForClass(ChatMessage);
