import { Injectable } from "@nestjs/common";
import { FriendsRepositoryService } from "src/friends-repository/friends-repository.service";
import { Friendship } from "src/friends-repository/interface/friendship.interface";
import { User } from "src/users/interfaces/user.interface";
import { StatusOfFriendship } from "./enum/status-friendship.enum";

@Injectable()
export class FriendsService {
  constructor(private friendsRepositoryService: FriendsRepositoryService) {}

  async addRelationOfFriendship(firstUsername: string, secondUsername: string) {
    if (firstUsername === secondUsername) throw ["FRIENDSHIP_WITH_YOURSELF"];
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
    if (!friendship) throw ["INVITE_NOT_EXIST"];
    if (friendship.usernameOfSecondUser !== usernameOfAcceptingUser)
      throw ["USER_CANT_ACCEPT"];
    if (friendship.status === StatusOfFriendship.ACCEPTED)
      throw ["INVITE_ACCEPTED"];
    if (friendship.status === StatusOfFriendship.NOT_ACCEPTED)
      throw ["INVITE_NOT_ACCEPTED_BEFORE"];
    if (friendship.status === StatusOfFriendship.REMOVED)
      throw ["FRIENDSHIP_REMOVED"];
    return this.friendsRepositoryService.setStatusOfFriendship(
      StatusOfFriendship.ACCEPTED,
      usernameOfFriend,
      usernameOfAcceptingUser
    );
  }

  async removeRelationOfFriendship(
    usernameOfAcceptingUser: string,
    usernameOfFriend: string
  ) {
    let friendship = await this.friendsRepositoryService.getFriendship(
      usernameOfFriend,
      usernameOfAcceptingUser
    );
    if (!friendship) throw ["FRIENDSHIP_NOT_EXIST"];
    if (friendship.status === StatusOfFriendship.AFTER_INVITE)
      throw ["FRIENDSHIP_NOT_EXIST"];
    if (friendship.status === StatusOfFriendship.NOT_ACCEPTED)
      throw ["FRIENDSHIP_NOT_ACCEPTED_BEFORE"];
    if (friendship.status === StatusOfFriendship.REMOVED)
      throw ["FRIENDSHIP_REMOVED"];
    return this.friendsRepositoryService.setStatusOfFriendship(
      StatusOfFriendship.REMOVED,
      usernameOfFriend,
      usernameOfAcceptingUser
    );
  }

  async discardInviteToFriendship(
    usernameOfAcceptingUser: string,
    usernameOfFriend: string
  ) {
    let friendship = await this.friendsRepositoryService.getFriendship(
      usernameOfFriend,
      usernameOfAcceptingUser
    );
    if (!friendship) throw ["FRIENDSHIP_NOT_EXIST"];
    if (friendship.status === StatusOfFriendship.ACCEPTED)
      throw ["INVITE_ACCEPTED"];
    if (friendship.status === StatusOfFriendship.NOT_ACCEPTED)
      throw ["FRIENDSHIP_NOT_ACCEPTED_BEFORE"];
    if (friendship.status === StatusOfFriendship.REMOVED)
      throw ["FRIENDSHIP_REMOVED"];
    return this.friendsRepositoryService.setStatusOfFriendship(
      StatusOfFriendship.NOT_ACCEPTED,
      usernameOfFriend,
      usernameOfAcceptingUser
    );
  }

  getAllFriends(username: string) {
    return this.friendsRepositoryService.getAllFriendships(username);
  }
}
