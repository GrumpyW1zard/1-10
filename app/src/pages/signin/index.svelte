<script lang="ts">
	import { params } from '@roxi/routify'

	import { AUTH_ERROR_MESSAGES } from '../../api/utils'
	import GoogleSignInButton from '../../components/GoogleSignInButton.svelte'
	import InfoMessage from '../../components/InfoMessage/InfoMessage.svelte'

	$: logOutReason = $params.logOutReason
	$: logOutMessage = AUTH_ERROR_MESSAGES.get(logOutReason)
</script>

<div class="signin-wrapper">
	<div class="title text-left">
		<span class="number number-one">One</span> goal
	</div>
	<div class="title text-right">
		<span class="number number-ten">Ten</span> levels
	</div>
	<GoogleSignInButton />
	{#if logOutMessage}
		<InfoMessage {...logOutMessage} />
	{/if}
</div>

<style>
	.title {
		font-family: 'Municipal';
		font-size: 15rem;
		text-transform: uppercase;
		font-weight: bolder;
		margin: 3rem auto;
	}

	.number {
		font-size: 17rem;
		background-color: #fff;
		background-repeat: no-repeat;
		background-position: 50% 50%;
		background-size: 100%;
		background-clip: text;
		color: #3333336e;
	}

	.number-one {
		background-image: url('/images/abs.png');
	}

	.number-ten {
		background-image: url('/images/push-up.png');
	}

	.signin-wrapper {
		width: 80%;
		margin: auto;
		margin-bottom: 4em;
	}

	@media only screen and (max-width: 1536px) {
		.title {
			font-size: 13rem;
		}
		.number {
			font-size: 15rem;
		}
	}

	@media only screen and (max-width: 1280px) {
		.title {
			font-size: 10rem;
			margin: 6rem auto;
		}
		.number {
			font-size: 12rem;
		}
	}

	@media only screen and (max-width: 1024px) {
		.title {
			font-size: 6rem;
			margin: 6rem auto;
		}
		.number {
			font-size: 8rem;
		}
	}

	@media only screen and (max-width: 640px) {
		.title {
			font-size: 4rem;
		}
		.number {
			font-size: 5rem;
		}
		.signin-wrapper {
			width: 95%;
		}
	}
</style>
