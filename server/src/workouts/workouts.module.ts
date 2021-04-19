import { Module } from '@nestjs/common'
import { WorkoutsService } from './workouts.service'
import { WorkoutsResolver } from './workouts.resolver'
import { Workout, WorkoutSchema } from './entities/workout.entity'
import { MongooseModule } from '@nestjs/mongoose'
import { MoveUnit, MoveUnitSchema } from './entities/move-unit.entity'
import { AuthModule } from 'src/auth/auth.module'

@Module({
	imports: [
		MongooseModule.forFeature([
			{ name: Workout.name, schema: WorkoutSchema },
			{ name: MoveUnit.name, schema: MoveUnitSchema },
		]),
		AuthModule,
	],
	providers: [WorkoutsResolver, WorkoutsService],
})
export class WorkoutsModule {}
