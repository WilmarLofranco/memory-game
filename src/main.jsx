// main.jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { PokemonList } from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PokemonList />
  </StrictMode>
)
