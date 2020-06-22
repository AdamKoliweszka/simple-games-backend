import { IsNotEmpty, IsNumber } from "class-validator";

export class OldChatMessageGetDto {
  @IsNotEmpty()
  @IsNumber()
  numberOfMessages: number;
}
