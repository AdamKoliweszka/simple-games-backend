import { Module } from "@nestjs/common";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { UserRepositoryModule } from "src/user-repository/user-repository.module";

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [UserRepositoryModule],
})
export class UsersModule {}
