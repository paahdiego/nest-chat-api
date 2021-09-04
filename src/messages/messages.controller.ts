import { Body, Param } from '@nestjs/common';

import { CustomSimpleGet } from 'src/common/decorators/customSimpleGet.decorator';
import { CustomSimplePost } from 'src/common/decorators/customSimplePost.decorator';

import { CustomSimpleDelete } from 'src/common/decorators/customSimpleDelete.decorator';
import { AuthController } from 'src/common/decorators/authController.decorator';
import { CreateMessageDto } from './dto/create-messages.dto';
import { MessagesService } from './messages.service';
import { Message } from './entities/messages.entity';

@AuthController('messages', 'Messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @CustomSimplePost({
    model: 'message',
    bodyType: CreateMessageDto,
    createType: Message,
  })
  create(@Body() createMessageDto: CreateMessageDto) {
    return this.messagesService.create(createMessageDto);
  }

  @CustomSimpleGet({
    model: 'message',
    type: [CreateMessageDto],
  })
  findAll() {
    return this.messagesService.findAll();
  }

  @CustomSimpleGet({
    model: 'message',
    type: [CreateMessageDto],
    params: ':id',
  })
  getMessagesFromChat(@Param('id') id: string) {
    return this.messagesService.findAllFromChat(id);
  }

  @CustomSimpleDelete({ model: 'message' })
  remove(@Param('id') id: string) {
    return this.messagesService.remove(id);
  }
}
