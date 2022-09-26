import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './Helpers/renderWithRouter';

const EMAIL = 'test@test.com';

describe('Testing the page Login', () => {
  it('1- The page contains inputs and button', () => {
    renderWithRouter(<App />);
    expect(screen.getByTestId('email-input')).toBeInTheDocument();
    expect(screen.getByTestId('password-input')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Enter' })).toBeInTheDocument();
  });
  it('2- Checks if inputs and button work correctly', () => {
    const { history } = renderWithRouter(<App />);
    const btnEnter = screen.getByRole('button', { name: 'Enter' });
    expect(btnEnter.disabled).toBeTruthy();
    userEvent.type(screen.getByTestId('email-input'), EMAIL);
    expect(btnEnter.disabled).toBeTruthy();
    userEvent.type(screen.getByTestId('password-input'), 'teste23');
    expect(btnEnter.disabled).toBeFalsy();
    userEvent.click(btnEnter);
    expect(history.location.pathname).toBe('/meals');
  });
});
