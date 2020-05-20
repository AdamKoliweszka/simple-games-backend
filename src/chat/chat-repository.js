import { ChatModel } from "./chat-schema";

export class ChatRepository {
  addChatMessage(message) {
    ChatModel.create(message, (error) => {
      if (error) console.log(error);
    });
  }
}
