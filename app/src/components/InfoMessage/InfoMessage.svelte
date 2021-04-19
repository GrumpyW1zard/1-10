<script lang="ts">
	import { MESSAGE_TYPES } from './types'

	export let type: MESSAGE_TYPES = MESSAGE_TYPES.INFO
	export let text: string = ''
</script>

<div class="message {type}">
	<div>
		{#if type === MESSAGE_TYPES.INFO}
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
				width="24"
				height="24"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
				/>
			</svg>
		{:else if type === MESSAGE_TYPES.SUCCESS}
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
				width="24"
				height="24"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
				/>
			</svg>
		{:else if type === MESSAGE_TYPES.ERROR}
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
				width="24"
				height="24"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
				/>
			</svg>
		{:else if type === MESSAGE_TYPES.WARNING}
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
				width="24"
				height="24"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
				/>
			</svg>
		{/if}
	</div>
	<div class="text">{text}</div>
</div>

<style>
	.message {
		display: flex;
		flex-direction: row;
		border-radius: 0.375rem;
		padding: 1rem 2rem;
		justify-content: center;
		align-items: center;
		max-width: 750px;
		margin-right: auto;
		margin-left: auto;
		margin-top: 1rem;
		margin-bottom: 1rem;
		text-align: left;
	}
	.success {
		background-color: #c6f6d5;
		color: #38a169;
	}
	.info {
		background-color: #bee3f8;
		color: #3182ce;
	}
	.error {
		background-color: #fed7d7;
		color: #e53e3e;
	}
	.warning {
		background-color: #fef7d7;
		color: #e59d3e;
	}
	svg {
		height: 2em;
		width: 2em;
		margin-right: 0.5rem;
	}
</style>
