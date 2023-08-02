import React from 'react'
import { Pokemon } from '../types/Pokemon'

interface Props {
  pokemon: Pokemon
}

const PokemonCard: React.FC<Props> = ({ pokemon }) => {
  return (
    <div className='pokemon-card'>
      <h2>{pokemon.name}</h2>
      <img src={`${pokemon.sprites.other?.home.front_shiny}`} />
    </div>
  )
}

export default PokemonCard
