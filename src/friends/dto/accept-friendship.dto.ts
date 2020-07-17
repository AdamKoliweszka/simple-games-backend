import { IsNotEmpty, IsString } from "class-validator";

export class AcceptFriendshipDto {
  @IsNotEmpty()
  @IsString()
  friendUsername: string;
}
