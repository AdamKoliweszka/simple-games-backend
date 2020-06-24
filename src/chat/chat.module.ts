import { Module } from "@nestjs/common";
import { ChatController } from "./chat.controller";
import { ChatService } from "./chat.service";
import { ChatRepositoryModule } from "src/chat-repository/chat-repository.module";
import { ChatGateway } from "./chat.gateway";

@Module({
  controllers: [ChatController],
  providers: [ChatService, ChatGateway],
  imports: [ChatRepositoryModule],
})
export class ChatModule {}
