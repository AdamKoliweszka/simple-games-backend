import { ChatRepository } from "./chat-repository";
import { ChatWsController } from "./chat-ws-controller";

export class ChatService {
  constructor() {
    this.chatRepository = new ChatRepository();
    this.chatWsController = new ChatWsController();
  }
  async addChatMessage(chatMessage) {
    this.chatWsController.emitMessage(chatMessage);
    let result = await this.chatRepository.addChatMessage(chatMessage);
    return result;
  }
}
