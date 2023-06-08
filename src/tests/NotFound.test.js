import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import { NotFound } from '../pages';

describe('Testes do NotFound', () => {
  it('Teste se a página contém um heading h2 com o texto Page requested not found', () => {
    renderWithRouter(<NotFound />);
    const title = screen.getByRole('heading', { level: 2, name: 'Page requested not found' });
    expect(title).toBeInTheDocument();
  });
  it('Teste se a página mostra a imagem esperada', () => {
    renderWithRouter(<NotFound />);
    const errorImg = screen.getByAltText('Pikachu crying because the page requested was not found');
    expect(errorImg.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
