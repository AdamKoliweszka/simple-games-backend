import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "./schema/user.schema";
import { Model } from "mongoose";
import { CreateUserDto } from "./dto/create-user.dto";
import * as bcrypt from "bcrypt";

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    let isUsernameExist = await this.isUserExist(createUserDto.username);
    let isEmailExist = await this.isEmailExist(createUserDto.email);
    if (!isUsernameExist && !isEmailExist) {
      createUserDto = await this.encryptUserPassword(createUserDto);
      const createdUser = new this.userModel({
        ...createUserDto,
        dateOfRegistration: new Date(),
      });
      return createdUser.save();
    } else {
      let errors = [];
      if (isEmailExist) errors.push("EMAIL_EXIST");
      if (isUsernameExist) errors.push("USERNAME_EXIST");
      throw errors;
    }
  }

  async isUserExist(username: string): Promise<boolean> {
    return this.userModel.exists({ username: username });
  }

  async isEmailExist(email: string): Promise<boolean> {
    return this.userModel.exists({ email });
  }

  async encryptUserPassword(user: CreateUserDto): Promise<CreateUserDto> {
    const salt = await bcrypt.genSalt();
    const cryptedPassword = await bcrypt.hash(user.password, salt);
    user.password = cryptedPassword;
    return user;
  }
}
