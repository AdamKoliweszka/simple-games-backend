import { authenticationTokenMiddleware } from "../users/auth/authentication-token-middleware";
import { app } from "../app";

const games = [
  {
    name: "War game",
    url: "war-game",
  },
];

app.get("/games", authenticationTokenMiddleware, (req, resp) => {
  resp.json(games);
});
