import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Favorite from '../Components/Favorite';
import ProgressSection from '../Components/ProgressSection';
import {
  fetchAllDrinks,
  fetchAllMeals,
  fetchApiDrinks,
  fetchApiMeals,
} from '../Services/api';

import './styles/style.css';

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

  return (
    <section>
      <ProgressSection recipeObj={ returnFetch[0] } type={ type } id={ id } />
      <Favorite location={ location } returnFetch={ returnFetch } id={ id } />
    </section>
  );
}

RecipeDetails.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};
