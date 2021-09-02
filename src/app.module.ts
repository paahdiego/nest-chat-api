import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { MessagesModule } from './messages/messages.module';
import { ChatsModule } from './chats/chats.module';

import { AlertGateway } from './alert/alert.gateway';
import { ChatGateway } from './chat/chat.gateway';
import { AlertController } from './alert/alert.controller';

@Module({
  imports: [
    UsersModule,
    MessagesModule,
    ChatsModule,
    MongooseModule.forRoot(
      'mongodb+srv://admin:59DovOe4KFOe77CB@cluster0.3vxr7.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
      {
        useFindAndModify: false,
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
      },
    ),
    AuthModule,
  ],
  controllers: [AppController, AlertController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    ChatGateway,
    AlertGateway,
  ],
})
export class AppModule {}
