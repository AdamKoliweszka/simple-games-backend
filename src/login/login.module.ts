import { Module } from "@nestjs/common";
import { LoginController } from "./login.controller";
import { LoginService } from "./login.service";
import { UserRepositoryModule } from "src/user-repository/user-repository.module";
import { TokensFabricModule } from "src/tokens-fabric/tokens-fabric.module";
import { LoginInfoRepositoryModule } from "src/login-info-repository/login-info-repository.module";
import { PermissionsRepositoryModule } from "../permissions-repository/permissions-repository.module";

@Module({
  controllers: [LoginController],
  providers: [LoginService],
  imports: [
    UserRepositoryModule,
    TokensFabricModule,
    LoginInfoRepositoryModule,
    PermissionsRepositoryModule,
  ],
})
export class LoginModule {}
