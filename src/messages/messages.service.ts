import { HttpException, Injectable } from '@nestjs/common';
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
    console.log(createMessageDto);
    if (!createMessageDto.chat) {
      console.log(createMessageDto);
    }

    const createdMessage = await this.messageModel.create(createMessageDto);

    const message = await this.messageModel
      .findById(createdMessage._id)
      .populate('receiver')
      .populate('sender');

    await this.chatModel.findByIdAndUpdate(message.chat, {
      lastMessage: message._id,
    });
    return message;
  }

  async findAll() {
    const messages = await this.messageModel
      .find()
      .populate(['sender', 'receiver']);

    return messages;
  }

  async findAllFromChat(id: string) {
    const chat = await this.chatModel.findOne({ _id: id });

    if (!chat) {
      throw new HttpException(`There's no messages for this chat ${id}`, 404);
    }

    const messages = await this.messageModel
      .find({ chat: id })
      .populate(['sender', 'receiver']);

    return messages;
  }

  async findOne(id: string) {
    const user = await this.messageModel
      .findById(id)
      .populate(['sender', 'receiver']);
    return user;
  }

  async remove(id: string) {
    await this.messageModel.findByIdAndDelete(id);
  }
}
