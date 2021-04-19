import type { Move } from '../moves/dtos'

export interface GetNavigationExercisesDto {
	exercises: NavigationExerciseDto[]
}

interface NavigationExerciseDto {
	_id: string
	image: string
	name: string
}

export interface GetExerciseMovesDto {
	exercise?: {
		exerciseId: string
		moves: [Move]
	}
}
