import { Module } from "@nestjs/common";
import { TokensController } from "./tokens.controller";
import { TokensService } from "./tokens.service";
import { LoginInfo, LoginInfoSchema } from "./schema/login-info.schema";
import { MongooseModule } from "@nestjs/mongoose";

@Module({
  controllers: [TokensController],
  providers: [TokensService],
  imports: [
    MongooseModule.forFeature([
      { name: LoginInfo.name, schema: LoginInfoSchema },
    ]),
  ],
})
export class TokensModule {}
