import { Injectable } from "@nestjs/common";
import { User } from "../user-repository/schema/user.schema";
import { CreateUserDto } from "./dto/create-user.dto";
import * as bcrypt from "bcrypt";
import { UserRepositoryService } from "src/user-repository/user-repository.service";

@Injectable()
export class UsersService {
  constructor(private userRepository: UserRepositoryService) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    let isUsernameExist = await this.userRepository.isUserExist(
      createUserDto.username
    );
    let isEmailExist = await this.userRepository.isEmailExist(
      createUserDto.email
    );
    if (!isUsernameExist && !isEmailExist) {
      createUserDto = await this.encryptUserPassword(createUserDto);
      const user = {
        ...createUserDto,
        dateOfRegistration: new Date(),
      } as User;
      return this.userRepository.create(user);
    } else {
      let errors = [];
      if (isEmailExist) errors.push("EMAIL_EXIST");
      if (isUsernameExist) errors.push("USERNAME_EXIST");
      throw errors;
    }
  }

  async encryptUserPassword(user: CreateUserDto): Promise<CreateUserDto> {
    const salt = await bcrypt.genSalt();
    const cryptedPassword = await bcrypt.hash(user.password, salt);
    user.password = cryptedPassword;
    return user;
  }

  getAllUsers() {
    return this.userRepository.getAll();
  }
}
