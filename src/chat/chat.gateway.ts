import { WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server } from "socket.io";

@WebSocketGateway(3001)
export class ChatGateway {
  @WebSocketServer()
  server: Server;

  emitChatMessage(message) {
    this.server.to("users").emit("chat/message", message);
  }
}
