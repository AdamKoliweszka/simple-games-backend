import { Injectable } from "@nestjs/common";
import { LoginInfoRepositoryService } from "src/login-info-repository/login-info-repository.service";
import { DeleteRefreshTokenDto } from "./dto/delete-refresh-token.dto";

@Injectable()
export class LogoutService {
  constructor(private loginInfoRepositoryService: LoginInfoRepositoryService) {}

  logout(deleteRefreshTokenDto: DeleteRefreshTokenDto) {
    this.loginInfoRepositoryService.removeRefreshToken(
      deleteRefreshTokenDto.refreshToken
    );
  }
}
