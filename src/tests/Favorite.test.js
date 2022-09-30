import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './Helpers/renderWithRouter';
import oneDrinkId15997 from '../../cypress/mocks/oneDrinkId15997';

const storageLocal = require('../Services/storageLocal');

const btnShare = 'share-btn';
const btnFavorite = 'favorite-btn';
const routeMeals = '/meals/52977';
const routeDrinks = '/drinks/15997';
const whiteHeartMeals = 'http://localhost/meals/whiteHeartIcon.svg';
const whiteHeartDrinks = 'http://localhost/drinks/whiteHeartIcon.svg';

describe('Testing the component "Favorite"', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });
  it('1- The buttons are in the "RecipeDetails" component on the meals route', () => {
    renderWithRouter(routeMeals);
    expect(screen.getByTestId(btnShare)).toBeInTheDocument();
    expect(screen.getByTestId(btnFavorite)).toBeInTheDocument();
  });
  it('2- The share button works correctly', () => {
    window.document.execCommand = jest.fn().mockImplementation(() => 'copied');
    renderWithRouter(routeMeals);
    userEvent.click(screen.getByTestId(btnShare));
    expect(screen.getByText('Link copied!')).toBeInTheDocument();
  });
  it('3- The favorite button works correctly', () => {
    jest.spyOn(Storage.prototype, 'setItem');
    Storage.prototype.setItem = jest.fn();
    renderWithRouter(routeMeals);
    const buttons = screen.getAllByRole('img');
    expect(buttons).toHaveLength(2);
    expect(buttons[1]).toHaveProperty('src', whiteHeartMeals);
    userEvent.click(buttons[1]);
    expect(localStorage.setItem).toHaveBeenCalled();
    expect(buttons[1]).toHaveProperty('src', 'http://localhost/meals/blackHeartIcon.svg');
    userEvent.click(buttons[1]);
    expect(localStorage.setItem).toHaveBeenCalled();
    expect(buttons[1]).toHaveProperty('src', whiteHeartMeals);
  });
  it('4- The buttons are in the "RecipeDetails" component on the drinks route', () => {
    renderWithRouter(routeDrinks);
    expect(screen.getByTestId(btnShare)).toBeInTheDocument();
    expect(screen.getByTestId(btnFavorite)).toBeInTheDocument();
  });
  it('5- The favorite button works correctly', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(oneDrinkId15997),
    });
    const favoriteObj = [{
      alcoholicOrNot: 'Optional alcohol',
      category: 'Ordinary Drink',
      id: '15997',
      image: 'https://www.thecocktaildb.com/images/media/drink/vyxwut1468875960.jpg',
      name: 'GG',
      nationality: '',
      type: 'drink',
    }];
    jest.spyOn(storageLocal, 'getItemByKey');
    const { history } = renderWithRouter(<App />);
    history.push(routeDrinks);
    await waitFor(() => expect(global.fetch).toHaveBeenCalled());
    const buttons = screen.getAllByRole('img');
    expect(buttons).toHaveLength(2);
    expect(buttons[1]).toHaveProperty('src', whiteHeartDrinks);
    userEvent.click(screen.getByTestId(btnFavorite));
    expect(storageLocal.getItemByKey('favoriteRecipes')).toEqual(favoriteObj);
    expect(buttons[1]).toHaveProperty('src', 'http://localhost/drinks/blackHeartIcon.svg');
    userEvent.click(buttons[1]);
    expect(buttons[1]).toHaveProperty('src', whiteHeartDrinks);
  });
  it('6- The favorite button works correctly', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(oneDrinkId15997),
    });
    const favoriteObj = [{
      alcoholicOrNot: 'Optional alcohol',
      category: 'Ordinary Drink',
      id: '15997',
      image: 'https://www.thecocktaildb.com/images/media/drink/vyxwut1468875960.jpg',
      name: 'GG',
      nationality: '',
      type: 'drink',
    }];
    jest.spyOn(storageLocal, 'getItemByKey');
    jest.spyOn(storageLocal, 'setlocalstorage');
    storageLocal.setlocalstorage('favoriteRecipes', favoriteObj);
    renderWithRouter(routeDrinks);
    await waitFor(() => expect(global.fetch).toHaveBeenCalled());
    expect(screen.getAllByRole('img')[1]).toHaveProperty('src', 'http://localhost/drinks/blackHeartIcon.svg');
    expect(storageLocal.getItemByKey('favoriteRecipes')).toEqual(favoriteObj);
    userEvent.click(screen.getByTestId('favorite-btn'));
    expect(screen.getAllByRole('img')[1]).toHaveProperty('src', whiteHeartDrinks);
  });
});
