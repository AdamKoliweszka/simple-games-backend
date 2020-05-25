import { ChatModel } from "./chat-schema";

export class ChatRepository {
  async addChatMessage(message) {
    return await ChatModel.create(message);
  }

  async getOldMessages(numberOfMessages) {
    return await ChatModel.find().sort({ date: 1 }).limit(numberOfMessages);
  }
}
