import { InputType, Int, Field } from '@nestjs/graphql'
import { Schema as MongooseSchema } from 'mongoose'

@InputType()
export class CreateWorkoutInput {
	@Field(() => String)
	exercise: MongooseSchema.Types.ObjectId

	@Field(() => Date)
	date: Date

	@Field(() => [MoveUnitInput])
	moves: MoveUnitInput[]
}

@InputType()
class MoveUnitInput {
	@Field(() => String)
	move: MongooseSchema.Types.ObjectId

	@Field(() => [Int])
	reps: number[]
}
