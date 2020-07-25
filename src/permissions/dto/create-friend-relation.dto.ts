import { IsNotEmpty, IsString } from "class-validator";
import { Permissions } from "src/permissions-repository/enum/permissions.enum";

export class AddPermissionToUserDto {
  @IsNotEmpty()
  @IsString()
  permission: Permissions;

  @IsNotEmpty()
  @IsString()
  username: string;
}
