import { Controller, Get, Req } from "@nestjs/common";
import { Game } from "./interfaces/game.interface";

@Controller("games")
export class GamesController {
  @Get()
  findAll(): Game[] {
    let games = [
      {
        name: "War game",
        url: "war-game",
      },
    ];
    return games;
  }
}
