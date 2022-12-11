import Image from 'next/image'
import type { GetServerSideProps } from 'next'
import { prisma } from '../server/utils/prisma'
import { AsyncReturnType } from '../server/utils/ts-bs'
import { getRandomPokemon } from '../utils/getRandomPokemon'

const ResultsPage: React.FC<{
  pokemon: PokemonQueryListing
}> = (props) => {
  return (
    <div className='flex flex-col justify-center items-center px-12 '>
      <h2 className='my-5 font-bold text-4xl'>Results</h2>
      {props.pokemon.map((currentPokemon) => {
        return (
          <PokemonListing pokemon={currentPokemon} key={currentPokemon.id} />
        )
      })}
    </div>
  )
}

const getPokemonInOrder = async () => {
  return await prisma.pokemon.findMany({
    orderBy: {
      VoteFor: { _count: 'desc' }
    },
    select: {
      id: true,
      name: true,
      spriteUrl: true,
      _count: { select: { VoteFor: true, VoteAgainst: true } }
    }
  })
}

type PokemonQueryListing = AsyncReturnType<typeof getPokemonInOrder>

const PokemonListing: React.FC<{ pokemon: PokemonQueryListing[number] }> = (
  props
) => {
  return (
    <div className='flex  items-center border border-white  transition-all p-2  hover:bg-gray-700 w-full max-w-2xl'>
      <Image
        src={props.pokemon.spriteUrl}
        alt={props.pokemon.name}
        width={100}
        height={100}
      />
      <div className='capitalize text-xl font-bold'>{props.pokemon.name}</div>
    </div>
  )
}

export default ResultsPage

export const getStaticProps: GetServerSideProps = async () => {
  const pokemonOrdered = await getPokemonInOrder()
  return { props: { pokemon: pokemonOrdered }, revalidate: 60 }
}
