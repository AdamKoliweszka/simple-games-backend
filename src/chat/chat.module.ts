import { Module } from "@nestjs/common";
import { ChatController } from "./chat.controller";
import { ChatService } from "./chat.service";
import { ChatRepositoryModule } from "src/chat-repository/chat-repository.module";

@Module({
  controllers: [ChatController],
  providers: [ChatService],
  imports: [ChatRepositoryModule],
})
export class ChatModule {}
