import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './Helpers/renderWithRouter';
// import mealsMock from './Mocks/mealsMock';

const btnShare = 'share-btn';
const btnFavorite = 'favorite-btn';
const routeMeals = '/meals/52977';
const routeDrinks = '/drinks/15997';
const whiteHeartMeals = 'http://localhost/meals/whiteHeartIcon.svg';
const whiteHeartDrinks = 'http://localhost/drinks/whiteHeartIcon.svg';

describe('Testing the component "Favorite"', () => {
  beforeEach(() => {
    navigator.clipboard = {
      writeText: jest.fn(),
    };
  });
  it('1- The buttons are in the "RecipeDetails" component on the meals route', () => {
    const { history } = renderWithRouter(<App />);
    history.push(routeMeals);
    expect(screen.getByTestId(btnShare)).toBeInTheDocument();
    expect(screen.getByTestId(btnFavorite)).toBeInTheDocument();
  });
  it('2- The share button works correctly', () => {
    const { history } = renderWithRouter(<App />);
    history.push(routeMeals);
    userEvent.click(screen.getByTestId(btnShare));
    expect(navigator.clipboard.writeText).toHaveBeenCalledTimes(1);
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('http://localhost/meals/52977');
    expect(screen.getByText('Link copied!')).toBeInTheDocument();
  });
  it('3- The favorite button works correctly', () => {
    jest.spyOn(Storage.prototype, 'setItem');
    Storage.prototype.setItem = jest.fn();
    const { history } = renderWithRouter(<App />);
    history.push(routeMeals);
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
    const { history } = renderWithRouter(<App />);
    history.push(routeDrinks);
    expect(screen.getByTestId(btnShare)).toBeInTheDocument();
    expect(screen.getByTestId(btnFavorite)).toBeInTheDocument();
  });
  it('5- The favorite button works correctly', () => {
    jest.spyOn(Storage.prototype, 'setItem');
    Storage.prototype.setItem = jest.fn();
    const { history } = renderWithRouter(<App />);
    history.push(routeDrinks);
    const buttons = screen.getAllByRole('img');

    expect(buttons).toHaveLength(2);
    expect(buttons[1]).toHaveProperty('src', whiteHeartDrinks);
    userEvent.click(buttons[1]);
    expect(localStorage.setItem).toHaveBeenCalled();
    expect(buttons[1]).toHaveProperty('src', 'http://localhost/drinks/blackHeartIcon.svg');
    userEvent.click(buttons[1]);
    expect(localStorage.setItem).toHaveBeenCalled();
    expect(buttons[1]).toHaveProperty('src', whiteHeartDrinks);
  });
  // it('6-', () => {
  //   const favoriteObj = {
  //     alcoholicOrNot: '',
  //     category: 'Side',
  //     id: '53060',
  //     image: 'https://www.themealdb.com/images/media/meals/tkxquw1628771028.jpg',
  //     name: 'Burek',
  //     nationality: 'Croatian',
  //     type: 'meal',
  //   };
  //   jest.spyOn(localStorage, 'getItem');
  //   global.getItem = jest.fn(favoriteObj);
  //   const { history } = renderWithRouter(<App />);
  //   history.push('/meals/53060');
  //   expect(screen.getByTestId(btnFavorite)).toBeInTheDocument();
  // });
});
