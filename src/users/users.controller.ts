import { Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CustomSimpleGetOne } from 'src/common/decorators/customSimpleGetOne.decorator';
import { CustomSimpleGet } from 'src/common/decorators/customSimpleGet.decorator';
import { CustomSimplePost } from 'src/common/decorators/customSimplePost.decorator';
import { CustomSimplePut } from 'src/common/decorators/customSimplePut.decorator';
import { CustomSimpleDelete } from 'src/common/decorators/customSimpleDelete.decorator';
import { AuthController } from 'src/common/decorators/authController.decorator';

@AuthController('users', 'Users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @CustomSimplePost({
    model: 'user',
    bodyType: CreateUserDto,
    createType: CreateUserDto,
  })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @CustomSimpleGet({
    model: 'users',
    type: [CreateUserDto],
  })
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @CustomSimpleGetOne({ model: 'user', type: CreateUserDto })
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  @CustomSimplePut({
    model: 'user',
    bodyType: UpdateUserDto,
    updateType: CreateUserDto,
  })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @CustomSimpleDelete({ model: 'user' })
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
