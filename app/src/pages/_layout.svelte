<script lang="ts">
	import {
		cacheExchange,
		dedupExchange,
		errorExchange,
		fetchExchange,
		initClient,
	} from '@urql/svelte'
	import { authExchange } from '@urql/exchange-auth'
	import { redirect } from '@roxi/routify'

	import { url } from '../api/config'
	import { user } from '../stores/user'
	import Navbar from '../components/Navbar.svelte'
	import {
		getAuth,
		addAuthToOperation,
		AUTH_ERROR_CODES,
		AUTH_ERROR_REASONS,
	} from '../api/utils'

	if ($user === null) {
		$redirect('/signin')
	}

	initClient({
		url,
		exchanges: [
			dedupExchange,
			cacheExchange,
			errorExchange({
				onError(error) {
					let logOutReason: AUTH_ERROR_REASONS
					error.graphQLErrors.forEach((e) => {
						logOutReason = AUTH_ERROR_CODES.get(e.extensions?.exception?.status)
						if (logOutReason) {
							return logOutReason
						}
					})
					if (logOutReason) {
						gapi.load('auth2', async () => {
							const auth = await gapi.auth2.init()
							await auth.signOut()
							user.signOut()
							$redirect('/signin', { logOutReason })
						})
					}
				},
			}),
			authExchange({
				getAuth,
				addAuthToOperation,
			}),
			fetchExchange,
		],
	})
</script>

{#if $user}
	<Navbar />
	<main>
		<slot />
	</main>
{/if}

<style>
	main {
		text-align: center;
		margin: 0 auto 2rem auto;
	}
</style>
