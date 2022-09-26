import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './Helpers/renderWithRouter';

const btnDrinks = 'drinks-bottom-btn';
const btnMeals = 'meals-bottom-btn';
const footer = 'footer';

describe('Testing the component "Footer"', () => {
  it('1- In the /meals route there is Footer', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/meals');
    expect(screen.getByTestId(footer)).toBeInTheDocument();
    expect(screen.getByTestId(btnDrinks)).toBeInTheDocument();
    expect(screen.getByTestId(btnMeals)).toBeInTheDocument();
  });
  it('2- The drink button works correctly in the /drinks route', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/meals');
    userEvent.click(screen.getByTestId(btnDrinks));
    expect(history.location.pathname).toBe('/drinks');
    userEvent.click(screen.getByTestId(btnMeals));
    expect(history.location.pathname).toBe('/meals');
  });
  it('3- In the /drinks route there is Footer', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/drinks');
    expect(screen.getByTestId(footer)).toBeInTheDocument();
    expect(screen.getByTestId(btnDrinks)).toBeInTheDocument();
    expect(screen.getByTestId(btnMeals)).toBeInTheDocument();
  });
  it('4- The drink button works correctly in the /drinks route', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/drinks');
    userEvent.click(screen.getByTestId(btnDrinks));
    expect(history.location.pathname).toBe('/drinks');
    userEvent.click(screen.getByTestId(btnMeals));
    expect(history.location.pathname).toBe('/meals');
  });
  it('5- In the /profile route there is Footer', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/profile');
    expect(screen.getByTestId(footer)).toBeInTheDocument();
    expect(screen.getByTestId(btnDrinks)).toBeInTheDocument();
    expect(screen.getByTestId(btnMeals)).toBeInTheDocument();
  });
  it('6- The drink button works correctly in the /profile route', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/profile');
    userEvent.click(screen.getByTestId(btnDrinks));
    expect(history.location.pathname).toBe('/drinks');
    userEvent.click(screen.getByTestId(btnMeals));
    expect(history.location.pathname).toBe('/meals');
  });
});
