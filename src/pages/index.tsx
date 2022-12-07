import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { getOptionsForVote } from '../utils/getRandomPokemon'
import { trpc } from '../utils/trpc'

export default function Home() {
  const [ids, updateIds] = useState(() => getOptionsForVote())
  const [first, second] = ids

  const firstPokemon = trpc.getPokemonById.useQuery({ id: first })
  const secondPokemon = trpc.getPokemonById.useQuery({ id: second })

  if (firstPokemon.isLoading || secondPokemon.isLoading) return null

  return (
    <div className='h-screen w-screen flex flex-col justify-center items-center'>
      <div className=' text-2xl text-center'>Which Pokemon is rounder?</div>
      <div className='p-2' />
      <div className=' border rounded p-8 flex justify-between max-w-2xl items-center'>
        <div className='w-64 h-64 flex flex-col capitalize'>
          <img
            src={firstPokemon.data?.sprites.front_default}
            className='w-full'
          />
          <div className='text-xl text-center mt-[-2rem]'>{firstPokemon.data?.name}</div>
        </div>
        <div className='p-8'>VS</div>
        <div className='w-64 h-64 flex flex-col capitalize'>
          <img
            src={secondPokemon.data?.sprites.front_default}
            className='w-full'
          />
          <div className='text-xl text-center mt-[-2rem]'>{secondPokemon.data?.name}</div>
        </div>
      </div>
    </div>
  )
}
