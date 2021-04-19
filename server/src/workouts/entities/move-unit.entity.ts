import { Field, Int, ObjectType } from '@nestjs/graphql'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Schema as MongooseSchema } from 'mongoose'
import { Move } from '../../moves/entities/move.entity'

@ObjectType()
@Schema()
export class MoveUnit extends Document {
	@Prop({ type: MongooseSchema.Types.ObjectId, ref: Move.name })
	@Field(() => Move)
	move: MongooseSchema.Types.ObjectId | Move

	@Prop()
	@Field(() => [Int])
	reps: number[]
}

export const MoveUnitSchema = SchemaFactory.createForClass(MoveUnit)
