import { app } from "../app";
import { check, validationResult } from "express-validator";
import { getToken } from "./login-service";

app.post("/login", [check("username").exists()], async (req, resp) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return resp.status(422).json({ errors: errors.array() });
  }
  try {
    const username = req.body.username;
    const password = req.body.password;
    const user = { name: username, password: password };
    const token = await getToken(user);
    if (token) resp.json({ accessToken: token });
    else resp.status(500).send();
  } catch (e) {
    resp.status(500).send();
  }
});
