import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Schema as MongooseSchema } from 'mongoose'

@Schema()
export class WhiteList extends Document {
	_id: MongooseSchema.Types.ObjectId

	@Prop()
	email: string
}

export const WhitelistSchema = SchemaFactory.createForClass(WhiteList)
