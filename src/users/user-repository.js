import { UserModel } from "./user-schema";

export class UserRepository {
  async isUserExist(username) {
    return UserModel.exists({ username: username });
  }

  async isEmailExist(email) {
    return UserModel.exists({ email });
  }

  async getPasswordByUsername(username) {
    return await UserModel.findOne(
      { username: username },
      { password: 1, _id: 0 }
    ).then((value) => {
      if (value) return value.password;
      else return null;
    });
  }

  async addUser(user) {
    console.log("a", user);
    return UserModel.create(user, (error) => {
      if (error) console.log(error);
    });
  }
}
