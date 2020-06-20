import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { GamesModule } from "./games/games.module";
import { UsersModule } from "./users/users.module";
import { MongooseModule } from "@nestjs/mongoose";
import { TokensModule } from './tokens/tokens.module';

@Module({
  imports: [
    GamesModule,
    UsersModule,
    MongooseModule.forRoot("mongodb://localhost/test"),
    TokensModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
