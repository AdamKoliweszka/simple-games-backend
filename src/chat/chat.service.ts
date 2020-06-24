import { Injectable } from "@nestjs/common";
import { ChatRepositoryService } from "src/chat-repository/chat-repository.service";
import { CreateChatMessageDto } from "./dto/create-chat-message.dto";
import { ChatGateway } from "./chat.gateway";

@Injectable()
export class ChatService {
  constructor(
    private chatRepositoryService: ChatRepositoryService,
    private chatGateway: ChatGateway
  ) {}

  addChatMessage(message: string, username: string) {
    let chatMessage = {
      message: message,
      date: new Date(),
      username: username,
    };
    this.chatGateway.emitChatMessage(chatMessage);
    return this.chatRepositoryService.addChatMessage(chatMessage);
  }
}
