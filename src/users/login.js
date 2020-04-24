import { app } from "../app";
import { sign } from "jsonwebtoken";
import { check, validationResult } from "express-validator";
import bcrypt from "bcrypt";

app.post("/login", [check("username").exists()], async (req, resp) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return resp.status(422).json({ errors: errors.array() });
  }
  try {
    const username = req.body.username;
    const password = req.body.password;
    const cryptedPassword = "";
    if (!(await bcrypt.compare(password, cryptedPassword))) {
      resp.status(500).send();
    }
    const user = { name: username };
    const accessToken = sign(user, process.env.ACCESS_TOKEN_SECRET);
    resp.json({ accessToken: accessToken });
  } catch (e) {
    resp.status(500).send();
  }
});
