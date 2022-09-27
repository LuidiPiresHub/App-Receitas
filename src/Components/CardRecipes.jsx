import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import RecipesAppContext from '../Context/RecipesAppContext';

export default function CardRecipes() {
  const { arrayCardRecipes } = useContext(RecipesAppContext);
  const history = useHistory();
  const { location: { pathname } } = history;

  const componentRecipe = {
    '/drinks': ['strDrink', 'strDrinkThumb'],
    '/meals': ['strMeal', 'strMealThumb'],
  };

  const RECIPES_NUMBER = 12;

  return (
    <main>
      {arrayCardRecipes.map((card, index) => (
        index < RECIPES_NUMBER && (
          <figure
            key={ index }
            data-testid={ `${index}-recipe-card` }
          >
            <img
              data-testid={ `${index}-card-img` }
              src={ card[componentRecipe[pathname][1]] }
              alt={ card[componentRecipe[pathname][0]] }
            />
            <h1
              data-testid={ `${index}-card-name` }
            >
              {card[componentRecipe[pathname][0]]}
            </h1>
          </figure>
        )
      ))}
    </main>
  );
}
