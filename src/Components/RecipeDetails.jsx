import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { fetchApiMeals, fetchApiDrinks } from '../Services/api';
import ProgressSection from './ProgressSection';
import Favorite from './Favorite';

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
      <Favorite location={ location } returnFetch={ returnFetch } />
    </section>
  );
}

RecipeDetails.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};
