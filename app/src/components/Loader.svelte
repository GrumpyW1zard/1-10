<script lang="ts">
	export let width: number = 48
	export let height: number = 48
	export let centered: boolean = true
</script>

<img
	class:centered
	src="https://s.svgbox.net/loaders.svg?ic=ball-triangle&fill=000"
	{width}
	{height}
	alt="loader"
/>

<style>
	.centered {
		margin-top: 25%;
	}
</style>
