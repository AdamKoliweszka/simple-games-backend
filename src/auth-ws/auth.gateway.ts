import {
  ConnectedSocket,
  SubscribeMessage,
  WebSocketGateway,
  MessageBody,
} from "@nestjs/websockets";
import { Socket } from "socket.io";
import { AuthRequest } from "./interface/auth-request.interface";
import { verify } from "jsonwebtoken";

@WebSocketGateway(3001)
export class AuthGateway {
  @SubscribeMessage("authentication")
  handleMessage(
    @MessageBody() data: AuthRequest,
    @ConnectedSocket() client: Socket
  ) {
    setTimeout(() => {
      this.verifyToken(client, data.accessToken), 1000;
    });
  }

  verifyToken(socket: Socket, accessToken: string) {
    verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (!err) {
        // socket.user = user.username;

        socket.join("users");
      }
    });
  }
}
