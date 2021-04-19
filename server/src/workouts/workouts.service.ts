import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model, ObjectId } from 'mongoose'
import { CreateWorkoutInput } from './dto/create-workout.input'
import { Workout } from './entities/workout.entity'

@Injectable()
export class WorkoutsService {
	constructor(
		@InjectModel(Workout.name) private workoutModel: Model<Workout>,
	) {}

	create(googleId: string, createWorkoutInput: CreateWorkoutInput) {
		const createdWorkout = new this.workoutModel({
			...createWorkoutInput,
			googleId,
		})
		return createdWorkout.save()
	}

	findOne(id: ObjectId) {
		return this.workoutModel
			.findById(id)
			.populate({
				path: 'moves',
				populate: {
					path: 'move',
				},
			})
			.exec()
	}

	getLatest(googleId: string, exercise: ObjectId) {
		return this.workoutModel
			.findOne({ googleId, exercise: exercise })
			.sort({ date: 'desc' })
			.populate({
				path: 'moves',
				populate: {
					path: 'move',
				},
			})
			.exec()
	}

	findPrevious(googleId: string, date: Date, exercise: ObjectId) {
		return this.workoutModel
			.findOne({ googleId, exercise, date: { $lt: date } })
			.sort({ date: 'desc' })
			.exec()
	}

	findNext(googleId: string, date: Date, exercise: ObjectId) {
		return this.workoutModel
			.findOne({ googleId, exercise, date: { $gt: date } })
			.sort({ date: 'asc' })
			.exec()
	}
}
