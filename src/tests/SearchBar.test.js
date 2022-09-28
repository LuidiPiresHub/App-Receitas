import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './Helpers/renderWithRouter';

describe('The SearchBar component', () => {
  it('should check if elements are on screen', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/meals');
    const searchBtn = screen.getByTestId('search-top-btn');
    expect(searchBtn).toBeInTheDocument();
    userEvent.click(searchBtn);
    const searchInput = screen.getByTestId('search-input');
    userEvent.type(searchInput, 'chicken');
    const submitBtn = screen.getByTestId('exec-search-btn');
    expect(submitBtn).toBeInTheDocument();
  });
  it('should button functions works', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/meals');
    const searchBtn = screen.getByTestId('search-top-btn');
    expect(searchBtn).toBeInTheDocument();
    userEvent.click(searchBtn);
    const radioIngredient = screen.getByTestId('ingredient-search-radio');
    const radioName = screen.getByTestId('name-search-radio');
    const radioFirstLetter = screen.getByTestId('first-letter-search-radio');
    expect(radioIngredient).toBeInTheDocument();
    expect(radioName).toBeInTheDocument();
    expect(radioFirstLetter).toBeInTheDocument();

    userEvent.click(radioIngredient);
    expect(radioIngredient).toBeChecked();
    expect(radioName).not.toBeChecked();
    expect(radioFirstLetter).not.toBeChecked();

    userEvent.click(radioName);
    expect(radioIngredient).not.toBeChecked();
    expect(radioName).toBeChecked();
    expect(radioFirstLetter).not.toBeChecked();

    userEvent.click(radioFirstLetter);
    expect(radioIngredient).not.toBeChecked();
    expect(radioName).not.toBeChecked();
    expect(radioFirstLetter).toBeChecked();
  });
});
