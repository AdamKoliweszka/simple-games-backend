import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { Permissions } from "../enum/permissions.enum";

@Schema()
export class Permission extends Document {
  @Prop()
  username: string;
  @Prop()
  permission: Permissions;
}

export const PermissionSchema = SchemaFactory.createForClass(Permission);
