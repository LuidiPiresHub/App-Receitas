import React, { useState, useEffect } from 'react';
// import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Header from '../Components/Header';
// import { getItemByKey } from '../Services/storageLocal';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

const copy = require('clipboard-copy');

export default function FavoriteRecipes() {
  const [initialFavorites, setInitialFavorites] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [copyLink, setCopyLink] = useState(false);
  const [filter, setFilter] = useState();

  useEffect(() => {
    const getStorage = getItemByKey('favoriteRecipes');
    if (getStorage.lengh !== 0) {
      setFavorites(getStorage);
      setInitialFavorites(getStorage);
      setFilter('All');
    }
  }, []);

  useEffect(() => {
    const updateFilter = () => {
      if (filter === 'All') {
        setFavorites(initialFavorites);
      } else {
        const filteredFavorites = initialFavorites.filter((item) => item.type === filter);
        setFavorites(filteredFavorites);
      }
    };
    updateFilter();
  }, [filter]);

  const onClickShare = (type, id) => {
    const split = window.location.href.split('/');
    const url = `${split[0]}//${split[2]}/${type}s/${id}`;
    copy(url);
    setCopyLink(true);
  };

  const unFavorite = (id) => {
    const newFavorites = initialFavorites.filter((item) => item.id !== id);
    localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorites));
    setInitialFavorites(newFavorites);
    if (filter === 'All') {
      setFavorites(newFavorites);
    } else {
      const filteredFavorites = newFavorites.filter((item) => item.type === filter);
      setFavorites(filteredFavorites);
    }
  };

  return (
    <div>
      <Header />
      <section>
        <button
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ () => setFilter('All') }
        >
          All
        </button>
        <button
          type="button"
          data-testid="filter-by-meal-btn"
          onClick={ () => setFilter('meal') }
        >
          Filter Meals
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ () => setFilter('drink') }
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
                  <Link to={ `/${item.type}s/${item.id}` }>
                    <img
                      src={ item.image }
                      alt=""
                      data-testid={ `${i}-horizontal-image` }
                    />
                    <h5 data-testid={ `${i}-horizontal-name` }>{ item.name }</h5>
                    <p data-testid={ `${i}-horizontal-top-text` }>
                      { `'${item.nationality} - ${item.category}'` }
                    </p>
                  </Link>
                  <button
                    type="button"
                    data-testid={ `${i}-horizontal-share-btn` }
                    src={ shareIcon }
                    onClick={ () => onClickShare(item.type, item.id) }
                  >
                    <img src={ shareIcon } alt="" />
                  </button>
                  <button
                    type="button"
                    data-testid={ `${i}-horizontal-favorite-btn` }
                    src={ blackHeartIcon }
                    onClick={ () => unFavorite(item.id) }
                  >
                    <img src={ blackHeartIcon } alt="" />
                  </button>
                </div>
              );
            }
            return (
              <div key={ i }>
                <Link to={ `/${item.type}s/${item.id}` }>
                  <img
                    src={ item.image }
                    alt=""
                    data-testid={ `${i}-horizontal-image` }
                  />
                  <h5 data-testid={ `${i}-horizontal-name` }>{ item.name }</h5>
                  <p data-testid={ `${i}-horizontal-top-text` }>
                    { item.alcoholicOrNot }
                  </p>
                </Link>
                <button
                  type="button"
                  data-testid={ `${i}-horizontal-share-btn` }
                  src={ shareIcon }
                  onClick={ () => onClickShare(item.type, item.id) }
                >
                  <img src={ shareIcon } alt="" />
                </button>
                <button
                  type="button"
                  data-testid={ `${i}-horizontal-favorite-btn` }
                  src={ blackHeartIcon }
                  onClick={ () => unFavorite(item.id) }
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
