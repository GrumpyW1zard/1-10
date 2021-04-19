import { Module } from '@nestjs/common'
import { ExercisesService } from './exercises.service'
import { ExercisesResolver } from './exercises.resolver'
import { MongooseModule } from '@nestjs/mongoose'
import { Exercise, ExerciseSchema } from './entities/exercise.entity'
import { AuthModule } from 'src/auth/auth.module'

@Module({
	imports: [
		MongooseModule.forFeature([
			{ name: Exercise.name, schema: ExerciseSchema },
		]),
		AuthModule,
	],
	providers: [ExercisesResolver, ExercisesService],
})
export class ExercisesModule {}
