import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import RecipesAppContext from '../Context/RecipesAppContext';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

const translate = {
  '/meals': 'Meals',
  '/drinks': 'Drinks',
  '/profile': 'Profile',
  '/done-recipes': 'Done Recipes',
  '/favorite-recipes': 'Favorite Recipes',
};

const routes = [
  '/favorite-recipes',
  '/profile',
  '/done-recipes',
];

export default function Header() {
  const { setBool } = useContext(RecipesAppContext);
  const history = useHistory();
  const [boolHeader, setBoolHeader] = useState(false);

  useEffect(() => {
    setBool(boolHeader);
  }, [boolHeader, setBool]);

  const { location: { pathname } } = history;

  const verifyCondition = () => {
    const bools = routes.map((route) => route !== pathname);
    return bools.every((bool) => bool);
  };

  return (
    <div>
      <button
        type="button"
        data-testid="profileBtn"
        onClick={ () => history.push('/profile') }
      >
        <img
          src={ profileIcon }
          alt="userPhoto"
          data-testid="profile-top-btn"
        />
      </button>
      { verifyCondition() && (
        <button type="button" onClick={ () => setBoolHeader(!boolHeader) }>
          <img
            src={ searchIcon }
            alt="searchBar"
            data-testid="search-top-btn"
          />
        </button>
      ) }
      <h1 data-testid="page-title">{translate[pathname]}</h1>
    </div>
  );
}
