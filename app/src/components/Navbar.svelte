<script lang="ts">
	import { redirect } from '@roxi/routify'

	import { user } from '../stores/user'

	const signOut = () => {
		gapi.load('auth2', async () => {
			const auth = await gapi.auth2.init()
			await auth.signOut()
			user.signOut()
			$redirect('/signin')
		})
	}
</script>

<nav class="navbar">
	<span class="avatar">
		{$user.name}
	</span>
	<span class="right navbar__link" on:click={signOut}>Sign Out</span>
</nav>

<style>
	.navbar {
		overflow: hidden;
		background-color: white;
		display: flex;
		align-items: center;
		border-bottom: solid #333 3px;
	}

	.navbar span {
		color: #333;
		text-align: center;
		padding: 14px;
		text-decoration: none;
	}

	.avatar {
		display: flex;
		align-items: center;
	}

	.navbar__link {
		cursor: pointer;
		/* margin-right: 1em; */
	}

	.navbar__link::before {
		content: '';
		position: absolute;
		background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBkPSJNMTQgMTl2LS4wODNjLTEuMTc4LjY4NS0yLjU0MiAxLjA4My00IDEuMDgzLTQuNDExIDAtOC0zLjU4OS04LThzMy41ODktOCA4LThjMS40NTggMCAyLjgyMi4zOTggNCAxLjA4M3YtMi4yNDVjLTEuMjI2LS41MzYtMi41NzYtLjgzOC00LS44MzgtNS41MjIgMC0xMCA0LjQ3Ny0xMCAxMHM0LjQ3OCAxMCAxMCAxMGMxLjQyNCAwIDIuNzc0LS4zMDIgNC0uODM4di0yLjE2MnptNC05LjU5MmwyLjk2MyAyLjU5Mi0yLjk2MyAyLjU5MnYtMS41OTJoLTh2LTJoOHYtMS41OTJ6bS0yLTQuNDA4djRoLTh2Nmg4djRsOC03LTgtN3oiLz48L3N2Zz4=);
		width: 24px;
		height: 24px;
		top: 12px;
		transition: opacity 0.4s ease, transform 0.4s ease;
		opacity: 0;
	}

	.navbar__link:hover:before {
		transform: translate3d(-110%, 0, 0);
		opacity: 1;
	}

	.navbar .right {
		margin-left: auto;
	}
</style>
