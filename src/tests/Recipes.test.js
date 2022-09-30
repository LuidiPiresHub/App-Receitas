import userEvent from '@testing-library/user-event';
import App from '../App';
import oneMeal from '../../cypress/mocks/oneMeal';

const { waitFor, screen } = require('@testing-library/react');
const storageLocal = require('../Services/storageLocal');
const { default: renderWithRouter } = require('./Helpers/renderWithRouter');

describe('Testes da implementação da HomePage', () => {
  test('Quantidade de items está correta', async () => {
    renderWithRouter('/meals');
    await waitFor(() => {
      expect(screen.getByTestId('11-recipe-card')).toBeInTheDocument();
      expect(screen.getByTestId('All-category-filter')).toBeInTheDocument();
      expect(screen.getAllByRole('button')).toHaveLength(10);
    });
  });
  it('6-', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(oneMeal),
    });
    const favoriteObj = [{
      id: '52771', type: 'meal', nationality: 'Italian', category: 'Vegetarian', alcoholicOrNot: '', name: 'Spicy Arrabiata Penne', image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg' }];
    jest.spyOn(storageLocal, 'getItemByKey');
    const { history } = renderWithRouter(<App />);
    history.push('/meals/52771');
    await waitFor(() => expect(global.fetch).toHaveBeenCalled());
    userEvent.click(screen.getByTestId('favorite-btn'));
    const storage = storageLocal.getItemByKey('favoriteRecipes');
    expect(storageLocal.getItemByKey('favoriteRecipes')).toEqual(favoriteObj);

    expect(storage[0].id).toBe('52771');

    userEvent.click(screen.getByTestId('favorite-btn'));

    expect(storageLocal.getItemByKey('favoriteRecipes')).toEqual([]);
  });
});
