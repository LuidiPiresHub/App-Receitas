import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Header from '../Components/Header';
import { getItemByKey } from '../Services/storageLocal';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

const copy = require('clipboard-copy');

export default function FavoriteRecipes(/* { location } */) {
  const [favorites, setFavorites] = useState([]);
  const [copyLink, setCopyLink] = useState(false);

  useEffect(() => {
    const getStorage = getItemByKey('favoriteRecipes');
    if (getStorage.lengh !== 0) {
      setFavorites(getStorage);
      console.log(favorites);
    }
  }, []);

  const onClickShare = () => {
    copy(window.location.href);
    setCopyLink(true);
  };

  return (
    <div>
      <Header />
      <section>
        <button
          type="button"
          data-testid="filter-by-all-btn"
        >
          All
        </button>
        <button
          type="button"
          data-testid="filter-by-meal-btn"
        >
          Filter Meals
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
        >
          Filter Drinks
        </button>
      </section>
      <section>
        {
          favorites.length > 0 && favorites.map((item, i) => {
            if (item.type === 'meal') {
              return (
                <div key={ i }>
                  <img
                    src={ item.image }
                    alt=""
                    data-testid={ `${i}-horizontal-image` }
                  />
                  <h5 data-testid={ `${i}-horizontal-name` }>{ item.name }</h5>
                  <p data-testid={ `${i}-horizontal-top-text` }>
                    { `'${item.nationality} - ${item.category}'` }
                  </p>
                  <button
                    type="button"
                    data-testid={ `${i}-horizontal-share-btn` }
                    src={ shareIcon }
                    onClick={ onClickShare }
                  >
                    <img src={ shareIcon } alt="" />
                  </button>
                  <button
                    type="button"
                    data-testid={ `${i}-horizontal-favorite-btn` }
                    src={ blackHeartIcon }
                  >
                    <img src={ blackHeartIcon } alt="" />
                  </button>
                </div>
              );
            }
            return (
              <div key={ i }>
                <img
                  src={ item.image }
                  alt=""
                  data-testid={ `${i}-horizontal-image` }
                />
                <h5 data-testid={ `${i}-horizontal-name` }>{ item.name }</h5>
                <p data-testid={ `${i}-horizontal-top-text` }>
                  { item.alcoholicOrNot }
                </p>
                <button
                  type="button"
                  data-testid={ `${i}-horizontal-share-btn` }
                  src={ shareIcon }
                  onClick={ onClickShare }
                >
                  <img src={ shareIcon } alt="" />
                </button>
                <button
                  type="button"
                  data-testid={ `${i}-horizontal-favorite-btn` }
                  src={ blackHeartIcon }
                >
                  <img src={ blackHeartIcon } alt="" />
                </button>
              </div>
            );
          })
        }

        <div>{ copyLink && <p>Link copied!</p>}</div>
      </section>
    </div>
  );
}

FavoriteRecipes.propTypes = {
  location: PropTypes.shape({ String }).isRequired,
};
