import { Module } from '@nestjs/common'
import { MovesService } from './moves.service'
import { MovesResolver } from './moves.resolver'
import { MongooseModule } from '@nestjs/mongoose'
import { Move, MoveSchema } from './entities/move.entity'
import { AuthModule } from 'src/auth/auth.module'

@Module({
	imports: [
		MongooseModule.forFeature([{ name: Move.name, schema: MoveSchema }]),
		AuthModule,
	],
	providers: [MovesResolver, MovesService],
})
export class MovesModule {}
