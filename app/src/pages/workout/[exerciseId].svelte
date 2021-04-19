<script lang="ts">
	import Workout from '../../components/Workout.svelte'
	import BackNav from '../../components/BackNav.svelte'
	import WaterMark from '../../components/WaterMark/WaterMark.svelte'
	import { WATER_MARK_POSITION } from '../../components/WaterMark/types'
	export let exerciseId: string
</script>

<BackNav link={`/exercise/${exerciseId}`} />
<section class="content">
	<Workout {exerciseId} />
	<WaterMark text="1-10" position={WATER_MARK_POSITION.TOP_RIGHT} />
</section>
