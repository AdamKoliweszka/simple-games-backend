import { app } from "../../app";
import { check, validationResult } from "express-validator";
import { LoginService } from "./login-service";

app.post(
  "/login",
  [check("username").exists(), check("password").exists()],
  async (req, resp) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return resp.status(422).json({ errors: errors.array() });
    }
    try {
      const loginService = new LoginService();
      const username = req.body.username;
      const password = req.body.password;
      const user = { username: username, password: password };
      const tokens = await loginService.getTokens(user);
      if (tokens) resp.json(tokens);
      else resp.status(401).send();
    } catch (e) {
      resp.status(500).send();
    }
  }
);
