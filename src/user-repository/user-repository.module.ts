import { Module } from "@nestjs/common";
import { UserRepositoryService } from "./user-repository.service";
import { User, UserSchema } from "./schema/user.schema";
import { MongooseModule } from "@nestjs/mongoose";

@Module({
  providers: [UserRepositoryService],
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  exports: [UserRepositoryService],
})
export class UserRepositoryModule {}
