import { app } from "../app";
import { RegistrationService } from "./registration-service";
import { check, validationResult } from "express-validator";

app.post(
  "/users",
  [
    check("username").isAlphanumeric(),
    check("password").exists(),
    check("gender").isNumeric(),
    check("dateOfBirth").isISO8601(),
    check("email").isEmail(),
  ],
  async (req, resp) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return resp.status(422).json({ errors: errors.array() });
    }
    const registrationService = new RegistrationService();
    const username = req.body.username;
    const password = req.body.password;
    try {
      let user = { name: username, password: password };
      let userWithEncryptedPassword = await registrationService.saveUser(user);
      if (userWithEncryptedPassword) {
        resp.json(userWithEncryptedPassword);
      } else resp.status(500).send();
    } catch (e) {
      resp.status(500).send();
    }
  }
);
