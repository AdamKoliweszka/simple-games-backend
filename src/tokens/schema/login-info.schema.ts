import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class LoginInfo extends Document {
  @Prop()
  refreshToken: string;
}

export const LoginInfoSchema = SchemaFactory.createForClass(LoginInfo);
