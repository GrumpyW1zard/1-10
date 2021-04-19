import { writable } from 'svelte/store'

export interface User {
	idToken: string
	name: string
	imageUrl: string
	expiresAt: number
}

const createUser = () => {
	const storedUser = localStorage.getItem('user')
	const { subscribe, set, update } = writable(JSON.parse(storedUser))
	return {
		subscribe,
		signIn: (user: User) => {
			set(user)
			localStorage.setItem('user', JSON.stringify(user))
		},
		signOut: () => {
			set(null)
			localStorage.removeItem('user')
		},
		refreshIdToken: (idToken: string, expiresAt: number) => {
			update((user: User) => {
				const updatedUser = { ...user, idToken, expiresAt }
				localStorage.setItem('user', JSON.stringify(updatedUser))
				return updatedUser
			})
		},
	}
}

export const user = createUser()
