import { Controller, Post, Req, Get, Body, Res, Put } from "@nestjs/common";
import { FriendsService } from "./friends.service";
import { CreateFriendRelationDto } from "./dto/create-friend-relation.dto";
import { Response } from "express";
import { ChangeStatusOfFriendshipDto } from "./dto/change-status-of-friendship.dto";
import { StatusOfFriendship } from "./enum/status-friendship.enum";

@Controller("friends")
export class FriendsController {
  constructor(private friendsService: FriendsService) {}
  @Post()
  async create(
    @Res() resp: Response,
    @Req() req,
    @Body() createFriendRelationDto: CreateFriendRelationDto
  ) {
    let usernameOfUser = req.user.username;
    let usernameOfFriend = createFriendRelationDto.friendUsername;
    try {
      let result = await this.friendsService.addRelationOfFriendship(
        usernameOfUser,
        usernameOfFriend
      );
      resp.status(201).json(result);
      return result;
    } catch (e) {
      resp.status(422).json({ errors: e });
      return null;
    }
  }

  @Put()
  async edit(
    @Res() resp: Response,
    @Req() req,
    @Body() changeStatusOfFriendshipDto: ChangeStatusOfFriendshipDto
  ) {
    let usernameOfUser = req.user.username;
    let usernameOfFriend = changeStatusOfFriendshipDto.friendUsername;
    try {
      let result;
      if (changeStatusOfFriendshipDto.status === StatusOfFriendship.ACCEPTED) {
        result = await this.friendsService.acceptRelationOfFriendship(
          usernameOfUser,
          usernameOfFriend
        );
      } else if (
        changeStatusOfFriendshipDto.status === StatusOfFriendship.REMOVED
      ) {
        result = await this.friendsService.removeRelationOfFriendship(
          usernameOfUser,
          usernameOfFriend
        );
      } else if (
        changeStatusOfFriendshipDto.status === StatusOfFriendship.NOT_ACCEPTED
      ) {
        result = await this.friendsService.discardInviteToFriendship(
          usernameOfUser,
          usernameOfFriend
        );
      } else {
        resp.status(422).json({ errors: ["BAD_STATUS"] });
        return null;
      }
      resp.status(201).json(result);
      return result;
    } catch (e) {
      resp.status(422).json({ errors: e });
      return null;
    }
  }

  @Get()
  async getAll(@Req() req) {
    let usernameOfUser = req.user.username;
    let result = await this.friendsService.getAllFriends(usernameOfUser);
    return result;
  }
}
