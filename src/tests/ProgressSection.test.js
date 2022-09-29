const { waitFor, screen } = require('@testing-library/react');
const { default: renderWithRouter } = require('./Helpers/renderWithRouter');

jest.setTimeout(10000);

// beforeEach(() => {
//   jest.spyOn(global, 'fetch').mockResolvedValue({
//     json: jest.fn().mockResolvedValue(mockApiResponse),
//   });
// });

// afterEach(() => {
//   jest.restoreAllMocks();
// });

describe('Testando ProgressSection', () => {
  test('Texto certo no botão em uma receita do tipo meals', async () => {
    renderWithRouter('/meals/52940');
    await waitFor(() => {
      expect(screen.getByTestId('start-recipe-btn')).toHaveTextContent('Start Recipe');
    }, { timeout: 4000 });
  });
  test('Texto certo no botão em uma receita do tipo drinks', async () => {
    renderWithRouter('/drinks/17203');
    await waitFor(() => {
      expect(screen.getByTestId('start-recipe-btn')).toHaveTextContent('Start Recipe');
    }, { timeout: 4000 });
  });
});
