import { Controller, Post, Body } from "@nestjs/common";
import { DeleteRefreshTokenDto } from "./dto/delete-refresh-token.dto";
import { LogoutService } from "./logout.service";

@Controller("logout")
export class LogoutController {
  constructor(private logoutService: LogoutService) {}
  @Post()
  async create(@Body() deleteRefreshTokenDto: DeleteRefreshTokenDto) {
    await this.logoutService.logout(deleteRefreshTokenDto);
  }
}
