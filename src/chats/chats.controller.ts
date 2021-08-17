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

  @CustomSimplePost({
    model: 'chat',
    bodyType: CreateChatDto,
    createType: CreateChatDto,
  })
  @Post()
  create(@Body() createChatDto: CreateChatDto) {
    return this.chatsService.create(createChatDto);
  }

  @CustomSimpleGet({
    model: 'chat',
    type: [CreateChatDto],
  })
  @Get()
  findAll() {
    return this.chatsService.findAll();
  }
  @CustomSimpleGetOne({ model: 'chat', type: CreateChatDto })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.chatsService.findOne(id);
  }

  @CustomSimplePut({
    model: 'chat',
    bodyType: UpdateChatDto,
    updateType: CreateChatDto,
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateChatDto: UpdateChatDto) {
    return this.chatsService.update(id, updateChatDto);
  }

  @CustomSimpleDelete({ model: 'chat' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.chatsService.remove(id);
  }
}
