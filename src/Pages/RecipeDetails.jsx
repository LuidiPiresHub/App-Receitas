import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Carousel from '../Components/Carousel';
import Favorite from '../Components/Favorite';
import ProgressSection from '../Components/ProgressSection';
import {
  fetchAllDrinks,
  fetchAllMeals,
  fetchApiDrinks,
  fetchApiMeals,
} from '../Services/api';

import './style.css';

const DISPLAY_LIMIT = 6;

const whatFood = (urlPath) => {
  if (urlPath.includes('meals')) {
    return 'Meal';
  }
  return 'Drink';
};

const getIngredientsAndMeasures = (object) => {
  const entries = Object.entries(object[0]);
  const newArr = [];
  const measures = entries.filter((entry) => entry[0].includes('strMeasure'));
  const ingredients = entries.filter((entry) => entry[0].includes('strIngredient'));
  measures.forEach((measure, index) => {
    if (
      measures[index][1] !== null
      && ingredients[index][1] !== null
      && measures[index][1] !== ''
      && ingredients[index][1] !== ''
    ) {
      newArr.push(`${measures[index][1]} - ${ingredients[index][1]}`);
    }
  });
  return newArr;
};

export default function RecipeDetails({ location: { pathname }, location }) {
  const { id } = useParams();
  const [returnFetch, setReturnFetch] = useState([]);
  const [type, setType] = useState('');
  const [carousel, setCarousel] = useState([]);

  const callingFetch = async () => {
    if (pathname.includes('meals')) {
      setType('meals');
      const resultMeals = await fetchApiMeals(id);
      setReturnFetch(resultMeals);
      const resultDrinks = await fetchAllDrinks();
      setCarousel(
        resultDrinks.drinks.filter((drink, index) => index < DISPLAY_LIMIT),
      );
    } else if (pathname.includes('drinks')) {
      setType('drinks');
      const resultDrinks = await fetchApiDrinks(id);
      setReturnFetch(resultDrinks);
      const resultMeals = await fetchAllMeals();
      setCarousel(
        resultMeals.meals.filter((drink, index) => index < DISPLAY_LIMIT),
      );
    }
  };
  useEffect(() => {
    callingFetch();
  }, [pathname]);

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
          {foodType === 'Meal' ? (
            <h3 data-testid="recipe-category">{returnFetch[0].strCategory}</h3>
          ) : (
            <h3 data-testid="recipe-category">{returnFetch[0].strAlcoholic}</h3>
          )}
          <ul>
            {ingredientsMeasures.map((ingredient, index) => (
              <li
                key={ `${ingredient}-${index}` }
                data-testid={ `${index}-ingredient-name-and-measure` }
              >
                {ingredient}
              </li>
            ))}
          </ul>
          <p data-testid="instructions">{returnFetch[0].strInstructions}</p>
          {foodType === 'Meal' ? (
            <iframe
              title={ `${foodType}-Preparation` }
              width="420"
              height="315"
              allowFullScreen
              data-testid="video"
              src={ returnFetch[0].strYoutube.replace('watch?v=', 'embed/') }
            />
          ) : (
            ''
          )}
        </section>
        <section style={ { width: '100vw', overflowX: 'hidden' } }>
          <Favorite location={ location } returnFetch={ returnFetch } />
          <Carousel carousel={ carousel } />
          <ProgressSection
            type={ foodType === 'Meal' ? 'meals' : 'drinks' }
            id={ id }
          />
        </section>
      </main>
    );
  }
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
