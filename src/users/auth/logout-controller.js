import { app } from "../../app";
import { check, validationResult } from "express-validator";
import { LogoutService } from "./logout-service";

app.post("/logout", [check("refreshToken").exists()], async (req, resp) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return resp.status(422).json({ errors: errors.array() });
  }
  try {
    const logoutService = new LogoutService();
    const refreshToken = req.body.refreshToken;
    const result = await logoutService.removeRefreshToken(refreshToken);
    resp.json({ result: true });
  } catch (e) {
    resp.status(500).send();
  }
});
