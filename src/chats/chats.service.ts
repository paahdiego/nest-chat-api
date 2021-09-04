import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  Message,
  MessageDocument,
} from 'src/messages/entities/messages.entity';

import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { Chat, ChatDocument } from './entities/chat.entity';

@Injectable()
export class ChatsService {
  constructor(
    @InjectModel(Chat.name) private chatModel: Model<ChatDocument>,
    @InjectModel(Message.name) private messageModel: Model<MessageDocument>,
  ) {}

  async create(createChatDto: CreateChatDto) {
    const chat = await this.chatModel.create(createChatDto);
    return chat;
  }

  async findAll() {
    const chats = await this.chatModel.find().populate([
      'members',
      {
        path: 'lastMessage',
        model: 'Message',
        populate: [
          {
            path: 'sender',
            model: 'User',
          },
          {
            path: 'receiver',
            model: 'User',
          },
        ],
      },
    ]);

    return chats;
  }

  async findOne(id: string) {
    const chat = await this.chatModel.findById(id).populate([
      'members',

      {
        path: 'lastMessage',
        model: 'Message',
        populate: [
          {
            path: 'sender',
            model: 'User',
          },

          {
            path: 'receiver',
            model: 'User',
          },
        ],
      },
    ]);

    const lastMessage = await this.messageModel
      .findById(chat.lastMessage)
      .populate(['receiver', 'sender']);

    console.log(lastMessage);

    chat.lastMessage = lastMessage.toJSON().toString();

    return chat;
  }

  async update(id: string, updateChatDto: UpdateChatDto) {
    const chat = await this.chatModel.findByIdAndUpdate(id, updateChatDto, {
      new: true,
    });
    return chat;
  }

  async remove(id: string) {
    await this.chatModel.findByIdAndDelete(id);
  }
}
