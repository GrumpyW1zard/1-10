<script lang="ts">
	import { user } from '../stores/user'
	import { redirect } from '@roxi/routify'
	import { onMount } from 'svelte'

	function signIn() {
		gapi.load('auth2', async function () {
			const auth = await gapi.auth2.init()
			const googleUser = await auth.signIn()
			const profile = googleUser.getBasicProfile()
			const { id_token, expires_at } = googleUser.getAuthResponse()
			user.signIn({
				idToken: id_token,
				name: profile.getName(),
				imageUrl: profile.getImageUrl(),
				expiresAt: expires_at,
			})
			$redirect('/')
		})
	}

	onMount(() => {
		gapi.load('signin2', async function () {
			gapi.signin2.render('google-signin-button', { theme: 'dark' })
		})
	})
</script>

<div class="sign-in-wrapper">
	<div id="google-signin-button" data-longtitle="true" on:click={signIn} />
</div>

<style>
	.sign-in-wrapper {
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
