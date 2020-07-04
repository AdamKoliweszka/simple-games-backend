import { Injectable } from "@nestjs/common";
import { Friendship as IFriendship } from "./interface/friendship.interface";
import { InjectModel } from "@nestjs/mongoose";
import { Friendship } from "./schema/friendship.schema";
import { Model } from "mongoose";

@Injectable()
export class FriendsRepositoryService {
  constructor(
    @InjectModel(Friendship.name) private friendshipModel: Model<Friendship>
  ) {}

  async createFriendship(friendship: IFriendship) {
    const createdFriendship = new this.friendshipModel(friendship);
    return createdFriendship.save();
  }

  changeStatusOfFriendship(friendship: IFriendship) {}

  async checkIfFriendshipExist(
    usernameOfFirstUser: string,
    usernameOfSecondUser: string
  ) {
    return this.friendshipModel.exists({
      usernameOfStartingRelationshipUser: {
        $in: [usernameOfFirstUser, usernameOfSecondUser],
      },
      usernameOfSecondUser: {
        $in: [usernameOfFirstUser, usernameOfSecondUser],
      },
    });
  }

  async getFriends(username: string) {
    console.log(username);
    // return this.friendshipModel.find({}, {});
    return this.friendshipModel.find(
      {
        $or: [
          { usernameOfStartingRelationshipUser: username },
          { usernameOfSecondUser: username },
        ],
      },
      {}
    );
  }
}
