import { ObjectType, Field } from '@nestjs/graphql'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Schema as MongooseSchema } from 'mongoose'
import { Move } from 'src/moves/entities/move.entity'

@ObjectType()
@Schema()
export class Exercise extends Document {
	@Field(() => String)
	_id: MongooseSchema.Types.ObjectId

	@Prop()
	@Field(() => String)
	name: string

	@Prop()
	@Field(() => String)
	image: string

	@Prop({ type: [MongooseSchema.Types.ObjectId] })
	@Field(() => [Move])
	moves: MongooseSchema.Types.ObjectId[] | Move[]
}

export const ExerciseSchema = SchemaFactory.createForClass(Exercise)
