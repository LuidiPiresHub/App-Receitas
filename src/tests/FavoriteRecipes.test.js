import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './Helpers/renderWithRouter';

const storageLocal = require('../Services/storageLocal');

const routeFavoriteRecipes = '/favorite-recipes';
const btnAll = 'filter-by-meal-btn';
const btnMeals = 'filter-by-meal-btn';
const btnDrinks = 'filter-by-drink-btn';
const firstName = '0-horizontal-name';
const firstBtnFavorite = '0-horizontal-favorite-btn';
const mealName = 'Apam balik';

const mock = [{
  id: '53049',
  type: 'meal',
  nationality: 'Malaysian',
  category: 'Dessert',
  alcoholicOrNot: '',
  name: mealName,
  image: 'https://www.themealdb.com/images/media/meals/adxcbq1619787919.jpg',
},
{
  id: '17225',
  type: 'drink',
  nationality: '',
  category: 'Cocktail',
  alcoholicOrNot: 'Alcoholic',
  name: 'Ace',
  image: 'https://www.thecocktaildb.com/images/media/drink/l3cd7f1504818306.jpg',
}];

afterEach(() => {
  jest.clearAllMocks();
});

describe('Testing the component "FavoriteRecipes"', () => {
  it('1- Checks if all elements are on screen', () => {
    renderWithRouter(routeFavoriteRecipes);
    expect(screen.getByTestId('profileBtn')).toBeInTheDocument();
    expect(screen.getByTestId('page-title')).toBeInTheDocument();
    expect(screen.getByTestId(btnAll)).toBeInTheDocument();
    expect(screen.getByTestId(btnMeals)).toBeInTheDocument();
    expect(screen.getByTestId(btnDrinks)).toBeInTheDocument();
  });
  it('2- Checks if favorite recipe elements are on screen', () => {
    storageLocal.getItemByKey = jest.fn().mockReturnValue(mock);
    renderWithRouter(routeFavoriteRecipes);
    expect(screen.getByTestId('0-horizontal-image')).toBeInTheDocument();
    expect(screen.getByTestId(firstName)).toBeInTheDocument();
    expect(screen.getByTestId('0-horizontal-top-text')).toBeInTheDocument();
    expect(screen.getByTestId('0-horizontal-share-btn')).toBeInTheDocument();
    expect(screen.getByTestId(firstBtnFavorite)).toBeInTheDocument();
    expect(screen.getByTestId('1-horizontal-image')).toBeInTheDocument();
    expect(screen.getByTestId('1-horizontal-name')).toBeInTheDocument();
    expect(screen.getByTestId('1-horizontal-top-text')).toBeInTheDocument();
    expect(screen.getByTestId('1-horizontal-share-btn')).toBeInTheDocument();
    expect(screen.getByTestId('1-horizontal-favorite-btn')).toBeInTheDocument();
  });
  it('3- Checks if the "Filter Meals" button work correctly', () => {
    storageLocal.getItemByKey = jest.fn().mockReturnValue(mock);
    renderWithRouter(routeFavoriteRecipes);
    const nameDrink = screen.getByText('Ace');
    const nameMeals = screen.getByText(mealName);
    expect(nameDrink).toBeInTheDocument();
    expect(nameMeals).toBeInTheDocument();
    userEvent.click(screen.getByRole('button', { name: 'Filter Meals' }));
    expect(nameDrink).not.toBeInTheDocument();
    expect(nameMeals).toBeInTheDocument();
    userEvent.click(screen.getByTestId(firstBtnFavorite));
    expect(nameMeals).not.toBeInTheDocument();
  });
  it('4- Checks if the "Filter Drinks" and "All" buttons work correctly', () => {
    storageLocal.getItemByKey = jest.fn().mockReturnValue(mock);
    renderWithRouter(routeFavoriteRecipes);
    const meal = screen.getByTestId('1-horizontal-name');
    const drink = screen.getByTestId(firstName);
    expect(screen.getByText('Ace')).toBeInTheDocument();
    expect(screen.getByText(mealName)).toBeInTheDocument();
    userEvent.click(screen.getByRole('button', { name: 'Filter Drinks' }));
    expect(drink).toBeInTheDocument();
    expect(meal).not.toBeInTheDocument();
    userEvent.click(screen.getByTestId(firstBtnFavorite));
    expect(drink).not.toBeInTheDocument();
    userEvent.click(screen.getByRole('button', { name: 'All' }));
    expect(screen.getByTestId(firstName)).toBeInTheDocument();
  });
});

describe('Testing the component "FavoriteRecipes"', () => {
  it('5- Checks if the "Share" button work correctly', () => {
    window.document.execCommand = jest.fn().mockImplementation(() => 'copied');
    storageLocal.getItemByKey = jest.fn().mockReturnValue(mock);
    renderWithRouter(routeFavoriteRecipes);
    userEvent.click(screen.getByTestId('0-horizontal-share-btn'));
    expect(screen.getByText('Link copied!')).toBeInTheDocument();
  });
  it('6- Checks if the "Favorite" button work correctly', () => {
    storageLocal.getItemByKey = jest.fn().mockReturnValue(mock);
    renderWithRouter(routeFavoriteRecipes);
    const btnFavorite = screen.getByTestId('1-horizontal-favorite-btn');
    userEvent.click(screen.getByTestId(firstBtnFavorite));
    expect(btnFavorite).not.toBeInTheDocument();
  });
});
