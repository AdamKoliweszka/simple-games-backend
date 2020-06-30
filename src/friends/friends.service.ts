import { Injectable } from "@nestjs/common";
import { FriendsRepositoryService } from "src/friends-repository/friends-repository.service";
import { Friendship } from "src/friends-repository/interface/friendship.interface";

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
    }
  }

  removeRelationOfFriendship() {}

  acceptRelationOfFriendship() {}

  getAllFriends(username: string) {}
}
