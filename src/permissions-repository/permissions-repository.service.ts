import { Injectable } from "@nestjs/common";
import { Permission } from "./schema/permission.schema";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";

@Injectable()
export class PermissionsRepositoryService {
  constructor(
    @InjectModel(Permission.name) private permissionModel: Model<Permission>
  ) {}

  async getAllPermissionByUsername(username: string) {
    return this.permissionModel.find({ username });
  }

  async addPermissionToUser(username: string, permission: string) {
    return this.permissionModel.create({ username, permission });
  }

  async removePermissionFromUser(username: string, permission: string) {
    return this.permissionModel.deleteOne({ username, permission });
  }
}
