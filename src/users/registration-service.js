import bcrypt from "bcrypt";
import { UserRepository } from "./user-repository";

export class RegistrationService {
  constructor() {
    this.userRepository = new UserRepository();
  }
  async createUserWithEncryptPassword(user) {
    const salt = await bcrypt.genSalt();
    const cryptedPassword = await bcrypt.hash(user.password, salt);
    user.password = cryptedPassword;
    return user;
  }
  async saveUser(user) {
    let isExist = await this.userRepository.isUserExist(user.name);
    if (!isExist) {
      let userWithEncryptedPassword = await createUserWithEncryptPassword(user);
      this.userRepository.addUser(userWithEncryptedPassword);
      return userWithEncryptedPassword;
    } else return null;
  }
}
