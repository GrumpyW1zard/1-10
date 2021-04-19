import { ObjectType, Field, Int } from '@nestjs/graphql'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Schema as MongooseSchema } from 'mongoose'

@ObjectType()
@Schema()
export class Move extends Document {
	@Field(() => String)
	_id: MongooseSchema.Types.ObjectId

	@Prop()
	@Field(() => String)
	name: string

	@Prop()
	@Field(() => Int)
	difficulty: number
}

export const MoveSchema = SchemaFactory.createForClass(Move)
