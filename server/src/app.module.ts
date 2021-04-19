import { Module } from '@nestjs/common'
import { ExercisesModule } from './exercises/exercises.module'
import { MovesModule } from './moves/moves.module'
import { WorkoutsModule } from './workouts/workouts.module'
import { MongooseModule } from '@nestjs/mongoose'
import { uri } from '../config/mongoose.config'
import { GraphQLModule } from '@nestjs/graphql'
import { GqlOptions } from 'config/gql.config'
import { AuthModule } from './auth/auth.module'
import { ConfigModule } from '@nestjs/config'

@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true }),
		MongooseModule.forRoot(uri),
		GraphQLModule.forRoot(GqlOptions),
		ExercisesModule,
		MovesModule,
		WorkoutsModule,
		AuthModule,
	],
})
export class AppModule {}
