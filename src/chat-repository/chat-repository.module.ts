import { Module } from "@nestjs/common";
import { ChatRepositoryService } from "./chat-repository.service";
import { ChatMessage, ChatMessageSchema } from "./schema/chat-message.schema";
import { MongooseModule } from "@nestjs/mongoose";

@Module({
  providers: [ChatRepositoryService],
  imports: [
    MongooseModule.forFeature([
      { name: ChatMessage.name, schema: ChatMessageSchema },
    ]),
  ],
  exports: [ChatRepositoryService],
})
export class ChatRepositoryModule {}
