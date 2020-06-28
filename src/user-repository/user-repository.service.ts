import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "./schema/user.schema";
import { Model } from "mongoose";

@Injectable()
export class UserRepositoryService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async isUserExist(username: string): Promise<boolean> {
    return this.userModel.exists({ username: username });
  }

  async isEmailExist(email: string): Promise<boolean> {
    return this.userModel.exists({ email });
  }

  async getPasswordByUsername(username: string) {
    return await this.userModel
      .findOne({ username: username }, { password: 1, _id: 0 })
      .then((value) => {
        if (value) return value.password;
        else return null;
      });
  }

  async create(user: User) {
    const createdUser = new this.userModel(user);
    return createdUser.save();
  }

  async getAll() {
    return this.userModel.find({}, { email: 0, password: 0, _id: 0, __v: 0 });
  }
}
