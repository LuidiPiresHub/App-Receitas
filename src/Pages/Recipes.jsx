import React, { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import Header from '../Components/Header';
import SearchBar from '../Components/SearchBar';
import Footer from '../Components/Footer';
import RecipeCard from '../Components/RecipeCard';
import CategoriesSelector from '../Components/CategoriesSelector';
import RecipesAppContext from '../Context/RecipesAppContext';

const containerStyles = {
  display: 'flex',
  flexWrap: 'wrap',
  margin: '10px',
  gap: '15px',
  justifyContent: 'center',
};

export default function Recipes({ location: { pathname } }) {
  const [initialRecipes, setInitialRecipes] = useState([]);
  const [filter, setFilter] = useState('All');
  const { arrayCardRecipes, setArrayCardRecipes } = useContext(RecipesAppContext);

  useEffect(() => {
    const fetchRecipesByType = async (typeOfRequest) => {
      if (typeOfRequest === '/meals') {
        const response = await fetch(
          'https://www.themealdb.com/api/json/v1/1/search.php?s=',
        ).then((res) => res.json());
        response.meals.length = 12;
        setArrayCardRecipes(response.meals);
        setInitialRecipes(response.meals);
      } else if (typeOfRequest === '/drinks') {
        const response = await fetch(
          'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=',
        ).then((res) => res.json());
        response.drinks.length = 12;
        setArrayCardRecipes(response.drinks);
        setInitialRecipes(response.drinks);
      }
    };
    fetchRecipesByType(pathname);
  }, [pathname]);

  useEffect(() => {
    const showRecipesByCategory = async (typeOfRequest) => {
      if (filter === 'All') {
        setArrayCardRecipes(initialRecipes);
      } else if (filter !== 'All' && typeOfRequest === '/meals') {
        const response = await fetch(
          `https://www.themealdb.com/api/json/v1/1/filter.php?c=${filter}`,
        ).then((res) => res.json());
        response.meals.length = 12;
        setArrayCardRecipes(response.meals);
      } else if (filter !== 'All' && typeOfRequest === '/drinks') {
        const response = await fetch(
          `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${filter}`,
        ).then((res) => res.json());
        response.drinks.length = 12;
        setArrayCardRecipes(response.drinks);
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
      <Header />
      <SearchBar />
      <CategoriesSelector
        setFilter={ setFilter }
        toggleFilter={ toggleFilter }
        pathname={ pathname }
      />
      <section style={ containerStyles }>
        {arrayCardRecipes.length > 0
          && arrayCardRecipes.map((recipe, i) => (
            <RecipeCard
              key={ i }
              id={ pathname === '/meals' ? recipe.idMeal : recipe.idDrink }
              index={ i }
              recipe={ recipe }
              type={ pathname === '/meals' ? 'meals' : 'drinks' }
            />
          ))}
      </section>
      <Footer />
    </>
  );
}

Recipes.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};
