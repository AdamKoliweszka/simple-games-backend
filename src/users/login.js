import { app } from "../app";
import { sign } from "jsonwebtoken";
import { check, validationResult } from "express-validator";

app.post("/login", [check("username").exists()], (req, resp) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return resp.status(422).json({ errors: errors.array() });
  }
  const username = req.body.username;
  const user = { name: username };
  const accessToken = sign(user, process.env.ACCESS_TOKEN_SECRET);
  resp.json({ accessToken: accessToken });
});
