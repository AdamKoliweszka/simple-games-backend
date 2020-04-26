import { app } from "../../app";
import { check, validationResult } from "express-validator";
import { getTokens } from "./login-service";

app.post(
  "/login",
  [check("username").exists(), check("password").exists()],
  async (req, resp) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return resp.status(422).json({ errors: errors.array() });
    }
    try {
      const username = req.body.username;
      const password = req.body.password;
      const user = { name: username, password: password };
      const tokens = await getTokens(user);
      console.log(tokens);
      if (tokens) resp.json(tokens);
      else resp.status(500).send();
    } catch (e) {
      resp.status(500).send();
    }
  }
);
