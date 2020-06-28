import { Controller, Post, Req } from "@nestjs/common";
import { FriendsService } from "./friends.service";
import { CreateFriendRelationDto } from "./dto/create-friend-relation.dto";

@Controller("friends")
export class FriendsController {
  constructor(private friendsService: FriendsService) {}
  @Post()
  create(@Req() req, createFriendRelationDto: CreateFriendRelationDto) {
    let usernameOfUser = req.user.username;
    let usernameOfFriend = createFriendRelationDto.friendUsername;
  }
}
