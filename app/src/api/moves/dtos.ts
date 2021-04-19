export interface MoveUnit {
	move: Move
	reps?: number[]
}

export interface Move {
	_id: string
	name?: string
	difficulty?: number
}
