<script lang="ts">
	import { query } from '@urql/svelte'

	import { GET_EXERCISES } from '../api/exercises/queries'
	import type { GetNavigationExercisesDto } from '../api/exercises/dtos'
	import NavigationCard from '../components/NavigationCard.svelte'
	import Loader from '../components/Loader.svelte'
	import InfoMessage from '../components/InfoMessage/InfoMessage.svelte'
	import { MESSAGE_TYPES } from '../components/InfoMessage/types'

	const exercises = query<GetNavigationExercisesDto>(GET_EXERCISES)
</script>

{#if $exercises.fetching}
	<Loader height={48} width={48} />
{:else if $exercises?.error}
	<InfoMessage
		type={MESSAGE_TYPES.ERROR}
		text="Oh no... Something went wrong. Try refreshing the page."
	/>
{:else}
	<div class="exercises">
		{#each $exercises.data.exercises as exercise}
			<NavigationCard {...exercise} />
		{/each}
	</div>
{/if}

<style>
	.exercises {
		display: flex;
		justify-content: center;
		flex-wrap: wrap;
	}
</style>
