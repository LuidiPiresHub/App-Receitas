import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHeart,
  faHeartCircleCheck,
  faShareAlt,
} from '@fortawesome/free-solid-svg-icons';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import { getItemByKey } from '../Services/storageLocal';

const copy = require('clipboard-copy');

function Favorite({ location, returnFetch }) {
  const { id } = useParams();
  const [copyLink, setCopyLink] = useState(false);
  const [markedFavorite, setMarkedFavorite] = useState(false);
  const [details, setDetails] = useState([]);

  useEffect(() => {
    const getStorage = getItemByKey('favoriteRecipes');
    const confirmIfFavorite = getStorage.some((item) => item.id === id);
    setMarkedFavorite(confirmIfFavorite);
  }, [id]);

  const onClickShare = () => {
    copy(window.location.href.replace('/in-progress', ''));
    setCopyLink(true);
  };

  const checkCategory = () => {
    const { pathname } = location;
    if (returnFetch.length !== 0) {
      const favoriteRecipes = {
        id: returnFetch[0]?.idMeal || returnFetch[0]?.idDrink,
        type: pathname.includes('meals') ? 'meal' : 'drink',
        nationality: returnFetch[0]?.strArea || '',
        category: returnFetch[0]?.strCategory,
        alcoholicOrNot: returnFetch[0]?.strAlcoholic || '',
        name: returnFetch[0]?.strMeal || returnFetch[0]?.strDrink,
        image: returnFetch[0]?.strMealThumb || returnFetch[0]?.strDrinkThumb,
      };
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
      const getStorage = getItemByKey('favoriteRecipes');
      const union = [...getStorage, details];
      localStorage.setItem('favoriteRecipes', JSON.stringify(union));
    } else {
      const getStorage = getItemByKey('favoriteRecipes');
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
        src={ shareIcon }
      >
        <FontAwesomeIcon
          style={ { color: copyLink ? '#d01919' : '#f6f6f6' } }
          icon={ faShareAlt }
          alt=""
        />
      </button>
      <button
        type="button"
        data-testid="favorite-btn"
        onClick={ onClickFavorite }
        src={ markedFavorite ? blackHeartIcon : whiteHeartIcon }
      >
        <FontAwesomeIcon
          icon={ markedFavorite ? faHeartCircleCheck : faHeart }
          style={ { color: markedFavorite ? '#d01919' : '#f6f6f6' } }
          alt=""
        />
      </button>

      { copyLink && <p>Link copied!</p>}

    </section>
  );
}

Favorite.propTypes = {
  location: PropTypes.shape({
    href: PropTypes.string,
    pathname: PropTypes.string.isRequired,
  }).isRequired,
  returnFetch: PropTypes.arrayOf(Object).isRequired,
};

export default Favorite;
