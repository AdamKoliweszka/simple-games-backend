import { Injectable } from "@nestjs/common";
import { ChatMessage } from "./schema/chat-message.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ChatMessage as ChatMessageI } from "./interface/chat-message.interface";

@Injectable()
export class ChatRepositoryService {
  constructor(
    @InjectModel(ChatMessage.name) private chatModel: Model<ChatMessage>
  ) {}

  async addChatMessage(message: ChatMessageI) {
    return await this.chatModel.create(message);
  }

  async getOldMessages(numberOfMessages: number) {
    return await this.chatModel
      .find()
      .sort({ date: 1 })
      .limit(numberOfMessages);
  }
}
