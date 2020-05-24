import { io } from "../io";

export class ChatWsController {
  emitMessage(message) {
    io.emit("chat/message", message);
  }
}
