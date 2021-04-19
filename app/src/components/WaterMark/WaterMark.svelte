<script lang="ts">
	import { WATER_MARK_POSITION, WATER_MARK_SIZE } from './types'

	export let position: WATER_MARK_POSITION
	export let text: string
	export let size: WATER_MARK_SIZE = WATER_MARK_SIZE.LARGE
</script>

<div class="{position} {size}">{text}</div>

<style>
	div {
		position: absolute;
		font-weight: bold;
		text-transform: uppercase;
		font-weight: bold;
		-webkit-text-fill-color: transparent;
		-webkit-text-stroke-width: 15px;
		-webkit-text-stroke-color: #5c5c5c2e;
		z-index: -1;
		white-space: nowrap;
	}

	.large {
		font-size: 20em;
	}

	.small {
		font-size: 15em;
	}

	.top-right {
		top: 0;
		right: -0.3em;
	}

	.bottom-left {
		bottom: 0;
		left: -0.5em;
	}

	@media only screen and (max-width: 640px) {
		.large,
		.small {
			display: none;
		}
	}
</style>
