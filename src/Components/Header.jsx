// DEIXAR O HEADER COMO JS

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

export default function Header() {
  const history = useHistory();
  const [boolHeader, setBoolHeader] = useState(false);
  const { setBool } = useContext(RecipesAppContext);

  useEffect(() => {
    setBool(boolHeader);
  }, [boolHeader]);

  const { location: { pathname } } = history;

  const verifyCondition = () => {
    // ARMAZENEAR AS URLS DENTRO DE UM ARRAY E USAR UM MAP
    // REFATORAÇÃO
    const bools = [];
    bools.push(pathname !== '/favorite-recipes');
    bools.push(pathname !== '/profile');
    bools.push(pathname !== '/done-recipes');
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
