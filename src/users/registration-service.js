import bcrypt from "bcrypt";
import { UserRepository } from "./user-repository";

export class RegistrationService {
  constructor() {
    this.userRepository = new UserRepository();
  }
  async createUserWithEncryptPassword(user) {
    console.log(user);
    const salt = await bcrypt.genSalt();
    const cryptedPassword = await bcrypt.hash(user.password, salt);
    user.password = cryptedPassword;
    return user;
  }
  async saveUser(user) {
    let isExist = await this.userRepository.isUserExist(user.username);
    if (!isExist) {
      let userWithEncryptedPassword = await this.createUserWithEncryptPassword(
        user
      );

      await this.userRepository.addUser(userWithEncryptedPassword);

      return userWithEncryptedPassword;
    } else return null;
  }
}
