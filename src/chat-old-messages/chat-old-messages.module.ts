import { Module } from "@nestjs/common";
import { ChatOldMessagesController } from "./chat-old-messages.controller";
import { ChatRepositoryModule } from "src/chat-repository/chat-repository.module";
import { ChatOldMessagesService } from './chat-old-messages.service';

@Module({
  controllers: [ChatOldMessagesController],
  imports: [ChatRepositoryModule],
  providers: [ChatOldMessagesService],
})
export class ChatOldMessagesModule {}
