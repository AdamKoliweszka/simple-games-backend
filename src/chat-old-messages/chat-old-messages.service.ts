import { Injectable } from "@nestjs/common";
import { OldChatMessageGetDto } from "./dto/old-chat-message-get.dto";
import { ChatRepositoryService } from "src/chat-repository/chat-repository.service";

@Injectable()
export class ChatOldMessagesService {
  constructor(private chatRepositoryService: ChatRepositoryService) {}
  getOldMessages(oldChatMessagesDto: OldChatMessageGetDto) {
    return this.chatRepositoryService.getOldMessages(
      oldChatMessagesDto.numberOfMessages
    );
  }
}
