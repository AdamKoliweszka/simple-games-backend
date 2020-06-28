import { IsNotEmpty, IsString } from "class-validator";

export class CreateFriendRelationDto {
  @IsNotEmpty()
  @IsString()
  friendUsername: string;
}
