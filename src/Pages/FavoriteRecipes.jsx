import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import Header from '../Components/Header';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';
import { getItemByKey } from '../Services/storageLocal';
import '../styles/Favorites.css';

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
      <section className="filter-buttons">
        <Button
          style={ { backgroundColor: '#D01919' } }
          variant="danger"
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ () => setFilter('All') }
        >
          All
        </Button>
        <Button
          style={ { backgroundColor: '#D01919' } }
          type="button"
          variant="danger"
          data-testid="filter-by-meal-btn"
          onClick={ () => setFilter('meal') }
        >
          Filter Meals
        </Button>
        <Button
          style={ { backgroundColor: '#D01919' } }
          type="button"
          variant="danger"
          data-testid="filter-by-drink-btn"
          onClick={ () => setFilter('drink') }
        >
          Filter Drinks
        </Button>
      </section>
      <section className="favorites-section">
        {
          favorites.length > 0 && favorites.map((item, i) => {
            if (item.type === 'meal') {
              return (
                <div key={ i } className="card-section">
                  <Link to={ `/${item.type}s/${item.id}` } className="link-section">
                    <img
                      className="img-food"
                      src={ item.image }
                      alt=""
                      data-testid={ `${i}-horizontal-image` }
                    />
                    <div className="title-sections">
                      <h1
                        data-testid={ `${i}-horizontal-name` }
                      >
                        { item.name }
                      </h1>
                      <h3 data-testid={ `${i}-horizontal-top-text` }>
                        { `'${item.nationality} - ${item.category}'` }
                      </h3>
                    </div>
                  </Link>
                  <div className="social-buttons">
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
                </div>
              );
            }
            return (
              <div key={ i } className="card-section">
                <Link to={ `/${item.type}s/${item.id}` } className="link-section">
                  <img
                    className="img-food"
                    src={ item.image }
                    alt=""
                    data-testid={ `${i}-horizontal-image` }
                  />
                  <div className="title-section">
                    <h1
                      data-testid={ `${i}-horizontal-name` }
                    >
                      { item.name }
                    </h1>
                    <h3 data-testid={ `${i}-horizontal-top-text` }>
                      { item.alcoholicOrNot }
                    </h3>
                  </div>
                </Link>
                <div className="social-buttons">
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
              </div>
            );
          })
        }

        <div>{ copyLink && <p>Link copied!</p>}</div>
      </section>
    </div>
  );
}
