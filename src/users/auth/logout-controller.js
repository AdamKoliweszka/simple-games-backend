import { app } from "../../app";
import { check, validationResult } from "express-validator";
import { logoutFunction } from "./logout-service";

app.post("/logout", [check("refreshToken").exists()], async (req, resp) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return resp.status(422).json({ errors: errors.array() });
  }
  try {
    const refreshToken = req.body.refreshToken;
    const result = await logoutFunction(refreshToken);
    resp.json({ result: true });
  } catch (e) {
    resp.status(500).send();
  }
});
