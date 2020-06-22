import { Injectable } from "@nestjs/common";
import { ChatRepositoryService } from "src/chat-repository/chat-repository.service";
import { CreateChatMessageDto } from "./dto/create-chat-message.dto";

@Injectable()
export class ChatService {
  constructor(private chatRepositoryService: ChatRepositoryService) {}

  addChatMessage(createChatMessageDto: CreateChatMessageDto) {
    let message = {
      ...createChatMessageDto,
      date: new Date(),
      username: "test",
    };
    return this.chatRepositoryService.addChatMessage(message);
  }
}
