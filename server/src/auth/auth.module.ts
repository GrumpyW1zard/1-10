import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { AuthGuard } from './auth.guard'
import { AuthService } from './auth.service'
import { WhiteList, WhitelistSchema } from './entities/whitelist.entity'

@Module({
	providers: [AuthService, AuthGuard],
	exports: [AuthGuard, AuthService],
	imports: [
		MongooseModule.forFeature([
			{ name: WhiteList.name, schema: WhitelistSchema },
		]),
	],
})
export class AuthModule {}
