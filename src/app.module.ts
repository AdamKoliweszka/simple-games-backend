import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { GamesModule } from "./games/games.module";
import { UsersModule } from "./users/users.module";
import { MongooseModule } from "@nestjs/mongoose";
import { TokensModule } from "./tokens/tokens.module";
import { ConfigModule } from "@nestjs/config";
import { LoginModule } from "./login/login.module";
import { LogoutModule } from "./logout/logout.module";
import { ChatModule } from "./chat/chat.module";
import { ChatOldMessagesModule } from "./chat-old-messages/chat-old-messages.module";
import { ChatRepositoryModule } from "./chat-repository/chat-repository.module";
import { AuthMiddleware } from "./auth.middleware";
import { AuthGateway } from "./auth-ws/auth.gateway";
import { AuthWsModule } from "./auth-ws/auth-ws.module";
import { FriendsModule } from "./friends/friends.module";
import { FriendsRepositoryModule } from "./friends-repository/friends-repository.module";
import { PermissionsRepositoryModule } from './permissions-repository/permissions-repository.module';

@Module({
  imports: [
    GamesModule,
    UsersModule,
    MongooseModule.forRoot("mongodb://localhost/test"),
    TokensModule,
    ConfigModule.forRoot(),
    LoginModule,
    LogoutModule,
    ChatModule,
    ChatOldMessagesModule,
    ChatRepositoryModule,
    AuthWsModule,
    FriendsModule,
    FriendsRepositoryModule,
    PermissionsRepositoryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(
        { path: "chat", method: RequestMethod.POST },
        { path: "friends", method: RequestMethod.ALL }
      );
  }
}
