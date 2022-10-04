import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useEffect, useState } from 'react';
import { ButtonGroup, Container } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { faUtensils } from '@fortawesome/free-solid-svg-icons';
import {
  faGlassMartiniAlt,
  faPlateUtensils,
  faUser,
} from '@fortawesome/sharp-solid-svg-icons';
import { faSearch } from '@fortawesome/fontawesome-free-solid';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
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
        <Link to="/meals" style={ { textDecoration: 'none', color: '#f6f6f6' } }>
          <h4>
            Recipes App
            <FontAwesomeIcon
              icon={ faPlateUtensils }
              alt="searchBar"
            />
          </h4>
        </Link>
        <ButtonGroup>
          {verifyCondition() && (
            <button
              variant="danger"
              type="button"
              onClick={ () => setBoolHeader(!boolHeader) }
            >
              <FontAwesomeIcon
                icon={ faSearch }
                src={ searchIcon }
                data-testid="search-top-btn"
                alt="searchBar"
              />
            </button>
          )}
          <button
            variant="danger"
            type="button"
            data-testid="profileBtn"
            onClick={ () => history.push('/profile') }
          >
            <FontAwesomeIcon
              src={ profileIcon }
              data-testid="profile-top-btn"
              icon={ faUser }
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
            alt="searchBar"
          />
        </h1>
      </div>
    </Container>
  );
}
