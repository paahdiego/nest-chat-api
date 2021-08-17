import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { Chat, ChatDocument } from './entities/chat.entity';

@Injectable()
export class ChatsService {
  constructor(@InjectModel(Chat.name) private chatModel: Model<ChatDocument>) {}

  async create(createChatDto: CreateChatDto) {
    const chat = await this.chatModel.create(createChatDto);
    return chat;
  }

  async findAll() {
    const chats = await this.chatModel.find();
    return chats;
  }

  async findOne(id: string) {
    const chat = await this.chatModel.findById(id);
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
