import { app } from "../app";
import { ChatService } from "./chat-service";
import { authenticationTokenMiddleware } from "../users/auth/authentication-token-middleware";

app.post(
  "/chat",
  [check("message").exists()],
  authenticationTokenMiddleware,
  async (req, resp) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return resp.status(422).json({ errors: errors.array() });
    }
    try {
      const chatService = ChatService();
      const username = req.user.name;
      const date = new Date();
      const message = req.body.message;
      const chatMessage = { username, message, date };
      const chatMessage = await chatService.addChatMessage(chatMessage);
      if (chatMessage) resp.json(chatMessage);
      else resp.status(401).send();
    } catch (e) {
      resp.status(500).send();
    }
  }
);
