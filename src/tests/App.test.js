import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testes do App', () => {
  it('A aplicação contém um conjunto fixo de links de navegação', () => {
    renderWithRouter(<App />);
    expect(screen.getAllByRole('link')[0]).toHaveTextContent('Home');
    expect(screen.getAllByRole('link')[1]).toHaveTextContent('About');
    expect(screen.getAllByRole('link')[2]).toHaveTextContent('Favorite Pokémon');
  });

  it('Teste se a aplicação é redirecionada para a página inicial ao clicar no link Home da barra de navegação', () => {
    const { history } = renderWithRouter(<App />);
    const home = screen.getByRole('link', { name: /Home/i });
    userEvent.click(home);
    expect(history.location.pathname).toBe('/');
  });

  it('Teste se a aplicação é redirecionada para a página de About ao clicar no link About da barra de navegação', () => {
    const { history } = renderWithRouter(<App />);
    const about = screen.getByRole('link', { name: /About/i });
    userEvent.click(about);
    expect(history.location.pathname).toBe('/about');
  });

  it('Teste se a aplicação é redirecionada para a página de Pokémon Favoritados ao clicar no link Favorite Pokémon da barra de navegação', () => {
    const { history } = renderWithRouter(<App />);
    const favorite = screen.getByRole('link', { name: /Favorite Pokémon/i });
    userEvent.click(favorite);
    expect(history.location.pathname).toBe('/favorites');
  });

  /* it('Teste se a aplicação é redirecionada para a página Not Found ao entrar em uma URL desconhecida.', () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/found');
    });
    const takeNotFoundPage = screen.getByRole('heading', { level: 2 });
    expect(takeNotFoundPage).toBeInTheDocument();
  }); */
});

// acessar os elementos da tela

// interagir com os elementos (se for necessário)

// fazer os testes
