import { TRPCError } from '@trpc/server'
import { z } from 'zod'
import { procedure, router } from '../trpc'

import { prisma } from '../utils/prisma'
export const appRouter = router({
  getPokemonById: procedure
    .input(
      z.object({
        id: z.number()
      })
    )
    .query(async ({ input }) => {
      const pokemon = await prisma.pokemon.findFirst({
        where: { id: input.id }
      })
      if (!pokemon)
        throw new TRPCError({
          message: 'Pokemon doesnt exists',
          code: 'NOT_FOUND'
        })
      return pokemon
    }),
  castVote: procedure
    .input(
      z.object({
        votedFor: z.number(),
        votedAgainst: z.number()
      })
    )
    .mutation(async ({ input }) => {
      const voteInDb = await prisma.vote.create({
        data: {
          votedForId: input.votedFor,
          votedAgainstId: input.votedAgainst
        }
      })
      return { success: true, vote: voteInDb }
    })
})
// export type definition of API
export type AppRouter = typeof appRouter
