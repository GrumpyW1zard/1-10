import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Move } from './entities/move.entity'

@Injectable()
export class MovesService {
	constructor(@InjectModel(Move.name) private moveModel: Model<Move>) {}

	findAll() {
		return this.moveModel.find().exec()
	}

	findOne(id: number) {
		return this.moveModel.findById(id)
	}
}
