import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GamesModule } from './games/games.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [GamesModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
