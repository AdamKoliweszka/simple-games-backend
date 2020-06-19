import { Controller, Post, Body } from "@nestjs/common";
import { User } from "./interfaces/user.interface";
import { CreateUserDto } from "./dto/create-user.dto";

@Controller("users")
export class UsersController {
  @Post()
  create(@Body() createUserDto: CreateUserDto): User {
    console.log("dobrze");
    return null;
  }
}
