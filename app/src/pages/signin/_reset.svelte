<main>
	<slot />
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		margin: 0 auto;
		height: calc(100vh - 2em);
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>
