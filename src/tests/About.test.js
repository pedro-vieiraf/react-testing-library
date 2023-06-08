import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import { About } from '../pages';

describe('Testes do About', () => {
  renderWithRouter(<About />);
  screen.findAllByAltText('teste');
});
