<script lang="ts">
	import { workout } from '../stores/workout'

	const READY_BEEPS_OCCURENCES: number[] = [57, 58, 59]

	const readyBeep: HTMLAudioElement = new Audio('/sounds/steady-beep.wav')
	const goBeep: HTMLAudioElement = new Audio('/sounds/go-beep.wav')
	$: if (READY_BEEPS_OCCURENCES.includes(($workout.elapsed + 60) % 60)) {
		readyBeep.play()
	} else if ($workout.elapsed === 0) {
		goBeep.play()
	}
</script>
