import { Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';

import { CustomSimpleGetOne } from 'src/common/decorators/customSimpleGetOne.decorator';
import { CustomSimpleGet } from 'src/common/decorators/customSimpleGet.decorator';
import { CustomSimplePost } from 'src/common/decorators/customSimplePost.decorator';
import { CustomSimplePut } from 'src/common/decorators/customSimplePut.decorator';
import { CustomSimpleDelete } from 'src/common/decorators/customSimpleDelete.decorator';
import { AuthController } from 'src/common/decorators/authController.decorator';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { ChatsService } from './chats.service';

@AuthController('chats', 'Chat')
export class ChatsController {
  constructor(private readonly chatsService: ChatsService) {}

  @Post()
  @CustomSimplePost({
    model: 'chat',
    bodyType: CreateChatDto,
    createType: CreateChatDto,
  })
  create(@Body() createChatDto: CreateChatDto) {
    return this.chatsService.create(createChatDto);
  }

  @Get()
  @CustomSimpleGet({
    model: 'chat',
    type: [CreateChatDto],
  })
  findAll() {
    return this.chatsService.findAll();
  }

  @Get(':id')
  @CustomSimpleGetOne({ model: 'chat', type: CreateChatDto })
  findOne(@Param('id') id: string) {
    return this.chatsService.findOne(id);
  }

  @Patch(':id')
  @CustomSimplePut({
    model: 'chat',
    bodyType: UpdateChatDto,
    updateType: CreateChatDto,
  })
  update(@Param('id') id: string, @Body() updateChatDto: UpdateChatDto) {
    return this.chatsService.update(id, updateChatDto);
  }

  @Delete(':id')
  @CustomSimpleDelete({ model: 'chat' })
  remove(@Param('id') id: string) {
    return this.chatsService.remove(id);
  }
}
