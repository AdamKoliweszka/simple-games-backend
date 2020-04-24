import { app } from "../app";
import {
  createUserWithEncryptPassword,
  saveUser,
} from "./registration-service";
import { check, validationResult } from "express-validator";

app.post(
  "/users",
  [check("username").exists(), check("password").exists()],
  async (req, resp) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return resp.status(422).json({ errors: errors.array() });
    }
    const username = req.body.username;
    const password = req.body.password;
    try {
      let user = { name: username, password: password };
      let userWithEncryptedPassword = await saveUser(user);
      if (userWithEncryptedPassword) {
        resp.json(userWithEncryptedPassword);
      } else resp.status(500).send();
    } catch (e) {
      resp.status(500).send();
    }
  }
);
