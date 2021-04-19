import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'
import { AuthService } from './auth.service'

@Injectable()
export class AuthGuard implements CanActivate {
	constructor(private readonly authService: AuthService) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const ctx = GqlExecutionContext.create(context).getContext()
		if (!ctx.headers.authorization) {
			return false
		}
		ctx.googleId = await this.authService.authenticate(
			ctx.headers.authorization,
		)
		return true
	}
}
