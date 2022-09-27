import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

const copy = require('clipboard-copy');

function Favorite({ location, returnFetch }) {
  const [copyLink, setCopyLink] = useState(false);
  const [markedFavorite, setMarkedFavorite] = useState(false);
  const [details, setDetails] = useState([]);

  useEffect(() => {
    const getStorage = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    const test = getStorage.some((item) => item.id === details.id);
    if (test) {
      setMarkedFavorite(true);
    }
  }, [details]);

  const onClickShare = () => {
    copy(location.href);
    setCopyLink(true);
    console.log(returnFetch);
  };

  const checkCategory = () => {
    const { pathname } = location;
    if (pathname.includes('meals') && returnFetch.length !== 0) {
      const {
        idMeal: id,
        strArea: nationality,
        strCategory: category,
        strMeal: name,
        strMealThumb: image,
      } = returnFetch[0];
      const favoriteRecipes = { id,
        type: 'meal',
        nationality,
        category,
        alcoholicOrNot: '',
        name,
        image };
      setDetails(favoriteRecipes);
    }
    if (pathname.includes('drinks') && returnFetch.length !== 0) {
      const {
        idDrink: id,
        strCategory: category,
        strAlcoholic: alcoholicOrNot,
        strDrink: name,
        strDrinkThumb: image,
      } = returnFetch[0];
      const favoriteRecipes = { id,
        type: 'drink',
        nationality: '',
        category,
        alcoholicOrNot,
        name,
        image };
      setDetails(favoriteRecipes);
    }
  };

  useEffect(() => {
    checkCategory();
  }, [returnFetch]);

  const onClickFavorite = () => {
    if (markedFavorite === false) {
      setMarkedFavorite(true);
    } else {
      setMarkedFavorite(false);
    }
    if (!markedFavorite) {
      const getStorage = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
      const union = [...getStorage, details];
      localStorage.setItem('favoriteRecipes', JSON.stringify(union));
    } else {
      const getStorage = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
      const filterFav = getStorage.filter((obj) => obj.id !== details.id);
      localStorage.setItem('favoriteRecipes', JSON.stringify(filterFav));
    }
  };

  return (
    <section>
      <button
        type="button"
        data-testid="share-btn"
        onClick={ onClickShare }
      >
        <img src={ shareIcon } alt="" />
      </button>
      <button
        type="button"
        data-testid="favorite-btn"
        onClick={ onClickFavorite }
        src={ markedFavorite ? blackHeartIcon : whiteHeartIcon }
      >
        <img
          src={ markedFavorite ? blackHeartIcon : whiteHeartIcon }
          alt=""
        />
      </button>

      { copyLink && <p>Link copied!</p>}

    </section>
  );
}

Favorite.propTypes = {
  location: PropTypes.shape({
    href: PropTypes.string.isRequired,
    pathname: PropTypes.string.isRequired,
  }).isRequired,
  returnFetch: PropTypes.arrayOf(Object).isRequired,
};

export default Favorite;
