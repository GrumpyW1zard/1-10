<script lang="ts">
	export let previous: string
	export let next: string
	export let date: Date
	$: dateTime = new Date(date)

	const formatter = new Intl.DateTimeFormat('en', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	})
</script>

<div class="workout-navigation">
	<img
		src="https://s.svgbox.net/hero-outline.svg?ic=chevron-left&fill=000"
		width="32"
		height="32"
		alt="previous-workout"
		class:disabled={previous === null}
		class="handle"
		data-value={previous}
		on:click
	/>
	<div class="date">{formatter.format(dateTime)}</div>
	<img
		src="https://s.svgbox.net/hero-outline.svg?ic=chevron-right&fill=000"
		width="32"
		height="32"
		alt="next-workout"
		class:disabled={next === null}
		class="handle"
		data-value={next}
		on:click
	/>
</div>

<style>
	.workout-navigation {
		display: flex;
		justify-content: center;
		align-items: center;
		margin: 1em 0 1em 0;
	}
	.handle {
		cursor: pointer;
	}
	img.disabled {
		pointer-events: none;
		opacity: 0.5;
	}
	.date {
		margin: 0 1em 0 1em;
	}
</style>
