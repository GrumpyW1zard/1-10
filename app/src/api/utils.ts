import { makeOperation, Operation } from '@urql/svelte'
import { get } from 'svelte/store'
import { MESSAGE_TYPES } from '../components/InfoMessage/types'

import { User, user } from '../stores/user'

const REFRESH_THRESHOLD_MILISECONDS = 10000

export enum AUTH_ERROR_REASONS {
	INVALID_TOKEN = 'invalid_token',
	NOT_WHITELISTED = 'not_whitelisted',
}

export const AUTH_ERROR_MESSAGES: Map<AUTH_ERROR_REASONS, object> = new Map([
	[
		AUTH_ERROR_REASONS.INVALID_TOKEN,
		{
			text: 'Authentication failed. Please try login again.',
			type: MESSAGE_TYPES.ERROR,
		},
	],
	[
		AUTH_ERROR_REASONS.NOT_WHITELISTED,
		{
			text:
				'Application is in beta testing and users have to be whitelisted to grant access',
			type: MESSAGE_TYPES.WARNING,
		},
	],
])

export const AUTH_ERROR_CODES = new Map([
	[401, AUTH_ERROR_REASONS.INVALID_TOKEN],
	[403, AUTH_ERROR_REASONS.NOT_WHITELISTED],
])

export const getAuth = async (): Promise<string> => {
	const { expiresAt, idToken } = get<User>(user)

	const isExpired = expiresAt - REFRESH_THRESHOLD_MILISECONDS < Date.now()
	if (!isExpired) return idToken

	return new Promise<string>((resolve) => {
		gapi.load('auth2', async () => {
			const auth = await gapi.auth2.init()
			const googleUser = await auth.currentUser.get()
			const { id_token, expires_at } = await googleUser.reloadAuthResponse()
			user.refreshIdToken(id_token, expires_at)
			resolve(id_token)
		})
	})
}

export const addAuthToOperation = ({
	authState,
	operation,
}: {
	authState: string
	operation: Operation<any, any>
}) => {
	if (!authState) {
		return operation
	}

	const fetchOptions =
		typeof operation.context.fetchOptions === 'function'
			? operation.context.fetchOptions()
			: operation.context.fetchOptions || {}

	return makeOperation(operation.kind, operation, {
		...operation.context,
		fetchOptions: {
			...fetchOptions,
			headers: {
				...fetchOptions.headers,
				Authorization: authState ? `Bearer ${authState}` : '',
			},
		},
	})
}
