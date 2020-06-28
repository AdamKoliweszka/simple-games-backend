import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class Friendship extends Document {
  @Prop()
  usernameOfStartingRelationshipUser: string;
  @Prop()
  usernameOfSecondUser: string;
  @Prop()
  status: number;
  @Prop()
  dateOfStartRelationship: Date;
}

export const FriendshipSchema = SchemaFactory.createForClass(Friendship);
