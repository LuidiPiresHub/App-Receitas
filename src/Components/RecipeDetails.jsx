import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { fetchApiMeals, fetchApiDrinks } from '../Services/api';
import ProgressSection from './ProgressSection';

export default function RecipeDetails({ location: { pathname } }) {
  const { id } = useParams();
  const [returnFetch, setReturnFetch] = useState([]);
  const [type, setType] = useState('');

  useEffect(() => {
    const callingFetch = async () => {
      if (pathname.includes('meals')) {
        setType('meals');
        const { meals } = await fetchApiMeals(id);
        setReturnFetch(meals[0]);
      } else if (pathname.includes('drinks')) {
        setType('drinks');
        const { drinks } = await fetchApiDrinks(id);
        setReturnFetch(drinks[0]);
      }
    };
    callingFetch();
  }, []);

  return (
    <>
      <div />
      <ProgressSection recipeObj={ returnFetch } type={ type } id={ id } />
    </>
  );
}

RecipeDetails.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};
