import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { InjectModel } from '@nestjs/mongoose'
import { LoginTicket, OAuth2Client } from 'google-auth-library'
import { Model } from 'mongoose'
import { WhiteList } from './entities/whitelist.entity'

@Injectable()
export class AuthService {
	private authClient: OAuth2Client

	constructor(
		private configService: ConfigService,
		@InjectModel(WhiteList.name) private whitelistModel: Model<WhiteList>,
	) {
		this.authClient = new OAuth2Client(
			this.configService.get('GOOGLE_CLIENT_ID'),
		)
	}
	async authenticate(authorizationHeader: string): Promise<string> {
		const idToken = this.extractToken(authorizationHeader)
		const loginTicket = await this.validateIdToke(idToken)
		const isWhitelisted = await this.isWhitelisted(
			loginTicket.getPayload().email,
		)
		if (isWhitelisted) {
			return loginTicket.getUserId()
		}
		throw new HttpException('Not whitelisted', HttpStatus.FORBIDDEN)
	}

	async isWhitelisted(email: string): Promise<boolean> {
		return await this.whitelistModel.exists({ email })
	}

	async validateIdToke(idToken: string): Promise<LoginTicket> {
		try {
			const ticket = await this.authClient.verifyIdToken({
				idToken,
				audience: this.configService.get('GOOGLE_CLIENT_ID'),
			})

			return ticket
		} catch (_) {
			throw new HttpException('Invalid Token', HttpStatus.UNAUTHORIZED)
		}
	}

	extractToken(authorizationHeader: string): string {
		if (authorizationHeader.split(' ')[0] === 'Bearer') {
			return authorizationHeader.split(' ')[1]
		}
		throw new HttpException('Invalid Token', HttpStatus.UNAUTHORIZED)
	}
}
