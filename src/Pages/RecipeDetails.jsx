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
