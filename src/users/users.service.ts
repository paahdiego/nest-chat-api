import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto) {
    const user = await this.userModel.create(createUserDto);
    console.log(user);
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all users`;
  }

  async findOne(id: string) {
    const user = await this.userModel.findById(id);
    return user;
  }

  async findOneByEmail(email: string) {
    const user = await this.userModel.findOne({ email });
    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    const user = this.userModel.findByIdAndUpdate(id, updateUserDto);
    return user;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
