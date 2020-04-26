import { app } from "../../app";
import { check, validationResult } from "express-validator";
import { generateAccessToken } from "./token-service";

app.post("/tokens", [check("refreshToken").exists()], async (req, resp) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return resp.status(422).json({ errors: errors.array() });
  }
  try {
    const refreshToken = req.body.refreshToken;
    const result = await generateAccessToken(refreshToken);
    resp.json({ accessToken: result });
  } catch (e) {
    resp.status(500).send();
  }
});
