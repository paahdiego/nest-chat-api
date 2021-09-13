import { ApiProperty } from '@nestjs/swagger';

import { Message } from 'src/messages/entities/messages.entity';
import { User } from 'src/users/entities/user.entity';

export class ChatDto {
  @ApiProperty()
  _id: string;

  @ApiProperty()
  lastMessage: Message;

  @ApiProperty()
  members: User[];

  @ApiProperty()
  name: User[];

  @ApiProperty()
  image: User[];

  @ApiProperty()
  createdBy: string;

  @ApiProperty()
  updatedBy: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
