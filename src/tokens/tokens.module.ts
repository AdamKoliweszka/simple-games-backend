import { Module } from "@nestjs/common";
import { TokensController } from "./tokens.controller";
import { TokensService } from "./tokens.service";
import { LoginInfoRepositoryModule } from "src/login-info-repository/login-info-repository.module";

@Module({
  controllers: [TokensController],
  providers: [TokensService],
  imports: [LoginInfoRepositoryModule],
})
export class TokensModule {}
