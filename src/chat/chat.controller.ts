import { Controller, Post, Body, Req } from "@nestjs/common";
import { CreateChatMessageDto } from "./dto/create-chat-message.dto";
import { ChatService } from "./chat.service";

@Controller("chat")
export class ChatController {
  constructor(private chatService: ChatService) {}
  @Post()
  create(@Req() req, @Body() createChatMessageDto: CreateChatMessageDto) {
    this.chatService.addChatMessage(
      createChatMessageDto.message,
      req.user.username
    );
  }
}
