import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateMessageDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  text: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  sender: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  receiver: string;

  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  chat: string;
}
