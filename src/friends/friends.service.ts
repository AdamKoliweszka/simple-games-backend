import { Injectable } from "@nestjs/common";
import { FriendsRepositoryService } from "src/friends-repository/friends-repository.service";
import { Friendship } from "src/friends-repository/interface/friendship.interface";
import { User } from "src/users/interfaces/user.interface";
import { StatusOfFriendship } from "./enum/status-friendship.enum";

@Injectable()
export class FriendsService {
  constructor(private friendsRepositoryService: FriendsRepositoryService) {}

  async addRelationOfFriendship(firstUsername: string, secondUsername: string) {
    let isExist = await this.friendsRepositoryService.checkIfFriendshipExist(
      firstUsername,
      secondUsername
    );
    if (!isExist) {
      let friendship = {
        usernameOfStartingRelationshipUser: firstUsername,
        usernameOfSecondUser: secondUsername,
        dateOfStartRelationship: new Date(),
        status: 0,
      } as Friendship;
      return this.friendsRepositoryService.createFriendship(friendship);
    } else throw ["FRIENDSHIP_EXIST"];
  }

  async acceptRelationOfFriendship(
    usernameOfAcceptingUser: string,
    usernameOfFriend: string
  ) {
    let friendship = await this.friendsRepositoryService.getFriendship(
      usernameOfFriend,
      usernameOfAcceptingUser
    );
    if (!friendship) throw ["FRIENDSHIP_NOT_EXIST"];
    if (friendship.usernameOfSecondUser !== usernameOfAcceptingUser)
      throw ["USER_CANT_ACCEPT"];
    if (friendship.status === StatusOfFriendship.ACCEPTED)
      throw ["FRIENDSHIP_ACCEPTED"];
    if (friendship.status === StatusOfFriendship.REMOVED)
      throw ["FRIENDSHIP_REMOVED"];
    return this.friendsRepositoryService.setStatusOfFriendship(
      StatusOfFriendship.ACCEPTED,
      usernameOfFriend,
      usernameOfAcceptingUser
    );
  }

  getAllFriends(username: string) {
    return this.friendsRepositoryService.getAllFriendships(username);
  }
}
