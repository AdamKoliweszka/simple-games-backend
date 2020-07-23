import { Controller, Post, Body, Res } from "@nestjs/common";
import { LoginDataDto } from "./dto/login-data.dto";
import { LoginService } from "./login.service";
import { Response } from "express";

@Controller("login")
export class LoginController {
  constructor(private loginService: LoginService) {}
  @Post()
  async create(@Res() resp: Response, @Body() loginDataDto: LoginDataDto) {
    let result = await this.loginService.getTokens(loginDataDto);
    if (result) {
      result.username = loginDataDto.username;
      resp.status(201).json(result);
    } else resp.status(401).send();
  }
}
