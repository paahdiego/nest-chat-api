import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateMessageDto {
  @IsString()
  @IsOptional()
  @ApiProperty()
  text: string;

  @ApiProperty({ required: true })
  sender: string;

  @IsString()
  @ApiProperty({ required: true })
  chatId: string;
}
