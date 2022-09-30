import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useEffect, useState } from 'react';
import { ButtonGroup, Container } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { faUser, faUtensils } from '@fortawesome/free-solid-svg-icons';
import { faGlassMartiniAlt, faPlateUtensils } from '@fortawesome/sharp-solid-svg-icons';
import { faSearch } from '@fortawesome/fontawesome-free-solid';
import RecipesAppContext from '../Context/RecipesAppContext';
import '../styles/Header.css';

const translate = {
  '/meals': 'Meals',
  '/drinks': 'Drinks',
  '/profile': 'Profile',
  '/done-recipes': 'Done Recipes',
  '/favorite-recipes': 'Favorite Recipes',
};

const routes = ['/favorite-recipes', '/profile', '/done-recipes'];

export default function Header() {
  const { setBool } = useContext(RecipesAppContext);
  const history = useHistory();
  const [boolHeader, setBoolHeader] = useState(false);

  useEffect(() => {
    setBool(boolHeader);
  }, [boolHeader, setBool]);

  const {
    location: { pathname },
  } = history;

  const verifyCondition = () => {
    const bools = routes.map((route) => route !== pathname);
    return bools.every((bool) => bool);
  };

  return (
    <Container className="headerStyles" style={ { padding: 0 } }>
      <div className="buttonsContainer">
        <h4>
          Recipes App
          <FontAwesomeIcon
            icon={ faPlateUtensils }
            data-testid="search-top-btn"
            alt="searchBar"
          />
        </h4>
        <ButtonGroup>
          {verifyCondition() && (
            <button
            // style={ { borderRadius: '0 0 0 10px' } }
              variant="danger"
              type="button"
              onClick={ () => setBoolHeader(!boolHeader) }
            >
              <FontAwesomeIcon
                icon={ faSearch }
                data-testid="search-top-btn"
                alt="searchBar"
              />
            </button>
          )}
          <button
          // style={ { borderRadius: '0 0 10px' } }
            variant="danger"
            type="button"
            data-testid="profileBtn"
            onClick={ () => history.push('/profile') }
          >
            <FontAwesomeIcon
              icon={ faUser }
              data-testid="profile-top-btn"
              alt="userPhoto"
            />
          </button>
        </ButtonGroup>
      </div>
      <div className="pageTitleContainer">
        <h1 data-testid="page-title">
          {translate[pathname]}
          <FontAwesomeIcon
            icon={ pathname.includes('meals') ? faUtensils : faGlassMartiniAlt }
            data-testid="search-top-btn"
            alt="searchBar"
          />
        </h1>
      </div>
    </Container>
  );
}
