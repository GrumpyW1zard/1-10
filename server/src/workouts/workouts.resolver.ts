import {
	Resolver,
	Query,
	Mutation,
	Args,
	Context,
	ResolveField,
	Parent,
	ID,
} from '@nestjs/graphql'
import { WorkoutsService } from './workouts.service'
import { Workout } from './entities/workout.entity'
import { CreateWorkoutInput } from './dto/create-workout.input'
import { Exercise } from 'src/exercises/entities/exercise.entity'
import { ObjectId, Schema as MongooseSchema } from 'mongoose'
import { UseGuards } from '@nestjs/common'
import { AuthGuard } from 'src/auth/auth.guard'

@Resolver(() => Workout)
@UseGuards(AuthGuard)
export class WorkoutsResolver {
	constructor(private readonly workoutsService: WorkoutsService) {}

	@Mutation(() => Workout)
	createWorkout(
		@Args('createWorkoutInput') createWorkoutInput: CreateWorkoutInput,
		@Context('googleId') googleId: string,
	) {
		return this.workoutsService.create(googleId, createWorkoutInput)
	}

	@Query(() => Workout, { name: 'workout', nullable: true })
	findOne(
		@Args('workoutId', { type: () => ID }) id: MongooseSchema.Types.ObjectId,
	) {
		return this.workoutsService.findOne(id)
	}

	@Query(() => Workout, { name: 'latestWorkout', nullable: true })
	async getLatest(
		@Context('googleId') googleId: string,
		@Args('exerciseId', { type: () => String })
		exerciseId: MongooseSchema.Types.ObjectId,
		@Args('workoutId', { type: () => ID, nullable: true })
		id?: MongooseSchema.Types.ObjectId,
	) {
		if (id) {
			return this.workoutsService.findOne(id)
		}
		return this.workoutsService.getLatest(googleId, exerciseId)
	}

	@ResolveField('exercise', returns => Exercise)
	async exercise(
		@Parent() workout: Workout,
		@Args('populate') populate: boolean,
	) {
		if (populate) {
			await workout
				.populate({ path: 'exercise', model: Exercise.name })
				.execPopulate()
		}

		return workout.exercise
	}

	@ResolveField('next', returns => String, { nullable: true })
	async next(
		@Context('googleId') googleId: string,
		@Parent() workout: Workout,
	) {
		const nextWorkout = await this.workoutsService.findNext(
			googleId,
			workout.date,
			workout.exercise as ObjectId,
		)
		return nextWorkout?._id
	}

	@ResolveField('previous', returns => String, { nullable: true })
	async previous(
		@Context('googleId') googleId: string,
		@Parent() workout: Workout,
	) {
		const previousWorkout = await this.workoutsService.findPrevious(
			googleId,
			workout.date,
			workout.exercise as ObjectId,
		)
		return previousWorkout?._id
	}
}
