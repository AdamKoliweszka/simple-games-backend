import { IsNotEmpty, IsString } from "class-validator";

export class CreateChatMessageDto {
  @IsNotEmpty()
  @IsString()
  message: string;
}
