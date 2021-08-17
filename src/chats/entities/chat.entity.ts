import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

import * as mongoose from 'mongoose';

export type ChatDocument = Chat & Document;

@Schema()
export class Chat {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Message' })
  lastMessage: string;

  @Prop({
    required: true,
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  })
  members: string[];

  @Prop()
  name?: string;

  @Prop()
  image?: string;
}

export const ChatSchema = SchemaFactory.createForClass(Chat);
