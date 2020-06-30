import { Module } from "@nestjs/common";
import { FriendsRepositoryService } from "./friends-repository.service";
import { Friendship, FriendshipSchema } from "./schema/friendship.schema";
import { MongooseModule } from "@nestjs/mongoose";

@Module({
  providers: [FriendsRepositoryService],
  imports: [
    MongooseModule.forFeature([
      { name: Friendship.name, schema: FriendshipSchema },
    ]),
  ],
  exports: [FriendsRepositoryService],
})
export class FriendsRepositoryModule {}
