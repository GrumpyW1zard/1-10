<script lang="ts">
	import { mutation, operationStore, query } from '@urql/svelte'

	import Button from './Button.svelte'
	import Loader from './Loader.svelte'
	import { workout, nextMove } from '../stores/workout'
	import { MAX_ROUNDS, ROUND_DURATION } from '../constants'
	import Timer from './Timer.svelte'
	import MovesPicker from './MovesPicker.svelte'
	import MovesTable from './MovesTable.svelte'
	import { GET_EXERCISE_MOVES } from '../api/exercises/queries'
	import type { GetExerciseMovesDto } from '../api/exercises/dtos'
	import { SAVE_WORKOUT_MUTATION } from '../api/workouts/queries'
	import InfoMessage from './InfoMessage/InfoMessage.svelte'
	import { MESSAGE_TYPES } from './InfoMessage/types'

	export let exerciseId: string

	const exerciseMoves = query<GetExerciseMovesDto>(
		GET_EXERCISE_MOVES({ exerciseId }),
	)
	const createWorkoutStore = operationStore(SAVE_WORKOUT_MUTATION)
	const createWorkoutMutation = mutation(createWorkoutStore)
	let rep: number
	let noData: boolean = true

	$: if ($workout.elapsed === ROUND_DURATION) {
		rep = rep ?? 0
		saveRep()
		if ($workout.round > MAX_ROUNDS) {
			workout.nextMove()
		}
	}

	const saveRep = () => {
		if (rep !== undefined) {
			workout.saveRep(rep)
			rep = undefined
		}
	}

	const save = () => {
		saveRep()
		workout.endWorkout()
		const moves = $workout.moveUnits
			.filter(({ reps }) => reps.length > 0)
			.map(({ move, reps }) => {
				return { move: move._id, reps }
			})
		if (moves.length > 0) {
			noData = false
			createWorkoutMutation({
				createWorkoutInput: {
					exercise: $workout.exerciseId,
					moves,
					date: new Date(),
				},
			})
		}
	}
</script>

{#if $exerciseMoves.fetching}
	<Loader />
{:else if $exerciseMoves.data}
	{#if $workout.ended}
		<h1>Great job with the workout.</h1>
		{#if noData}
			<InfoMessage
				type={MESSAGE_TYPES.WARNING}
				text="Workout is empty. Nothing was saved."
			/>
		{:else if $createWorkoutStore.data}
			<InfoMessage
				type={MESSAGE_TYPES.SUCCESS}
				text="Workout has been succesfully saved."
			/>
		{:else if $createWorkoutStore.error}
			<InfoMessage
				type={MESSAGE_TYPES.ERROR}
				text="Oh no... Something went wrong. Try saving the workout again."
			/>
		{:else}
			<Loader centered={false} />
		{/if}
		<MovesTable moves={$workout.moveUnits} />
	{:else if !$workout.activeMoveUnit}
		<MovesPicker exercise={$exerciseMoves.data} />
	{:else}
		<div class="workout-wrapper">
			<div class="timer">
				<Timer />
			</div>
			<div class="workout-actions">
				<div class="workout-evaluation">
					<p class="workout-evaluation__name">
						{$workout.activeMoveUnit.move.name}
					</p>
					<div class="reps">
						{#each new Array(MAX_ROUNDS) as _, i}
							{#if i === $workout.round - 1}
								<input
									type="number"
									class="number active-number"
									bind:value={rep}
								/>
							{:else}
								<div
									class:disabled={$workout.activeMoveUnit.reps[i] === undefined}
									class="number"
								>
									{$workout.activeMoveUnit.reps[i] ?? ''}
								</div>
							{/if}
						{/each}
					</div>
				</div>
				{#if $nextMove}
					<Button
						caption="Next Move"
						subcaption="({$nextMove.move.name})"
						on:click={() => {
							saveRep()
							workout.nextMove()
						}}
					/>
				{/if}
				<Button caption="End Workout" on:click={save} />
			</div>
		</div>
	{/if}
{/if}

<style>
	.workout-wrapper {
		display: flex;
		flex-direction: column;
	}

	.timer {
		display: flex;
	}

	.workout-evaluation {
		font-size: 1.5rem;
		display: flex;
		align-items: center;
		flex-direction: column;
	}

	.workout-evaluation__name {
		font-weight: bold;
		font-size: 2.5rem;
	}

	.number {
		height: 2rem;
		line-height: 2rem;
		padding: 0.4rem;
		background: white;
		margin: 0.2rem;
		border-radius: 0.375rem;
		border: solid darkgray 2px;
		box-sizing: content-box;
		text-align: center;
		width: 2rem;
		-webkit-appearance: none;
		-moz-appearance: textfield;
	}

	.active-number {
		border: solid green 4px;
	}

	.reps {
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.disabled {
		background-color: #dfdfdf;
	}

	@media only screen and (orientation: landscape) {
		.workout-wrapper {
			display: flex;
			flex-direction: row;
		}
		.workout-evaluation__name {
			margin: auto;
		}
		.workout-actions {
			flex-grow: 1;
		}
	}
</style>
