import { ApiProperty } from '@nestjs/swagger';
import { Chat } from 'src/chats/entities/chat.entity';
import { User } from 'src/users/entities/user.entity';

export class MessageDto {
  @ApiProperty()
  _id: string;

  @ApiProperty()
  text: string;

  @ApiProperty()
  sender: User;

  @ApiProperty()
  receiver: User;

  @ApiProperty()
  chat: Chat;

  @ApiProperty()
  createdBy: string;

  @ApiProperty()
  updatedBy: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
