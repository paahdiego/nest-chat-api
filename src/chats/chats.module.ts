import { Module } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';
import { Message, MessageSchema } from 'src/messages/entities/messages.entity';
import { ChatsController } from './chats.controller';

import { ChatsService } from './chats.service';
import { Chat, ChatSchema } from './entities/chat.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Chat.name, schema: ChatSchema }]),
    MongooseModule.forFeature([{ name: Message.name, schema: MessageSchema }]),
  ],
  controllers: [ChatsController],
  providers: [ChatsService],
})
export class ChatsModule {}
