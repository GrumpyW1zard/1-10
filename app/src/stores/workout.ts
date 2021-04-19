import { writable, derived } from 'svelte/store'
import type { Move, MoveUnit } from '../api/moves/dtos'

export interface Workout {
	exerciseId?: string
	elapsed: number
	round: number
	moveUnits: MoveUnit[]
	activeMoveUnit?: MoveUnit
	ended: boolean
	saved: boolean
}

function getNextMove(
	activeMoveUnit: MoveUnit,
	moveUnits: MoveUnit[],
): MoveUnit | undefined {
	let activeMoveIndex = moveUnits.findIndex(
		(moveUnit: MoveUnit) => activeMoveUnit.move._id === moveUnit.move._id,
	)
	moveUnits[activeMoveIndex] = activeMoveUnit

	return moveUnits[--activeMoveIndex]
}

function createWorkout() {
	const defaultValues: Workout = {
		elapsed: -3,
		round: 1,
		moveUnits: [],
		activeMoveUnit: null,
		ended: false,
		saved: false,
	}

	let interval: NodeJS.Timeout

	const { subscribe, update } = writable(defaultValues, () => {
		return () => {
			clearInterval(interval)
		}
	})

	return {
		subscribe,
		startWorkout: (activeMove: Move, moves: Move[], exerciseId: string) => {
			interval = setInterval(() => {
				update(
					(workout: Workout): Workout => {
						++workout.elapsed
						return workout
					},
				)
			}, 1000)
			update(
				(workout: Workout): Workout => {
					const activeMoveUnit = { move: activeMove, reps: [] }
					const moveUnits = moves.map((move: Move) => {
						return { move, reps: [] }
					})
					return {
						...workout,
						activeMoveUnit,
						moveUnits,
						exerciseId,
					}
				},
			)
		},
		endWorkout: () => {
			clearInterval(interval)
			update(
				(workout: Workout): Workout => {
					return { ...workout, ended: true }
				},
			)
		},
		saveRep: (rep: number) => {
			update(
				(workout: Workout): Workout => {
					const { activeMoveUnit, round } = workout
					activeMoveUnit.reps.push(rep)
					return { ...workout, elapsed: 0, round: round + 1, activeMoveUnit }
				},
			)
		},
		nextMove: () => {
			update(
				(workout: Workout): Workout => {
					const { activeMoveUnit, moveUnits } = workout

					const newActiveMoveUnit = getNextMove(activeMoveUnit, moveUnits)
					const ended = newActiveMoveUnit === undefined
					if (ended) {
						clearInterval(interval)
					} else {
						newActiveMoveUnit.reps = []
					}

					return {
						...workout,
						elapsed: 0,
						round: 1,
						activeMoveUnit: newActiveMoveUnit,
						moveUnits,
						ended,
					}
				},
			)
		},
		resetWorkout: () => {
			update((): Workout => defaultValues)
		},
		changeToSaved: () => {
			update(
				(workout: Workout): Workout => {
					return { ...workout, saved: true }
				},
			)
		},
	}
}

export const workout = createWorkout()
export const nextMove = derived(workout, ($workout) =>
	getNextMove($workout.activeMoveUnit, $workout.moveUnits),
)
