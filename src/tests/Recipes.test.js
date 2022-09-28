import userEvent from '@testing-library/user-event';
import mockApiResponse from './Helpers/mockApiResponse';

const { waitFor, screen } = require('@testing-library/react');
const { default: renderWithRouter } = require('./Helpers/renderWithRouter');

// Jeito certo de mockar o fetch com .then() no código:
// https://stackoverflow.com/questions/62405645/how-to-mock-fetch-when-testing-a-react-app

jest.setTimeout(10000);

beforeEach(() => {
  jest.spyOn(global, 'fetch').mockResolvedValue({
    json: jest.fn().mockResolvedValue(mockApiResponse),
  });
});

afterEach(() => {
  jest.restoreAllMocks();
});

describe('Testes da implementação da HomePage', () => {
  test('Quantidade de items está correta', async () => {
    renderWithRouter('/meals');
    await waitFor(() => {
      expect(screen.getByTestId('0-recipe-card')).toBeInTheDocument();
      expect(screen.getByTestId('1-recipe-card')).toBeInTheDocument();
      expect(screen.getByTestId('2-recipe-card')).toBeInTheDocument();
      expect(screen.getByTestId('All-category-filter')).toBeInTheDocument();
    }, { timeout: 8000 });
  });
  test('As requisições certas são feitas na tela de comidas', async () => {
    renderWithRouter('/meals');
    expect(fetch).toHaveBeenCalledTimes(2);
    expect(fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    expect(fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
    await waitFor(() => {
      expect(screen.getByTestId('Iguaria-category-filter')).toBeInTheDocument();
    });
  });
  test('As requisições certas são feitas na tela de bebidas', async () => {
    renderWithRouter('/drinks');
    expect(fetch).toHaveBeenCalledTimes(2);
    expect(fetch).toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
    expect(fetch).toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
    await waitFor(() => {
      expect(screen.getByTestId('Natural-category-filter')).toBeInTheDocument();
    });
  });
  test('Clicando numa categoria de bebidas', async () => {
    renderWithRouter('/drinks');
    await waitFor(() => {
      const categoryBtn = screen.getByTestId('Natural-category-filter');
      userEvent.click(categoryBtn);
    });
    expect(fetch).toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Natural');
  });
  test('Clicando numa categoria de comidas', async () => {
    renderWithRouter('/meals');
    await waitFor(() => {
      const categoryBtn = screen.getByTestId('Iguaria-category-filter');
      userEvent.click(categoryBtn);
    });
    expect(fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/filter.php?c=Iguaria');
  });
  test('Clicando no botão all categories', () => {
    renderWithRouter('/meals');
    const categoryBtn = screen.getByTestId('All-category-filter');
    userEvent.click(categoryBtn);
    expect(fetch).not.toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/filter.php?c=All');
  });
});
