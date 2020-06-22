import { Controller, Post, Body } from "@nestjs/common";
import { CreateChatMessageDto } from "./dto/create-chat-message.dto";
import { ChatService } from "./chat.service";

@Controller("chat")
export class ChatController {
  constructor(private chatService: ChatService) {}
  @Post()
  create(@Body() createChatMessageDto: CreateChatMessageDto) {
    this.chatService.addChatMessage(createChatMessageDto);
  }
}
