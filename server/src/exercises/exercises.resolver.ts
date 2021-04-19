import {
	Resolver,
	Query,
	Args,
	ResolveField,
	Parent,
	ID,
} from '@nestjs/graphql'
import { ExercisesService } from './exercises.service'
import { Exercise } from './entities/exercise.entity'
import { Move } from 'src/moves/entities/move.entity'
import { UseGuards } from '@nestjs/common'
import { AuthGuard } from 'src/auth/auth.guard'

@Resolver(() => Exercise)
@UseGuards(AuthGuard)
export class ExercisesResolver {
	constructor(private readonly exercisesService: ExercisesService) {}

	@Query(() => [Exercise], { name: 'exercises', nullable: true })
	findAll() {
		return this.exercisesService.findAll()
	}

	@Query(() => Exercise, { name: 'exercise', nullable: true })
	findOne(@Args('id', { type: () => ID }) id: string) {
		return this.exercisesService.findOne(id)
	}

	@ResolveField()
	async moves(
		@Parent() exercise: Exercise,
		@Args('populate') populate: boolean,
	) {
		if (populate) {
			await exercise
				.populate({ path: 'moves', model: Move.name })
				.execPopulate()
		}

		return exercise.moves
	}
}
