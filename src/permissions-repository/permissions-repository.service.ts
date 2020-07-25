import { Injectable } from "@nestjs/common";
import { Permission } from "./schema/permission.schema";
import { Model, Mongoose } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { Permissions } from "./enum/permissions.enum";
import { Types } from "mongoose";

@Injectable()
export class PermissionsRepositoryService {
  constructor(
    @InjectModel(Permission.name) private permissionModel: Model<Permission>
  ) {}

  async getAllPermissionByUsername(username: string) {
    return this.permissionModel.find({ username });
  }

  async addPermissionToUser(username: string, permission: Permissions) {
    return this.permissionModel.create({ username, permission });
  }

  async removePermissionByID(id: string) {
    return this.permissionModel.deleteOne({
      _id: Types.ObjectId(id),
    });
  }
}
