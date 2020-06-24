import { Module } from "@nestjs/common";
import { LogoutController } from "./logout.controller";
import { LogoutService } from "./logout.service";
import { LoginInfoRepositoryModule } from "src/login-info-repository/login-info-repository.module";

@Module({
  controllers: [LogoutController],
  providers: [LogoutService],
  imports: [LoginInfoRepositoryModule],
})
export class LogoutModule {}
