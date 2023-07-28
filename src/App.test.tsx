import React from 'react'
import { render, screen } from '@testing-library/react'
import App from './App'

test('renders learn react link', () => {
  render(<App />)
  const linkElement = screen.getByText(
    /Pokémon de tipo planta y veneno. Su bulbo en la espalda crece a medida que lo hace él./i
  )
  expect(linkElement).toBeInTheDocument()
})
