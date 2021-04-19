import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql'
import { MovesService } from './moves.service'
import { Move } from './entities/move.entity'
import { UseGuards } from '@nestjs/common'
import { AuthGuard } from 'src/auth/auth.guard'

@Resolver(() => Move)
@UseGuards(AuthGuard)
export class MovesResolver {
	constructor(private readonly movesService: MovesService) {}

	@Query(() => [Move], { name: 'moves', nullable: true })
	findAll() {
		return this.movesService.findAll()
	}

	@Query(() => Move, { name: 'move', nullable: true })
	findOne(@Args('id', { type: () => Int }) id: number) {
		return this.movesService.findOne(id)
	}
}
