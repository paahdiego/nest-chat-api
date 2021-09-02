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

  @Post()
  @CustomSimplePost({
    model: 'message',
    bodyType: CreateMessageDto,
    createType: CreateMessageDto,
  })
  create(@Body() createMessageDto: CreateMessageDto) {
    return this.messagesService.create(createMessageDto);
  }

  @Get()
  @CustomSimpleGet({
    model: 'message',
    type: [CreateMessageDto],
  })
  findAll() {
    return this.messagesService.findAll();
  }

  @Delete(':id')
  @CustomSimpleDelete({ model: 'message' })
  remove(@Param('id') id: string) {
    return this.messagesService.remove(id);
  }
}
