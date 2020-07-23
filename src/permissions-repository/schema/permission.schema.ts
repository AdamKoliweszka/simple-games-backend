import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class Permission extends Document {
  @Prop()
  username: string;
  @Prop()
  permission: string;
}

export const PermissionSchema = SchemaFactory.createForClass(Permission);
