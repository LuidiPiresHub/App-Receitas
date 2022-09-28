import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './Helpers/renderWithRouter';

describe('Verifica o componente NotFound', () => {
  test('Verifica se o componente é chamado ao passar uma rota errada', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/xablau');
    const notFound = screen.getByText(/NotFound/i);
    expect(notFound).toBeInTheDocument();
    history.push('/');
    expect(notFound).not.toBeInTheDocument();
  });
});
