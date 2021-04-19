<script lang="ts">
	import { url } from '@roxi/routify'
	export let name: string = ''
	export let image: string = ''
	export let _id: string = ''

	let element: HTMLDivElement

	function mouseMove(e: MouseEvent) {
		const { left, top, width, height } = element.getBoundingClientRect()
		const ax = (e.clientX - left - width / 2) / 150
		const ay = ((e.clientY - top - height / 2) / 150) * -1
		element.style.transform = `perspective(500px) rotateY(${ax}deg) rotateX(${ay}deg)`
	}

	function mouseOut() {
		element.style.transform = `rotateY(0deg) rotateX(0deg)`
	}
</script>

<a href={$url(`/exercise/${_id}`)}>
	<div
		bind:this={element}
		class="exercise"
		style="background-image: url('./images/{image}')"
		on:mousemove={mouseMove}
		on:mouseout={mouseOut}
	>
		<div class="name">{name}</div>
		<div class="one-ten">1-10</div>
	</div>
</a>

<style>
	.exercise {
		width: 500px;
		background-size: cover;
		padding-bottom: 500px;
		position: relative;
		cursor: pointer;
		margin: 1em;
		overflow: hidden;
		transform-style: preserve-3d;
		user-select: none;
	}

	.exercise .name {
		position: absolute;
		text-transform: uppercase;
		font-size: 6em;
		color: #f2f2f2b3;
		font-weight: bold;
		bottom: 0;
		right: 20px;
		transform: translateZ(20px);
		text-align: right;
	}

	.exercise .one-ten {
		position: absolute;
		font-weight: bold;
		font-size: 10em;
		font-weight: bold;
		top: 0;
		right: -40px;
		-webkit-text-fill-color: transparent;
		-webkit-text-stroke-width: 5px;
		-webkit-text-stroke-color: #f2f2f269;
		transform: translateZ(20px);
	}

	@media only screen and (max-width: 640px) {
		a {
			width: 100%;
		}
		.exercise {
			width: auto;
		}
	}
</style>
