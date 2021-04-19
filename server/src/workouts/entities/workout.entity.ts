import { ObjectType, Field } from '@nestjs/graphql'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Schema as MongooseSchema } from 'mongoose'
import { Exercise } from 'src/exercises/entities/exercise.entity'
import { MoveUnit, MoveUnitSchema } from './move-unit.entity'

@ObjectType()
@Schema()
export class Workout extends Document {
	@Field(() => String)
	_id: MongooseSchema.Types.ObjectId

	@Prop({ type: String })
	@Field(() => String)
	googleId: string

	@Prop({ type: MongooseSchema.Types.ObjectId, ref: Exercise.name })
	@Field(() => Exercise)
	exercise: MongooseSchema.Types.ObjectId | Exercise

	@Prop()
	@Field(() => Date)
	date: Date

	@Prop([{ type: MoveUnitSchema }])
	@Field(() => [MoveUnit])
	moves: MoveUnit[]

	@Field(() => String, { nullable: true })
	previous?: MongooseSchema.Types.ObjectId

	@Field(() => String, { nullable: true })
	next?: MongooseSchema.Types.ObjectId
}

export const WorkoutSchema = SchemaFactory.createForClass(Workout)
