import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testes do App', () => {
  it('A aplicação contém um conjunto fixo de links de navegação', () => {
    renderWithRouter(<App />);
    expect(screen.getAllByRole('link')[0]).toHaveTextContent('Home');
    expect(screen.getAllByRole('link')[1]).toHaveTextContent('About');
    expect(screen.getAllByRole('link')[2]).toHaveTextContent('Favorite Pokémon');
  });
});

// acessar os elementos da tela

// interagir com os elementos (se for necessário)

// fazer os testes
