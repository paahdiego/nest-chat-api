import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { User } from 'src/users/entities/user.entity';
import * as mongoose from 'mongoose';
export type MessageDocument = Message & Document;

@Schema({ timestamps: true })
export class Message {
  @Prop({
    required: true,
  })
  text: string;

  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  })
  sender: User;

  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Chat',
  })
  chatId: string;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
