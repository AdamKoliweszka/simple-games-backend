import { Controller, Post, Req, Get, Body } from "@nestjs/common";
import { FriendsService } from "./friends.service";
import { CreateFriendRelationDto } from "./dto/create-friend-relation.dto";

@Controller("friends")
export class FriendsController {
  constructor(private friendsService: FriendsService) {}
  @Post()
  create(@Req() req, @Body() createFriendRelationDto: CreateFriendRelationDto) {
    let usernameOfUser = req.user.username;
    let usernameOfFriend = createFriendRelationDto.friendUsername;
    return this.friendsService.addRelationOfFriendship(
      usernameOfUser,
      usernameOfFriend
    );
  }

  @Get()
  async getAll(@Req() req) {
    let usernameOfUser = req.user.username;
    let result = await this.friendsService.getAllFriends(usernameOfUser);
    console.log(result);
    return result;
  }
}
