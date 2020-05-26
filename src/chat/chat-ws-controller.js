import { io } from "../io";

export class ChatWsController {
  emitMessage(message) {
    io.to("users").emit("chat/message", message);
  }
}
