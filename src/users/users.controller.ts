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

  @CustomSimplePost({
    model: 'user',
    bodyType: CreateUserDto,
    createType: CreateUserDto,
  })
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @CustomSimpleGet({
    model: 'users',
    type: [CreateUserDto],
  })
  @Get()
  findAll() {
    return this.usersService.findAll();
  }
  @CustomSimpleGetOne({ model: 'user', type: CreateUserDto })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @CustomSimplePut({
    model: 'user',
    bodyType: UpdateUserDto,
    updateType: CreateUserDto,
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @CustomSimpleDelete({ model: 'user' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
