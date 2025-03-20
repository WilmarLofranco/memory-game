// App.jsx
import { useState, useEffect } from 'react'
import './App.css'

function PokemonList() {
  const [fetchedPokemons, setFetchedPokemons] = useState([""]);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [chosenPokemons, setChosenPokemons] = useState([""]);

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=10&offset=0")
      .then(response => response.json())
      .then(data => setFetchedPokemons(data.results.map((p) => p.name).sort(() => Math.random() - 0.5)))
      .catch(error => console.error("Error fetching data:", error))
  }, [chosenPokemons])

  const evaluateChosen = (pokemon) => {
    if (!chosenPokemons.includes(pokemon)) {
      setChosenPokemons(prev => [...prev, pokemon]);
      setScore((prev) => {
        const newScore = prev + 1;
        setBestScore((prevBest) => Math.max(prevBest, newScore));
        return newScore;
      })
    } else {
      setChosenPokemons([]);
      setScore(0);
    }
  };

  return (
    <>
    <div className='header'>
      <h1>PokeMemory Game</h1>
      <h3>by Will Moore</h3>
      <p>Get points by clicking on a pokemon but don't click on any more than once!</p>
      <div className='score'>
        <p>Score: {score}</p>
        <p>Best Score: {bestScore}</p>
      </div>
    </div>
    <div className='content'>
        {fetchedPokemons.map((pokemon) => {
          return <Pokemon key={pokemon} name={pokemon} onClick={() => evaluateChosen(pokemon)} />
        })}
    </div>
    </>
  )
}

function Pokemon({name, onClick}) {

const [pokeImg, setPokeImg] = useState("");

useEffect(() => {
  fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
    .then(response => response.json())
    .then(data => {
      setPokeImg(data.sprites.front_default);
    })
    .catch(error => console.error("Error fetching data:", error))
}, [name])

  return (
    <button className='pokemon-card' onClick={onClick}>
      <img src={pokeImg} />
      <h2>{name}</h2>
    </button>
  ) 
}

export  { PokemonList }
