import * as trpcNext from '@trpc/server/adapters/next'
import { appRouter, AppRouter } from '../../../server/routers/_app'
import {  inferRouterInputs, inferRouterOutputs } from '@trpc/server'
// export API handler
export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext: () => ({})
})

type RouterInput = inferRouterInputs<AppRouter>;
type RouterOutput = inferRouterOutputs<AppRouter>;

export type PokemonInput = RouterInput["getPokemonById"]["id"]

export type PokemonOutput = RouterOutput["getPokemonById"]
