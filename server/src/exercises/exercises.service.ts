import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Exercise } from './entities/exercise.entity'

@Injectable()
export class ExercisesService {
	constructor(
		@InjectModel(Exercise.name) private exerciseModel: Model<Exercise>,
	) {}

	findAll() {
		return this.exerciseModel.find().exec()
	}

	findOne(id: string) {
		return this.exerciseModel.findById(id)
	}
}
