<script lang="ts">
	import Button from './Button.svelte'
	import { workout } from '../stores/workout'
	import type { GetExerciseMovesDto } from '../api/exercises/dtos'

	export let exercise: GetExerciseMovesDto

	const { exerciseId, moves } = exercise.exercise

	const getDifficulty = (movePosition: number): string => {
		if (movePosition === 10) return 'Hardest!'
		if (movePosition === 1) return 'Easiest!'
		return ''
	}
</script>

<h1>Choose starting difficulty!</h1>
<div class="buttons-container">
	{#each moves as exerciseMove (exerciseMove._id)}
		<div class="button-wrapper">
			{#if exerciseMove.difficulty === 1}
				<div class="difficulty">{getDifficulty(exerciseMove.difficulty)}</div>
			{/if}
			<Button
				caption={exerciseMove.name}
				width="auto"
				on:click={() => workout.startWorkout(exerciseMove, moves, exerciseId)}
			/>
			{#if exerciseMove.difficulty === 10}
				<div class="difficulty">{getDifficulty(exerciseMove.difficulty)}</div>
			{/if}
		</div>
	{/each}
</div>

<style>
	.buttons-container {
		display: flex;
		margin: auto;
		box-sizing: border-box;
		flex-wrap: wrap;
		justify-content: space-between;
		flex-direction: column;
		max-width: 350px;
		min-width: 200px;
	}

	.button-wrapper {
		margin: 0 2em;
	}
	.button-wrapper:first-child .difficulty {
		color: darkgreen;
	}
	.button-wrapper:last-child .difficulty {
		color: rgb(201, 0, 0);
	}
	.difficulty {
		padding-right: 10px;
		text-transform: uppercase;
		text-align: center;
		font-weight: bold;
	}
</style>
