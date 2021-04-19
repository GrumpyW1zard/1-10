const host = process.env.MONGO_HOST
const user = process.env.MONGO_USERNAME
const password = process.env.MONGO_PASSWORD
const protocol = process.env.MONGO_PROTOCOL
const dbName = 'fitness-app-db'
const queryArgs =
	process.env.NODE_ENV === 'production'
		? 'retryWrites=true&w=majority'
		: 'authSource=admin'

export const uri: string = `${protocol}://${user}:${password}@${host}/${dbName}?${queryArgs}`
