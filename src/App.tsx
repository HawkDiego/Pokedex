import { useEffect, useState } from 'react'
import './App.css'
import { Result, Pokemon } from './types/pokemon'

function App() {
  const [pokemons, setPokemons] = useState<Pokemon[]>()
  const [number, setNumber] = useState(0)

  const sortByPosition = (a: Pokemon, b: Pokemon) => {
    return a.order - b.order
  }

  const fetching = async () => {
    try {
      const promise = await fetch('https://pokeapi.co/api/v2/pokemon?limit=150')
      const res = await promise.json()
      const data: Result[] = res.results
      let pokemonList: Pokemon[] = []

      await Promise.all(
        data.map(async (pokemon) => {
          const pokemonDataPromise = await fetch(`${pokemon.url}`)
          const pokemonData: Pokemon = await pokemonDataPromise.json()
          pokemonList.push(pokemonData)
        })
      )
      pokemonList.sort(sortByPosition)
      setPokemons(pokemonList)
    } catch (error) {
      console.log(error)
    }
  }

  const handleClickMore = () => {
    setNumber((prevState) => prevState + 1)
  }
  const handleClickLess = () => {
    setNumber((prevState) => {
      if (prevState > 0) {
        return prevState - 1
      } else {
        return prevState
      }
    })
  }

  useEffect(() => {
    fetching()
  }, [fetching])

  return (
    <body>
      <div className='pokedex'>
        <div className='header'>
          <h1>Pokédex</h1>
        </div>
        {pokemons ? (
          <div className='screen'>
            <img
              src={`${pokemons[number].sprites.front_default}`}
              alt='Pokémon'
              className='pokemon-image'
            />

            <h2 className='pokemon-name'>{pokemons[number].name}</h2>
            <p className='pokemon-info'>
              Pokémon de tipo planta y veneno. Su bulbo en la espalda crece a
              medida que lo hace él.
            </p>
          </div>
        ) : undefined}

        <div className='buttons'>
          <button
            className='prev-button'
            onClick={handleClickLess}
          >
            ←
          </button>
          <button
            className='next-button'
            onClick={handleClickMore}
          >
            →
          </button>
        </div>
      </div>
    </body>
  )
}

export default App
