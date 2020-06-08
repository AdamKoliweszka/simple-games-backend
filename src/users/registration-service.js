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
    let isUsernameExist = await this.userRepository.isUserExist(user.username);
    let isEmailExist = await this.userRepository.isEmailExist(user.email);
    if (!isUsernameExist && !isEmailExist) {
      let userWithEncryptedPassword = await this.createUserWithEncryptPassword(
        user
      );

      await this.userRepository.addUser(userWithEncryptedPassword);

      return userWithEncryptedPassword;
    } else {
      let errors = [];
      if (isEmailExist) errors.push("EMAIL_EXIST");
      if (isUsernameExist) errors.push("USERNAME_EXIST");
      throw errors;
    }
  }
}
