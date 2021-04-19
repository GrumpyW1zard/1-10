<script lang="ts">
	import { operationStore, query } from '@urql/svelte'
	import { goto } from '@roxi/routify'

	import Button from '../../components/Button.svelte'
	import Loader from '../../components/Loader.svelte'
	import WorkoutNavigation from '../../components/WorkoutNavigation.svelte'
	import BackNav from '../../components/BackNav.svelte'
	import { workout } from '../../stores/workout'
	import WaterMark from '../../components/WaterMark/WaterMark.svelte'
	import InfoMessage from '../../components/InfoMessage/InfoMessage.svelte'
	import MovesTable from '../../components/MovesTable.svelte'
	import {
		WATER_MARK_POSITION,
		WATER_MARK_SIZE,
	} from '../../components/WaterMark/types'
	import type { GetWorkoutDto } from '../../api/workouts/dtos'
	import { GET_WORKOUT } from '../../api/workouts/queries'
	import { MESSAGE_TYPES } from '../../components/InfoMessage/types'
	import Empty from '../../components/Empty.svelte'
	import { text } from 'svelte/internal'

	export let exerciseId: string

	const workoutStore = operationStore<GetWorkoutDto>(GET_WORKOUT, {
		workoutId: null,
		exerciseId,
	})
	query(workoutStore)

	function navigateWorkout(event: MouseEvent) {
		const element = event.target as HTMLDivElement
		const workoutId = element.getAttribute('data-value')
		$workoutStore.variables = { workoutId, exerciseId }
	}
</script>

<BackNav link="/" />
<section class="content">
	<Button
		caption="Start a new workout"
		on:click={() => {
			workout.resetWorkout()
			$goto(`/workout/${exerciseId}`)
		}}
	/>
	{#if $workoutStore.fetching}
		<Loader height={48} width={48} />
	{:else if $workoutStore.error}
		<InfoMessage
			type={MESSAGE_TYPES.ERROR}
			text="Oh no... Something went wrong. Try refreshing the page."
		/>
	{:else if $workoutStore.data.latestWorkout}
		<WorkoutNavigation
			next={$workoutStore.data.latestWorkout.next}
			previous={$workoutStore.data.latestWorkout.previous}
			date={$workoutStore.data.latestWorkout.date}
			on:click={navigateWorkout}
		/>
		<MovesTable moves={$workoutStore.data.latestWorkout.moves} />
		<WaterMark
			text={$workoutStore.data.latestWorkout.exercise.name}
			position={WATER_MARK_POSITION.BOTTOM_LEFT}
			size={WATER_MARK_SIZE.SMALL}
		/>
	{:else}
		<Empty>
			<p>Currently, there are no workouts.</p>
			<p>Hit the button above and start your workout.</p>
		</Empty>
	{/if}
	<WaterMark text="1-10" position={WATER_MARK_POSITION.TOP_RIGHT} />
</section>

<style>
	.content {
		min-height: 85vh;
		position: relative;
	}
</style>
