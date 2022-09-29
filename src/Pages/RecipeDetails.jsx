import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Favorite from '../Components/Favorite';
import ProgressSection from '../Components/ProgressSection';
import { fetchApiDrinks, fetchApiMeals } from '../Services/api';

export default function RecipeDetails({ location: { pathname }, location }) {
  const { id } = useParams();
  const [returnFetch, setReturnFetch] = useState([]);
  const [type, setType] = useState('');

  useEffect(() => {
    const callingFetch = async () => {
      if (pathname.includes('meals')) {
        setType('meals');
        const meals = await fetchApiMeals(id);
        setReturnFetch(meals);
      } else if (pathname.includes('drinks')) {
        setType('drinks');
        const drinks = await fetchApiDrinks(id);
        setReturnFetch(drinks);
      }
    };
    callingFetch();
  }, []);

<<<<<<< HEAD
=======
  const foodType = whatFood(pathname);

  if (returnFetch.length > 0 && carousel.length > 0) {
    const ingredientsMeasures = getIngredientsAndMeasures(returnFetch);
    return (
      <main>
        <header>{foodType}</header>
        <section>
          <h1 data-testid="recipe-title">{returnFetch[0][`str${foodType}`]}</h1>
          <img
            src={ returnFetch[0][`str${foodType}Thumb`] }
            alt={ `${foodType}_img` }
            data-testid="recipe-photo"
            width="300px"
            height="300px"
          />
          {foodType === 'Meal'
            ? <h3 data-testid="recipe-category">{returnFetch[0].strCategory}</h3>
            : <h3 data-testid="recipe-category">{returnFetch[0].strAlcoholic}</h3>}
          <ul>
            {ingredientsMeasures.map((ingredient, index) => (
              <li
                key={ `${ingredient}-${index}` }
                data-testid={ `${index}-ingredient-name-and-measure` }
              >
                {ingredient}
              </li>))}
          </ul>
          <p data-testid="instructions">{returnFetch[0].strInstructions}</p>
          { foodType === 'Meal' ? <iframe
            title={ `${foodType}-Preparation` }
            width="420"
            height="315"
            allowFullScreen
            data-testid="video"
            src={ returnFetch[0].strYoutube.replace('watch?v=', 'embed/') }
          /> : '' }
        </section>
        <section style={ { width: '100vw', overflowX: 'hidden' } }>
          <Favorite location={ location } returnFetch={ returnFetch } />
          <Carousel carousel={ carousel } />
          <ProgressSection type={ foodType === 'Meal' ? 'meals' : 'drinks' } id={ id } />
        </section>
      </main>
    );
  }
>>>>>>> 11d3996 (overflow x hidden para o slider e test coverage para Progress Section)
  return (
    <section>
      <Favorite location={ location } returnFetch={ returnFetch } />
      <ProgressSection recipeObj={ returnFetch[0] } type={ type } id={ id } />
    </section>
  );
}

RecipeDetails.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};
