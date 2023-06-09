import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

const pokemonName = 'pokemon-name';
const buttonTestId = 'pokemon-type-button';

describe('Testes do componente Pokédex', () => {
  it('Testa se a página contém um heading h2 com o texto Encountered Pokémon', () => {
    renderWithRouter(<App />);
    const title = screen.getByRole('heading', { level: 2, name: 'Encountered Pokémon' });
    expect(title).toBeInTheDocument();
  });

  it('Teste se é exibido o próximo Pokémon da lista quando o botão Próximo Pokémon é clicado', () => {
    renderWithRouter(<App />);
    const button = screen.getByTestId('next-pokemon');
    expect(button).toHaveTextContent(/Próximo Pokémon/i);
    userEvent.click(button);
    const pkmName = screen.getByTestId(pokemonName);
    expect(pkmName).toHaveTextContent('Charmander');
    userEvent.click(button);
    userEvent.click(button);
    userEvent.click(button);
    userEvent.click(button);
    userEvent.click(button);
    userEvent.click(button);
    userEvent.click(button);
    userEvent.click(button);
    const getNamePokemon = screen.getByTestId(pokemonName);
    expect(getNamePokemon).toHaveTextContent('Pikachu');
  });

  it('Teste se é mostrado apenas um Pokémon por vez', () => {
    renderWithRouter(<App />);
    const pkmNames = screen.getAllByTestId(pokemonName);
    expect(pkmNames).toHaveLength(1);
  });

  it('Teste se a Pokédex tem os botões de filtro', () => {
    renderWithRouter(<App />);
    const electricButton = screen.getAllByTestId(buttonTestId)[0];
    expect(electricButton).toHaveTextContent('Electric');
    const fireButton = screen.getAllByTestId(buttonTestId)[1];
    expect(fireButton).toHaveTextContent('Fire');
    const bugButton = screen.getAllByTestId(buttonTestId)[2];
    expect(bugButton).toHaveTextContent('Bug');
    const poisonButton = screen.getAllByTestId(buttonTestId)[3];
    expect(poisonButton).toHaveTextContent('Poison');
    const psychicButton = screen.getAllByTestId(buttonTestId)[4];
    expect(psychicButton).toHaveTextContent('Psychic');
    const normalButton = screen.getAllByTestId(buttonTestId)[5];
    expect(normalButton).toHaveTextContent('Normal');
    const dragonButton = screen.getAllByTestId(buttonTestId)[6];
    expect(dragonButton).toHaveTextContent('Dragon');
    userEvent.click(psychicButton);
    const pkmName = screen.getByTestId(pokemonName);
    expect(pkmName).toHaveTextContent('Alakazam');
    const allButton = screen.getByRole('button', { name: 'All' });
    expect(allButton).toBeInTheDocument();
  });

  it('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);
    const allButton = screen.getByRole('button', { name: 'All' });
    expect(allButton).toBeInTheDocument();
    const normalButton = screen.getAllByTestId(buttonTestId)[5];
    userEvent.click(normalButton);
    userEvent.click(allButton);
    const getNamePokemon = screen.getByTestId(pokemonName);
    expect(getNamePokemon).toHaveTextContent('Pikachu');
  });
});
