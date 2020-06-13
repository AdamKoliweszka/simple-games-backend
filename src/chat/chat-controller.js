import { app } from "../app";
import { ChatService } from "./chat-service";
import { authenticationTokenMiddleware } from "../users/auth/authentication-token-middleware";
import { check, validationResult } from "express-validator";

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
      const chatService = new ChatService();
      const username = req.user.username;
      const date = new Date();
      const message = req.body.message;
      let chatMessage = { username, message, date };
      chatMessage = await chatService.addChatMessage(chatMessage);
      if (chatMessage) resp.json(chatMessage);
      else resp.status(401).send();
    } catch (e) {
      resp.status(500).send();
    }
  }
);

app.post(
  "/chat/old-messages",
  [check("numberOfMessages").isNumeric()],
  authenticationTokenMiddleware,
  async (req, resp) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return resp.status(422).json({ errors: errors.array() });
    }
    try {
      const chatService = new ChatService();
      const numberOfMessages = req.body.numberOfMessages;
      let chatMessages = await chatService.getOldMessages(numberOfMessages);
      if (chatMessages) resp.json(chatMessages);
      else resp.status(401).send();
    } catch (e) {
      resp.status(500).send();
    }
  }
);
