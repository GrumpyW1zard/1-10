import type { MoveUnit } from '../moves/dtos'

export interface GetWorkoutDto {
	latestWorkout?: {
		_id: string
		date: Date
		next: string
		previous: string
		exercise: {
			_id: string
			name: string
		}
		moves: MoveUnit[]
	}
}
