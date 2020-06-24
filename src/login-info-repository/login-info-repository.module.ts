import { Module } from "@nestjs/common";
import { LoginInfoRepositoryService } from "./login-info-repository.service";
import { MongooseModule } from "@nestjs/mongoose";
import { LoginInfo, LoginInfoSchema } from "./schema/login-info.schema";

@Module({
  providers: [LoginInfoRepositoryService],
  imports: [
    MongooseModule.forFeature([
      { name: LoginInfo.name, schema: LoginInfoSchema },
    ]),
  ],
  exports: [LoginInfoRepositoryService],
})
export class LoginInfoRepositoryModule {}
