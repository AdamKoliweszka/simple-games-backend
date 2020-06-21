import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class User extends Document {
  @Prop()
  username: string;
  @Prop()
  password: string;
  @Prop()
  gender: number;
  @Prop()
  dateOfBirth: Date;
  @Prop()
  email: string;
  @Prop()
  dateOfRegistration: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
