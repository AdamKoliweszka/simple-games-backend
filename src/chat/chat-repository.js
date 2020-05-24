import { ChatModel } from "./chat-schema";

export class ChatRepository {
  async addChatMessage(message) {
    return await ChatModel.create(message);
  }
}
