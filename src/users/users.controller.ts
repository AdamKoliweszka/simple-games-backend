import { Controller, Post, Body, Res } from "@nestjs/common";
import { User } from "./interfaces/user.interface";
import { CreateUserDto } from "./dto/create-user.dto";
import { UsersService } from "./users.service";
import { Response } from "express";

@Controller("users")
export class UsersController {
  constructor(private usersService: UsersService) {}
  @Post()
  async create(
    @Res() resp: Response,
    @Body() createUserDto: CreateUserDto
  ): Promise<Partial<User>> {
    try {
      let result = await this.usersService.create(createUserDto);
      result.password = undefined;
      resp.status(201).json(result);
      return result;
    } catch (e) {
      resp.status(422).json({ errors: e });
      return null;
    }
  }
}
