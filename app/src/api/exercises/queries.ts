import { operationStore } from '@urql/svelte'

export const GET_EXERCISES = operationStore(`
	query {
		exercises {
			_id
			image
			name
		}
	}
`)

export const GET_EXERCISE_MOVES = (vars: object) =>
	operationStore(
		`
	query ($exerciseId: ID!) {
		exercise(id: $exerciseId) {
			exerciseId: _id
			moves (populate: true) {
				_id
				name
				difficulty
			}
		}
	}
`,
		vars,
	)
