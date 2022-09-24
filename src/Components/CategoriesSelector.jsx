import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

const containerStyles = {
  display: 'flex',
  flexWrap: 'wrap',
  margin: '5px',
  gap: '2px',
  justifyContent: 'center',
};

export default function CategoriesSelector({ pathname, toggleFilter }) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategoriesByType = async (typeOfRequest) => {
      if (typeOfRequest === '/meals') {
        const response = await fetch(
          'https://www.themealdb.com/api/json/v1/1/list.php?c=list',
        ).then((res) => res.json());
        response.meals.length = 5;
        setCategories(response.meals);
      } else if (typeOfRequest === '/drinks') {
        const response = await fetch(
          'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list',
        ).then((res) => res.json());
        response.drinks.length = 5;
        setCategories(response.drinks);
      }
    };
    fetchCategoriesByType(pathname);
  }, [pathname]);

  return (
    <div style={ containerStyles }>
      <Button
        data-testid="All-category-filter"
        onClick={ () => setFilter('All') }
      >
        All
      </Button>
      {categories.map((categorie, i) => (
        <Button
          key={ i }
          data-testid={ `${categorie.strCategory}-category-filter` }
          onClick={ () => toggleFilter(categorie.strCategory) }
        >
          {categorie.strCategory}
        </Button>
      ))}
    </div>
  );
}

CategoriesSelector.propTypes = {
  pathname: PropTypes.string.isRequired,
  toggleFilter: PropTypes.func.isRequired,
};
