import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
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
import '../styles/RecipesDetails.css';

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
  const [carousel, setCarousel] = useState([]);

  const callingFetch = async () => {
    if (pathname.includes('meals')) {
      const resultMeals = await fetchApiMeals(id);
      setReturnFetch(resultMeals);
      const resultDrinks = await fetchAllDrinks();
      setCarousel(
        resultDrinks.drinks.filter((drink, index) => index < DISPLAY_LIMIT),
      );
    } else if (pathname.includes('drinks')) {
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
      <main className="recipeDetailsContainer">
        <Card style={ { border: 'none' } }>
          <Card.Img
            className="cardImage"
            src={ returnFetch[0][`str${foodType}Thumb`] }
            alt={ `${foodType}_img` }
            data-testid="recipe-photo"
          />
          <Card.ImgOverlay className="overlay" style={ { padding: '0' } }>
            <Card.Header
              style={ {
                borderRadius: '0',
                color: '#f6f6f6',
                backgroundColor: '#161616',
              } }
              className="cardHeader"
            >
              {foodType === 'Meal' ? (
                <Card.Text
                  className="recipeCategory"
                  data-testid="recipe-category"
                >
                  {returnFetch[0].strCategory}
                </Card.Text>
              ) : (
                <Card.Text
                  className="recipeCategory"
                  data-testid="recipe-category"
                >
                  {returnFetch[0].strAlcoholic}
                </Card.Text>
              )}
              <Favorite location={ location } returnFetch={ returnFetch } />
            </Card.Header>
            <Card.Title
              data-testid="recipe-title"
              className="cardTitle"
              style={ {
                fontSize: '3rem',
                fontWeight: '800',
                margin: '18% auto',
              } }
            >
              <p>
                {foodType === 'Meal'
                  ? returnFetch[0].strMeal
                  : returnFetch[0].strMeal}
              </p>
            </Card.Title>
          </Card.ImgOverlay>
        </Card>
        <section>
          <hr />
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
          <hr />
          <article data-testid="instructions">
            {returnFetch[0].strInstructions}
          </article>

          <hr />
          {foodType === 'Meal' ? (
            <div style={ { width: '100vw', overflowX: 'hidden' } }>
              <iframe
                title={ `${foodType}-Preparation` }
                width="420"
                height="315"
                allowFullScreen
                data-testid="video"
                src={ returnFetch[0].strYoutube.replace('watch?v=', 'embed/') }
              />
            </div>
          ) : (
            ''
          )}
        </section>

        <hr />
        <section>
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
    <main>
      <section>
        <ProgressSection
          type={ foodType === 'Meal' ? 'meals' : 'drinks' }
          id={ id }
        />
        <Favorite location={ location } returnFetch={ returnFetch } id={ id } />
      </section>
    </main>
  );
}

RecipeDetails.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};
