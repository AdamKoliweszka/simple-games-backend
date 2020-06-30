import { Controller, Post, Req, Get } from "@nestjs/common";
import { FriendsService } from "./friends.service";
import { CreateFriendRelationDto } from "./dto/create-friend-relation.dto";

@Controller("friends")
export class FriendsController {
  constructor(private friendsService: FriendsService) {}
  @Post()
  create(@Req() req, createFriendRelationDto: CreateFriendRelationDto) {
    let usernameOfUser = req.user.username;
    let usernameOfFriend = createFriendRelationDto.friendUsername;
    return this.friendsService.addRelationOfFriendship(
      usernameOfUser,
      usernameOfFriend
    );
  }

  @Get()
  getAll(@Req() req) {
    let usernameOfUser = req.user.username;
    this.friendsService.getAllFriends(usernameOfUser);
  }
}
