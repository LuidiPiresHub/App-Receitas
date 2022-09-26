import { screen, waitFor } from '@testing-library/react';
import renderWithRouter from './Helpers/renderWithRouter';

describe('Testa a tela de receitas', () => {
  describe('Testa a quantidade de componentes', () => {
    beforeEach(() => {
      renderWithRouter('meals');
    });
    test('Quantidade de cards', async () => {
      await waitFor(() => {
        const firstRecipeCard = screen.getByTestId('0-recipe-card');
        const lastRecipeCard = screen.getByTestId('11-recipe-card');
        expect(firstRecipeCard).toBeInTheDocument();
        expect(lastRecipeCard).toBeInTheDocument();
      });
    });
    test('Quantidade de categorias', async () => {
      await waitFor(() => {
        const categoriesFilters = screen.getByTestId(/...category-filter/);
        expect(categoriesFilters.length).toEqual(5);
      });
    });
  });
});
