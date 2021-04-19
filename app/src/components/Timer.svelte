<script lang="ts">
	import { afterUpdate } from 'svelte'

	import { workout } from '../stores/workout'
	import Beeper from './Beeper.svelte'
	let slice: HTMLDivElement

	const FINAL_POSITIONS: {} = {
		0: { x: 50, y: 0 },
		1: { x: 0, y: 0 },
		2: { x: 0, y: 50 },
		3: { x: 0, y: 100 },
		4: { x: 50, y: 100 },
		5: { x: 100, y: 100 },
		6: { x: 100, y: 50 },
		7: { x: 100, y: 0 },
		8: { x: 50, y: 0 },
	}

	const numberOfPositions = Object.keys(FINAL_POSITIONS).length
	const unit = 60 / (numberOfPositions - 1)

	afterUpdate(() => {
		if ($workout.elapsed >= 0) {
			let positions: string[] = ['50% 50%']
			const numberOfPointsNeeded = Math.floor($workout.elapsed / unit) + 1

			for (let i = 0; i < numberOfPointsNeeded; i++) {
				const { x, y } = FINAL_POSITIONS[i]
				positions = [...positions, `${x}% ${y}%`]
				if (i + 1 === numberOfPointsNeeded) {
					const { x: nextX, y: nextY } = FINAL_POSITIONS[i + 1]
					const progress = ($workout.elapsed % unit) / unit
					const calculatedX =
						x !== nextX ? calculatePosition(x, nextX, progress) : x
					const calculatedY =
						y !== nextY ? calculatePosition(y, nextY, progress) : y
					positions = [...positions, `${calculatedX}% ${calculatedY}%`]
				}
			}

			slice.style.clipPath = `polygon(${positions.join(',')})`
		}
	})

	const calculatePosition = (
		startingPosition: number,
		nextPosition: number,
		progress: number,
	): number => {
		const difference = nextPosition - startingPosition
		return startingPosition + difference * progress
	}
</script>

<div class="outer-ring">
	<div class="inner">
		<div bind:this={slice} class="slice" />
		<div class="number">{Math.abs($workout.elapsed)}</div>
	</div>
</div>
<Beeper />

<style>
	.outer-ring {
		height: 15rem;
		width: 15rem;
		background-color: #333;
		border-radius: 50%;
		display: flex;
		overflow: hidden;
		-webkit-overflow-scrolling: touch;
		margin: auto;
	}

	.inner {
		height: 14rem;
		width: 14rem;
		border-radius: 50%;
		margin: auto;
		background: white;
		transform: translateZ(0);
		position: relative;
		display: flex;
	}

	.slice {
		background: #333;
		position: absolute;
		width: 100%;
		height: 100%;
	}

	.number {
		position: absolute;
		font-size: 8em;
		align-self: center;
		text-align: center;
		width: 100%;
		-webkit-text-fill-color: white;
		-webkit-text-stroke-width: 5px;
		-webkit-text-stroke-color: #333;
		font-weight: bold;
	}
</style>
