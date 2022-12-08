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
      voteMutation.mutate({votedFor: first, votedAgainst: second})
    }else {
      voteMutation.mutate({votedFor: second, votedAgainst: first})

    }
    updateIds(getOptionsForVote())
  }
  return (
    <div className='h-screen w-screen flex flex-col justify-center items-center '>
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
      <img src={pokemon?.sprites.front_default!} className='w-64 h-64 ' />
      <div className='text-xl text-center mt-[-2rem]'>{pokemon?.name}</div>
      <button className={btn} onClick={vote}>
        Rounder
      </button>
    </div>
  )
}
