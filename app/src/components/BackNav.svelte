<script lang="ts">
	import { url } from '@roxi/routify'
	export let link: string
</script>

<div class="subnav">
	<a class="back" href={$url(link)}>back</a>
</div>

<style>
	.subnav {
		display: flex;
	}

	.back {
		line-height: 1.8125rem;
		letter-spacing: 1px;
		text-transform: uppercase;
		text-align: center;
		position: relative;
		text-decoration: none;
		padding: 5px 15px;
		color: black;
		display: inline-block;
		margin-left: 1.5rem;
		margin-top: 5px;
	}

	.back:after,
	.back:before {
		content: '';
		position: absolute;
		width: 21px;
		height: 16px;
		background-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjEiIGhlaWdodD0iMTYiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTQuMTcyIDlIMjFWN0g0LjE3Mmw1LjI0Mi01LjI0M0w4IC4zNDNsLTYuOTUgNi45NUwuMzQzIDggOCAxNS42NTdsMS40MTQtMS40MTRMNC4xNzIgOXoiIGZpbGwtcnVsZT0iZXZlbm9kZCIvPjwvc3ZnPg==);
		top: 11px;
		transition: opacity 0.4s ease, transform 0.4s ease;
	}

	.back:after {
		left: 0;
		opacity: 0;
	}

	.back:hover:after {
		transform: translate3d(-90%, 0, 0);
		opacity: 1;
	}

	.back:before {
		left: -15px;
	}

	.back:hover:before {
		transform: translate3d(-100%, 0, 0);
		opacity: 0;
	}
</style>
