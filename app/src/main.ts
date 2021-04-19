import HMR from '@roxi/routify/hmr'
import App from './App.svelte'

declare global {
	const gapi
}

const app = HMR(App, { target: document.body }, 'routify-app')

export default app
