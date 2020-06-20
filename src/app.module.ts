import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { GamesModule } from "./games/games.module";
import { UsersModule } from "./users/users.module";
import { MongooseModule } from "@nestjs/mongoose";

@Module({
  imports: [
    GamesModule,
    UsersModule,
    MongooseModule.forRoot("mongodb://localhost/test"),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
