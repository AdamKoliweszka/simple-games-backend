import { Controller, Post, Body } from "@nestjs/common";
import { LoginDataDto } from "./dto/login-data.dto";
import { LoginService } from "./login.service";

@Controller("login")
export class LoginController {
  constructor(private loginService: LoginService) {}
  @Post()
  create(@Body() loginDataDto: LoginDataDto) {}
}
