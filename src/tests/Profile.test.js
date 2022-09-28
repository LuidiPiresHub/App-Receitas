import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './Helpers/renderWithRouter';

const emailMocked = { email: 'alguem@alguem.com' };

describe('Testando a página de perfil', () => {
  test('Verfica se os botões estão na tela e funcionando', () => {
    const { history } = renderWithRouter(<App />);
    localStorage.setItem('user', JSON.stringify(emailMocked));
    history.push('/profile');
    const userEmail = screen.getByTestId('profile-email');
    expect(userEmail).toBeInTheDocument();
    expect(userEmail).toHaveTextContent('alguem@alguem.com');

    const doneRepBtn = screen.getByTestId('profile-done-btn');
    expect(doneRepBtn).toBeInTheDocument();

    const favoriteRepBtn = screen.getByTestId('profile-favorite-btn');
    expect(favoriteRepBtn).toBeInTheDocument();

    const logoutBtn = screen.getByTestId('profile-logout-btn');
    expect(logoutBtn).toBeInTheDocument();
  });

  test('Verfica se ao clicar no botão Done recipes é redirecionado para a rota certa', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/profile');
    const doneRepBtn = screen.getByTestId('profile-done-btn');
    userEvent.click(doneRepBtn);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/done-recipes');
  });

  test('Verfica se ao clicar no botão Favorite Recipes é redirecionado para a rota certa', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/profile');
    const favoriteRepBtn = screen.getByTestId('profile-favorite-btn');
    userEvent.click(favoriteRepBtn);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/favorite-recipes');
  });

  test('Verfica se ao clicar no botão Logout é redirecionado para a rota certa', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/profile');
    const logoutBtn = screen.getByTestId('profile-logout-btn');
    userEvent.click(logoutBtn);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/');
  });
});
