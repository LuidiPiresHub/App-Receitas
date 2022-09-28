import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './Helpers/renderWithRouter';

describe('Testando a página de perfil', () => {
  test('Verfica se os botões estão na tela e funcionando', () => {
    renderWithRouter(<App />);
    const userEmail = screen.getByTestId('profile-email');
    expect(userEmail).toBeInTheDocument();
    const doneRepBtn = screen.getByTestId('profile-done-btn');
    expect(doneRepBtn).toBeInTheDocument();
    const favoriteRepBtn = screen.getByTestId('profile-favorite-btn');
    expect(favoriteRepBtn).toBeInTheDocument();
    const logoutBtn = screen.getByTestId('profile-logout-btn');
    expect(logoutBtn).toBeInTheDocument();
  });
});
