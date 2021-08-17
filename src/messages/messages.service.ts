import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Chat, ChatDocument } from 'src/chats/entities/chat.entity';
import { CreateMessageDto } from './dto/create-messages.dto';
import { Message, MessageDocument } from './entities/messages.entity';

@Injectable()
export class MessagesService {
  constructor(
    @InjectModel(Message.name) private messageModel: Model<MessageDocument>,
    @InjectModel(Chat.name) private chatModel: Model<ChatDocument>,
  ) {}

  async create(createMessageDto: CreateMessageDto) {
    const message = await this.messageModel.create(createMessageDto);
    console.log(message._id);
    await this.chatModel.findByIdAndUpdate(message.chatId, {
      lastMessage: message._id,
    });
    return message;
  }

  async findAll() {
    const messages = await this.messageModel.find();
    return messages;
  }

  async findOne(id: string) {
    const user = await this.messageModel.findById(id);
    return user;
  }

  async remove(id: string) {
    await this.messageModel.findByIdAndDelete(id);
  }
}
