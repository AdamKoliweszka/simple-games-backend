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

  addChatMessage(createChatMessageDto: CreateChatMessageDto) {
    let message = {
      ...createChatMessageDto,
      date: new Date(),
      username: "test",
    };
    this.chatGateway.emitChatMessage(message);
    return this.chatRepositoryService.addChatMessage(message);
  }
}
