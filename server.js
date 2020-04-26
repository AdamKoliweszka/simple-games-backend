import dotenv from "dotenv";
dotenv.config();
import db from "./src/mongodb/database";
import games from "./src/games/games";
import login from "./src/users/auth/login-controller";
import registration from "./src/users/registration-controller";
import logoutController from "./src/users/auth/logout-controller";
import token from "./src/users/tokens/token-controller";
// const bcrypt = require("bcrypt");
