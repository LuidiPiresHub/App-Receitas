import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import RecipeCard from '../Components/RecipeCard';
import CategoriesSelector from '../Components/CategoriesSelector';

const containerStyles = {
  display: 'flex',
  flexWrap: 'wrap',
  margin: '10px',
  gap: '15px',
  justifyContent: 'center',
};

export default function Recipes({ location: { pathname } }) {
  const [initialRecipes, setInitialRecipes] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    const fetchRecipesByType = async (typeOfRequest) => {
      if (typeOfRequest === '/meals') {
        const response = await fetch(
          'https://www.themealdb.com/api/json/v1/1/search.php?s=',
        ).then((res) => res.json());
        response.meals.length = 12;
        setRecipes(response.meals);
        setInitialRecipes(response.meals);
      } else if (typeOfRequest === '/drinks') {
        const response = await fetch(
          'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=',
        ).then((res) => res.json());
        response.drinks.length = 12;
        setRecipes(response.drinks);
        setInitialRecipes(response.drinks);
      }
    };
    fetchRecipesByType(pathname);
  }, [pathname]);

  useEffect(() => {
    const showRecipesByCategory = async (typeOfRequest) => {
      if (filter === 'All') {
        setRecipes(initialRecipes);
      } else if (filter !== 'All' && typeOfRequest === '/meals') {
        const response = await fetch(
          `https://www.themealdb.com/api/json/v1/1/filter.php?c=${filter}`,
        ).then((res) => res.json());
        response.meals.length = 12;
        setRecipes(response.meals);
      } else if (filter !== 'All' && typeOfRequest === '/drinks') {
        const response = await fetch(
          `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${filter}`,
        ).then((res) => res.json());
        response.drinks.length = 12;
        setRecipes(response.drinks);
      }
    };
    showRecipesByCategory(pathname);
  }, [filter]);

  const toggleFilter = (filterValue) => {
    if (filterValue === filter) {
      setFilter('All');
    } else {
      setFilter(filterValue);
    }
  };

  return (
    <>
      {/* Header */}
      <CategoriesSelector
        toggleFilter={ toggleFilter }
        pathname={ pathname }
      />
      <section style={ containerStyles }>
        <Link to="meals">Meals</Link>
        <Link to="drinks">Drinks</Link>
        {recipes.length > 0
          && recipes.map((recipe, i) => (
            <RecipeCard
              key={ i }
              id={ pathname === '/meals' ? recipe.idMeal : recipe.idDrink }
              index={ i }
              recipe={ recipe }
              type={ pathname === '/meals' ? 'meals' : 'drinks' }
            />
          ))}
      </section>
    </>
    // Footer
  );
}

Recipes.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};
