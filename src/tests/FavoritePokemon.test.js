import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import { FavoritePokemon } from '../pages';
import App from '../App';

describe('Testes do Favorites', () => {
  it('Teste se é exibida na tela a mensagem No favorite pokemon found, caso a pessoa não tenha Pokémon favoritos', () => {
    renderWithRouter(<FavoritePokemon />);
    const notFavoriteFound = screen.getByText('No favorite Pokémon found');
    expect(notFavoriteFound).toBeInTheDocument();
  });

  it('Teste se apenas são exibidos os Pokémon favoritados.', () => {
    renderWithRouter(<App />);
    const moreDetails = screen.getByRole('link', { name: 'More details' });
    userEvent.click(moreDetails);
    const checkFavorite = screen.getByLabelText('Pokémon favoritado?');
    userEvent.click(checkFavorite);
    const favoritesPage = screen.getByRole('link', { name: 'Favorite Pokémon' });
    userEvent.click(favoritesPage);
    const pkmImg = screen.getByAltText('Pikachu sprite');
    expect(pkmImg).toBeInTheDocument();
    expect(pkmImg.src).toBe('https://archives.bulbagarden.net/media/upload/b/b2/Spr_5b_025_m.png');
  });
});
