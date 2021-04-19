export const GET_WORKOUT = `
	query ($exerciseId: String!, $workoutId: ID) {
		latestWorkout(workoutId: $workoutId, exerciseId: $exerciseId) {
			date
			next
			previous
			exercise(populate: true) {
				name
			}
			moves {
				move {
				name
				difficulty
			}
				reps
			}
		}
	}
`

export const SAVE_WORKOUT_MUTATION = `
    mutation ($createWorkoutInput: CreateWorkoutInput!) {
		createWorkout(createWorkoutInput: $createWorkoutInput) {
            _id
        }
	}
`
