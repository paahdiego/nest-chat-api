import { Get, Post, Body, Param, Delete } from '@nestjs/common';

import { CustomSimpleGet } from 'src/common/decorators/customSimpleGet.decorator';
import { CustomSimplePost } from 'src/common/decorators/customSimplePost.decorator';

import { CustomSimpleDelete } from 'src/common/decorators/customSimpleDelete.decorator';
import { AuthController } from 'src/common/decorators/authController.decorator';
import { CreateMessageDto } from './dto/create-messages.dto';
import { MessagesService } from './messages.service';

@AuthController('messages', 'Messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @CustomSimplePost({
    model: 'message',
    bodyType: CreateMessageDto,
    createType: CreateMessageDto,
  })
  @Post()
  create(@Body() createMessageDto: CreateMessageDto) {
    return this.messagesService.create(createMessageDto);
  }

  @CustomSimpleGet({
    model: 'message',
    type: [CreateMessageDto],
  })
  @Get()
  findAll() {
    return this.messagesService.findAll();
  }

  @CustomSimpleDelete({ model: 'message' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.messagesService.remove(id);
  }
}
