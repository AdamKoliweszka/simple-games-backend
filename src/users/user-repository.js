import { UserModel } from "./user-schema";

export class UserRepository {
  async isUserExist(username) {
    return UserModel.exists({ name: username });
  }

  async getPasswordByUsername(username) {
    return await UserModel.findOne(
      { name: username },
      { password: 1, _id: 0 }
    ).then((value) => {
      if (value) return value.password;
      else return null;
    });
  }

  async addUser(user) {
    UserModel.create(user, (error) => {
      if (error) console.log(error);
    });
  }
}
