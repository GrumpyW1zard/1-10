<script lang="ts">
	export let caption: string
	export let width: string = 'max-content'
	export let subcaption: string
</script>

<div on:click style="width: {width}">
	<span class="caption">{caption}</span>
	{#if subcaption}
		<span class="subcaption">{subcaption}</span>
	{/if}
</div>

<style>
	div {
		color: white;
		background-color: #333;
		margin: 10px auto;
		padding: 0.8em 1em;
		border-radius: 0.5rem;
		cursor: pointer;
		user-select: none;
		transition: background-color 500ms linear;
		display: flex;
		flex-direction: column;
		white-space: nowrap;
	}
	.caption {
		text-transform: uppercase;
		font-weight: bold;
	}
	.subcaption {
		font-size: 0.8rem;
	}
	div:hover {
		background-color: black;
	}
</style>
