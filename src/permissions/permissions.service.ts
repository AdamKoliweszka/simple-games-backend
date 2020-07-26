import { Injectable } from "@nestjs/common";
import { PermissionsRepositoryService } from "src/permissions-repository/permissions-repository.service";
import { Permissions } from "src/permissions-repository/enum/permissions.enum";

@Injectable()
export class PermissionsService {
  constructor(
    private permissionsRepositoryService: PermissionsRepositoryService
  ) {}

  async getAllPermissions(username: string) {
    return this.permissionsRepositoryService.getAllPermissionByUsername(
      username
    );
  }

  async removePermissionByID(usernameOfRequestingUser: string, id: string) {
    let canRemovePermission = await this.checkIfCanRemovePermission(
      usernameOfRequestingUser
    );
    if (!canRemovePermission) throw ["NO_PERMISSION_TO_REMOVE_PERMISSION"];
    return this.permissionsRepositoryService.removePermissionByID(id);
  }

  async addPermissionToUser(
    usernameOfRequestingUser: string,
    username: string,
    permission: Permissions
  ) {
    let canAddPermission = await this.checkIfCanAddPermission(
      usernameOfRequestingUser
    );
    if (!canAddPermission) throw ["NO_PERMISSION_TO_ADD_PERMISSION"];

    let isValid = false;
    for (let p in Permissions) {
      if (p === permission) isValid = true;
    }
    if (!isValid) throw ["PERMISSION_DOESNT_EXIST"];
    return this.permissionsRepositoryService.addPermissionToUser(
      username,
      permission
    );
  }

  async checkIfCanAddPermission(username: string): Promise<boolean> {
    if (username !== process.env.ADMIN_USERNAME) {
      let permissionsOfRequestingUser = await this.permissionsRepositoryService.getAllPermissionByUsername(
        username
      );
      if (
        !permissionsOfRequestingUser.find(
          (permission) => permission.permission === Permissions.ADD_PERMISSION
        )
      ) {
        return false;
      }
      return true;
    }
    return true;
  }

  async checkIfCanRemovePermission(username: string): Promise<boolean> {
    if (username !== process.env.ADMIN_USERNAME) {
      let permissionsOfRequestingUser = await this.permissionsRepositoryService.getAllPermissionByUsername(
        username
      );
      if (
        !permissionsOfRequestingUser.find(
          (permission) =>
            permission.permission === Permissions.REMOVE_PERMISSION
        )
      ) {
        return false;
      }
      return true;
    }
    return true;
  }
}
