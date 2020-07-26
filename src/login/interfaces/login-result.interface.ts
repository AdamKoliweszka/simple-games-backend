import { Permission } from "../../permissions-repository/schema/permission.schema";

export interface LoginResult {
  accessToken: string;
  refreshToken: string;
  username: string;
  permissions: Permission[];
}
