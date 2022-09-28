import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import {
  fetchAllDrinks, fetchAllMeals,
  fetchApiDrinks, fetchApiMeals,
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
    if (measures[index][1] !== null
      && ingredients[index][1] !== null
      && measures[index][1] !== ''
      && ingredients[index][1] !== '') {
      newArr.push(`${measures[index][1]} - ${ingredients[index][1]}`);
    }
  });
  return newArr;
};

export default function RecipeDetails({ location: { pathname } }) {
  const route = useParams();
  const [returnFetch, setReturnFetch] = useState([]);
  const [mealsState, setMealsState] = useState([]);
  const [drinkState, setDrinkState] = useState([]);

  useEffect(() => {
    const callingFetch = async () => {
      const { id } = route;
      if (pathname.includes('meals')) {
        const resultMeals = await fetchApiMeals(id);
        setReturnFetch(resultMeals.meals);
        const resultDrinks = await fetchAllDrinks();
        setDrinkState(resultDrinks.drinks
          .filter((drink, index) => index < DISPLAY_LIMIT));
      } else if (pathname.includes('drinks')) {
        const resultDrinks = await fetchApiDrinks(id);
        setReturnFetch(resultDrinks.drinks);
        const resultMeals = await fetchAllMeals();
        setMealsState(resultMeals.meals
          .filter((drink, index) => index < DISPLAY_LIMIT));
      }
    };
    callingFetch();
  }, [pathname]);

  const foodType = whatFood(pathname);
  const drinkCarousel = (
    <Swiper
      slidesPerView={ 2 }
      spaceBetween={ 30 }
      pagination={ {
        clickable: true } }
      modules={ [Pagination] }
      className="mySwiper"
    >
      {mealsState.map((meal, index) => (
        <SwiperSlide key={ index }>
          <p data-testid={ `${index}-recommendation-title` }>{meal.strMeal}</p>
          <img
            src={ meal.strMealThumb }
            alt="food_img"
            width="150px"
            height="150px"
            data-testid={ `${index}-recommendation-card` }
          />
        </SwiperSlide>
      ))}
    </Swiper>);

  const mealCarousel = (
    <Swiper
      slidesPerView={ 2 }
      spaceBetween={ 30 }
      pagination={ { clickable: true } }
      modules={ [Pagination] }
      className="mySwiper"
    >
      {drinkState.map((drink, index) => (
        <SwiperSlide key={ index }>
          <p data-testid={ `${index}-recommendation-title` }>{drink.strDrink}</p>
          <img
            src={ drink.strDrinkThumb }
            alt="food_img"
            width="150px"
            height="150px"
            data-testid={ `${index}-recommendation-card` }
          />
        </SwiperSlide>
      ))}
    </Swiper>);

  if (returnFetch.length > 0 && (drinkState.length > 0 || mealsState.length > 0)) {
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
        <section>
          { foodType === 'Meal' ? mealCarousel : drinkCarousel}
        </section>
      </main>
    );
  }
  return (
    <div />
  );
}

RecipeDetails.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};
