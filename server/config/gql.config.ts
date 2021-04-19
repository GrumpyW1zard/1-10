import { GqlModuleOptions } from '@nestjs/graphql'
import { join } from 'path'

export const GqlOptions: GqlModuleOptions = {
	autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
	sortSchema: true,
	playground: process.env.NODE_ENV !== 'production',
	debug: process.env.NODE_ENV !== 'production',
	context: ({ req }) => {
		return { headers: req.headers }
	},
}
