import { IsNotEmpty, IsString } from "class-validator";

export class DeleteRefreshTokenDto {
  @IsNotEmpty()
  @IsString()
  refreshToken: string;
}
