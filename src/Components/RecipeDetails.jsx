import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { fetchApiMeals, fetchApiDrinks } from '../Services/api';

export default function RecipeDetails({ location: { pathname } }) {
  const route = useParams();
  const [returnFetch, setReturnFetch] = useState([]);

  useEffect(() => {
    const callingFetch = async () => {
      const { id } = route;
      if (pathname.includes('meals')) {
        const resultMeals = await fetchApiMeals(id);
        setReturnFetch(resultMeals);
      } else if (pathname.includes('drinks')) {
        const resultDrinks = await fetchApiDrinks(id);
        setReturnFetch(resultDrinks);
      }
    };
    console.log(returnFetch);
    callingFetch();
  }, [pathname]);

  return (
    <div>Details</div>
  );
}

RecipeDetails.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};
