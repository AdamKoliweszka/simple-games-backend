import { IsNotEmpty, IsString } from "class-validator";

export class CreateAccessTokenDto {
  @IsNotEmpty()
  @IsString()
  refreshToken: string;
}
