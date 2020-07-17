import { Injectable } from "@nestjs/common";
import { Friendship as IFriendship } from "./interface/friendship.interface";
import { InjectModel } from "@nestjs/mongoose";
import { Friendship } from "./schema/friendship.schema";
import { Model } from "mongoose";
import { StatusOfFriendship } from "src/friends/enum/status-friendship.enum";

@Injectable()
export class FriendsRepositoryService {
  constructor(
    @InjectModel(Friendship.name) private friendshipModel: Model<Friendship>
  ) {}

  async createFriendship(friendship: IFriendship) {
    const createdFriendship = new this.friendshipModel(friendship);
    return createdFriendship.save();
  }

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

  async getFriendship(
    usernameOfFirstUser: string,
    usernameOfSecondUser: string
  ) {
    return this.friendshipModel.findOne(
      {
        usernameOfStartingRelationshipUser: {
          $in: [usernameOfFirstUser, usernameOfSecondUser],
        },
        usernameOfSecondUser: {
          $in: [usernameOfFirstUser, usernameOfSecondUser],
        },
      },
      {}
    );
  }

  async getAllFriendships(username: string) {
    return this.friendshipModel.find(
      {
        $or: [
          { usernameOfStartingRelationshipUser: username },
          { usernameOfSecondUser: username },
        ],
      },
      { _id: 0, __v: 0 }
    );
  }

  setStatusOfFriendship(
    status: StatusOfFriendship,
    usernameOfStartingRelationshipUser: string,
    usernameOfSecondUser: string
  ) {
    return this.friendshipModel.findOneAndUpdate(
      {
        usernameOfStartingRelationshipUser: usernameOfStartingRelationshipUser,
        usernameOfSecondUser: usernameOfSecondUser,
      },
      { status: status }
    );
  }
}
