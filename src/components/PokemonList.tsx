import { useEffect, useState } from 'react'
import '../styles/main.scss'

interface PokemonList {
  name: string
  url: string
  id: number
}

export function PokemonList() {
  const [pokemonList, setPokemonList] = useState<PokemonList[]>([])

  const fetchPokemon = async () => {
    const url = `https://pokeapi.co/api/v2/pokemon/?limit=150`
    const response = await fetch(url)
    const pokemon = await response.json()
    setPokemonList(pokemon.results)
  }

  useEffect(() => {
    fetchPokemon()
  }, [])

  let filteredPokemon = pokemonList.map((pokemon: PokemonList, index) => {
    return {
      ...pokemon,
      id: index + 1,
    }
  })

  return (
    <section className="pokemon-list">
      {filteredPokemon.map((pokemon) => {
        return (
          <div key={pokemon.id} className="pokemon-card">
            <p>{pokemon.name}</p>
            <div className="container-img">
              <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
                alt=""
              />
            </div>
          </div>
        )
      })}
    </section>
  )
}
