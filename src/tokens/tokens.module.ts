import { Module } from "@nestjs/common";
import { TokensController } from "./tokens.controller";
import { TokensService } from "./tokens.service";
import { LoginInfoRepositoryModule } from "src/login-info-repository/login-info-repository.module";
import { TokensFabricModule } from "src/tokens-fabric/tokens-fabric.module";

@Module({
  controllers: [TokensController],
  providers: [TokensService],
  imports: [LoginInfoRepositoryModule, TokensFabricModule],
})
export class TokensModule {}
