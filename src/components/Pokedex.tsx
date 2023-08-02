import React, { useState, useEffect } from 'react'
import axios from 'axios'
import PokemonCard from './PokemonCard'
import { Pokemon, Result } from '../types/Pokemon'

const Pokedex: React.FC = () => {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([])

  useEffect(() => {
    const sortPokemon = (list: Pokemon[]) => {
      const indicator = (a: Pokemon, b: Pokemon) => {
        return a.order - b.order
      }
      list.sort(indicator)
    }
  
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'https://pokeapi.co/api/v2/pokemon?limit=150'
        )
        const results: Result[] = response.data.results
        const pokemons: Pokemon[] = []
        await Promise.all(
          results.map(async (pokemon: Result) => {
            const data = await axios.get(`${pokemon.url}`)
            const pokemonToAdd = data.data
            pokemons.push(pokemonToAdd)
          })
        )
        sortPokemon(pokemons)
        setPokemonList(pokemons)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [])

  return (
    <div className='pokedex'>
      <h1>Pokédex</h1>
      <div className='pokemon-list'>
        {pokemonList.map((pokemon) => (
          <PokemonCard
            key={pokemon.id}
            pokemon={pokemon}
          />
        ))}
      </div>
    </div>
  )
}

export default Pokedex
