import { Controller, Post, Body } from "@nestjs/common";
import { OldChatMessageGetDto } from "./dto/old-chat-message-get.dto";
import { ChatOldMessagesService } from "./chat-old-messages.service";

@Controller("chat/old-messages")
export class ChatOldMessagesController {
  constructor(private chatOldMessagesService: ChatOldMessagesService) {}
  @Post()
  getMessages(@Body() oldChatMessageGetDto: OldChatMessageGetDto) {
    return this.chatOldMessagesService.getOldMessages(oldChatMessageGetDto);
  }
}
