const { waitFor, screen } = require('@testing-library/react');
const { default: renderWithRouter } = require('./Helpers/renderWithRouter');

describe('Testes da implementação da HomePage', () => {
  test('Quantidade de items está correta', async () => {
    renderWithRouter('/meals');
    await waitFor(() => {
      expect(screen.getByTestId('11-recipe-card')).toBeInTheDocument();
      expect(screen.getByTestId('All-category-filter')).toBeInTheDocument();
      expect(screen.getAllByRole('button')).toHaveLength(6);
    });
  });
  // test('Os cards certos estão aparecendo', async () => {
  //   renderWithRouter('/meals');
  //   expect(fetch()).toHaveBeenCalledWith('laaa');
  // });
});
