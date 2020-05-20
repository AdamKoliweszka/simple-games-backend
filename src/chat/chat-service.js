import { ChatRepository } from "./chat-repository";

export class ChatService {
  constructor() {
    this.chatRepository = new ChatRepository();
  }
  addChatMessage(chatMessage) {
    return this.chatRepositor(chatMessage);
  }
}
