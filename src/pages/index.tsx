/* eslint-disable react/no-unescaped-entities */
import Head from 'next/head'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { getOptionsForVote } from '../utils/getRandomPokemon'
import { trpc } from '../utils/trpc'
import { PokemonOutput } from './api/trpc/[trpc]'

const btn =
  'items-center px-2.5 py-1.5 border border border-gray-300 shadow-sm text-sm font-medium rounded text-gray-700 bg-white hover-bg-gray-50 focus:outline-none focus:ring-offset-2 focus:ring-indigo-800'

export default function Home() {
  const [ids, updateIds] = useState(() => getOptionsForVote())
  const [first, second] = ids

  const firstPokemon = trpc.getPokemonById.useQuery({ id: first })
  const secondPokemon = trpc.getPokemonById.useQuery({ id: second })

  const voteMutation = trpc.castVote.useMutation()

  const voteForRoundest = (selected: number) => {
    //todo: fire mutation to persist changes
    if (selected === first) {
      voteMutation.mutate({ votedFor: first, votedAgainst: second })
    } else {
      voteMutation.mutate({ votedFor: second, votedAgainst: first })
    }
    updateIds(getOptionsForVote())
  }
  return (
    <div className='h-screen w-screen flex flex-col justify-center items-center relative'>
      <Head>
        <title>Who's the roundest pokemon?</title>
      </Head>
      <div className=' text-2xl text-center'>Which Pokemon is rounder?</div>
      <div className='p-2' />
      <div className=' border rounded p-10 flex justify-between max-w-2xl items-center '>
        {!firstPokemon.isLoading &&
          firstPokemon.data &&
          !secondPokemon.isLoading &&
          secondPokemon.data && (
            <>
              <PokemonListing
                pokemon={firstPokemon.data!}
                vote={() => voteForRoundest(first)}
              />
              <div className='p-8'>VS</div>
              <PokemonListing
                pokemon={secondPokemon.data!}
                vote={() => voteForRoundest(second)}
              />
            </>
          )}
      </div>
      <footer className='absolute bottom-0 w-full  p-8 flex items-center justify-center gap-5 text-xl'>
        <a
          href='https://github.com/Marco-Gonzalez26'
          className='hover:text-gray-400 transition-all'>
          Github
        </a>
        <a href='' className='hover:text-gray-400 transition-all '>
          Original Idea of Theo-pin.gg
        </a>
        <a href='https://pokeapi.co/' className='hover:text-gray-400 transition-all'>
          PokeAPI
        </a>
      </footer>
    </div>
  )
}
type PokemonFromServer = PokemonOutput

const PokemonListing: React.FC<{
  pokemon: PokemonFromServer
  vote: () => void
}> = ({ pokemon, vote }) => {
  return (
    <div className='w-64 h-64 flex flex-col capitalize items-center transition-all'>
      <Image
        src={pokemon?.spriteUrl}
        alt={pokemon?.name}
        className='w-64 h-64'
        width={256}
        height={256}
        loading='lazy'
      />
      <div className='text-xl text-center mt-[-2rem]'>{pokemon?.name}</div>
      <button className={btn} onClick={vote}>
        Rounder
      </button>
    </div>
  )
}
