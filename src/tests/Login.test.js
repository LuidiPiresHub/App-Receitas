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
    renderWithRouter(<App />);
    const btnEnter = screen.getByRole('button', { name: 'Enter' });
    const inputEmail = screen.getByTestId('email-input');
    const inputPassword = screen.getByTestId('password-input');
    expect(btnEnter.disabled).toBeTruthy();
    userEvent.type(inputEmail, EMAIL);
    expect(btnEnter.disabled).toBeTruthy();
    userEvent.type(inputPassword, 'teste23');
    expect(btnEnter.disabled).toBeFalsy();
  });
});
