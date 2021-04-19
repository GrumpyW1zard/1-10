<script lang="ts">
	import type { MoveUnit } from '../api/moves/dtos'
	import { MAX_ROUNDS } from '../constants'

	export let moves: MoveUnit[]
</script>

<div class="table-wrapper">
	<table>
		<thead>
			<tr>
				<th>Move</th>
				{#each new Array(MAX_ROUNDS) as _, i}
					<th>{i + 1}</th>
				{/each}
			</tr>
		</thead>
		<tbody>
			{#each moves as moveUnit (moveUnit.move._id)}
				<tr>
					<th>{moveUnit.move.name}</th>
					{#each new Array(MAX_ROUNDS) as _, i}
						<td>{moveUnit?.reps?.[i] ?? '-'}</td>
					{/each}
				</tr>
			{/each}
		</tbody>
	</table>
</div>

<style>
	.table-wrapper {
		box-shadow: 0 0 #0000, 0 0 #0000, 0 1px 3px 0 rgba(0, 0, 0, 0.1),
			0 1px 2px 0 rgba(0, 0, 0, 0.06);
		overflow-y: auto;
		border-bottom-width: 1px;
		border-color: #e5e7eb;
		border-radius: 0.5rem;
		margin-bottom: 3rem;
		width: 70%;
		margin-right: auto;
		margin-left: auto;
		scroll-snap-type: y mandatory;
	}
	table {
		min-width: 100%;
		border-collapse: collapse;
		text-indent: 0;
		border-color: inherit;
		text-align: left;
	}
	thead {
		background-color: #333;
		color: white;
	}
	tbody {
		background-color: white;
	}
	tr {
		border-top: 1px solid #e5e7eb;
		border-bottom: 1px solid #e5e7eb;
	}
	th,
	td {
		padding-left: 1.5rem;
		padding-right: 1.5rem;
		white-space: nowrap;
		padding-top: 1rem;
		padding-bottom: 1rem;
	}
	th {
		letter-spacing: 0.05em;
		text-transform: uppercase;
		scroll-snap-align: end;
	}
	td {
		text-align: center;
	}
	tr th:not(:first-child) {
		text-align: center;
	}
	@media only screen and (max-width: 1024px) {
		.table-wrapper {
			width: auto;
		}
	}
</style>
