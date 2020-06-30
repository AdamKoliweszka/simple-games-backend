import { Module } from "@nestjs/common";
import { FriendsController } from "./friends.controller";
import { FriendsService } from "./friends.service";
import { FriendsRepositoryModule } from "src/friends-repository/friends-repository.module";

@Module({
  controllers: [FriendsController],
  providers: [FriendsService],
  imports: [FriendsRepositoryModule],
})
export class FriendsModule {}
