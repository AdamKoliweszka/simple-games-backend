import { IsNotEmpty, IsString, IsNumber } from "class-validator";

export class ChangeStatusOfFriendshipDto {
  @IsNotEmpty()
  @IsString()
  friendUsername: string;

  @IsNotEmpty()
  @IsNumber()
  status: number;
}
