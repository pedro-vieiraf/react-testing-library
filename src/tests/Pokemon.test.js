import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

const pkmName = 'pokemon-name';

describe('Testes no componente Pokemon', () => {
  it('Teste se é renderizado um card com as informações de determinado Pokémon', () => {
    renderWithRouter(<App />);
    const getPokemonName = screen.getByTestId(pkmName);
    expect(getPokemonName).toHaveTextContent('Pikachu');
    const getPokemonType = screen.getByTestId('pokemon-type');
    expect(getPokemonType).toHaveTextContent('Electric');
    const getPokemonWeight = screen.getByTestId('pokemon-weight');
    expect(getPokemonWeight).toHaveTextContent('Average weight: 6.0 kg');
    const img = screen.getByAltText('Pikachu sprite');
    expect(img.src).toBe('https://archives.bulbagarden.net/media/upload/b/b2/Spr_5b_025_m.png');
  });

  it('Teste se o card do Pokémon indicado na Pokédex contém um link de navegação para exibir detalhes deste Pokémon', () => {
    renderWithRouter(<App />);
    const link = screen.getByRole('link', { name: /More details/i });
    expect(link).toBeInTheDocument();
  });

  it('Teste se ao clicar no link de navegação do Pokémon, é feito o redirecionamento da aplicação para a página de detalhes de Pokémon', async () => {
    renderWithRouter(<App />);
    const link = screen.getByRole('link', { name: /More details/i });
    userEvent.click(link);
    await waitFor(() => {
      const pkmDetails = screen.getByText('Summary');
      expect(pkmDetails).toBeInTheDocument();
    });
  });

  it('Teste também se a URL exibida no navegador muda para /pokemon/<id>, onde <id> é o id do Pokémon cujos detalhes se deseja ver;', async () => {
    renderWithRouter(<App />);
    const link = screen.getByRole('link', { name: /More details/i });
    userEvent.click(link);
    await waitFor(() => {
      expect(link.href).toContain('/pokemon/25');
      const pkmDetails = screen.getByText('Summary');
      expect(pkmDetails).toBeInTheDocument();
    });
  });
  it('Teste se existe um ícone de estrela nos Pokémon favoritados', async () => {
    renderWithRouter(<App />);
    const link = screen.getByRole('link', { name: /More details/i });
    userEvent.click(link);
    await waitFor(() => {
      expect(link.href).toContain('/pokemon/25');
      const pkmDetails = screen.getByText('Summary');
      expect(pkmDetails).toBeInTheDocument();
    });
    const checkFavorite = screen.getByLabelText('Pokémon favoritado?');
    userEvent.click(checkFavorite);
    const favorited = screen.getByAltText('Pikachu is marked as favorite');
    expect(favorited.src).toContain('/star-icon.svg');
  });
});
