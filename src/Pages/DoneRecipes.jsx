import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../Components/Header';
import shareIcon from '../images/shareIcon.svg';
import { getItemByKey } from '../Services/storageLocal';

const copy = require('clipboard-copy');

export default function DoneRecipes() {
  const [initialDones, setInitialDones] = useState([]);
  const [dones, setDones] = useState([]);
  const [copyLink, setCopyLink] = useState(false);
  const [filter, setFilter] = useState();

  useEffect(() => {
    const getStorage = getItemByKey('doneRecipes');
    if (getStorage.lengh !== 0) {
      setDones(getStorage);
      setInitialDones(getStorage);
      setFilter('All');
    }
  }, []);

  useEffect(() => {
    const updateFilter = () => {
      if (filter === 'All') {
        setDones(initialDones);
      } else {
        const filteredDones = initialDones.filter((item) => item.type === filter);
        setDones(filteredDones);
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

  return (
    <div>
      <Header />
      <section>
        <button
          type="button"
          data-testid="filter-by-meal-btn"
          onClick={ () => setFilter('meal') }
        >
          Meals
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ () => setFilter('drink') }
        >
          Drinks
        </button>
        <button
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ () => setFilter('All') }
        >
          All
        </button>
      </section>
      <section>
        {
          dones.length > 0 && dones.map((item, i) => {
            console.log(item.tags);
            if (item.type === 'meal') {
              return (
                <div key={ i }>
                  <Link to={ `/${item.type}s/${item.id}` }>
                    <img
                      style={ { width: '80px' } }
                      src={ item.image }
                      alt=""
                      data-testid={ `${i}-horizontal-image` }
                    />
                    <h5 data-testid={ `${i}-horizontal-name` }>{ item.name }</h5>
                  </Link>
                  <p data-testid={ `${i}-horizontal-top-text` }>
                    { `'${item.nationality} - ${item.category}'` }
                  </p>
                  <p data-testid={ `${i}-horizontal-done-date` }>
                    { item.doneDate }
                  </p>
                  <button
                    type="button"
                    data-testid={ `${i}-horizontal-share-btn` }
                    src={ shareIcon }
                    onClick={ () => onClickShare(item.type, item.id) }
                  >
                    <img src={ shareIcon } alt="" />
                  </button>
                  <p
                    data-testid={ `${i}-Pasta-horizontal-tag` }
                  >
                    { item.tags[0] }
                  </p>
                  <p
                    data-testid={ `${i}-Curry-horizontal-tag` }
                  >
                    { item.tags[1] }
                  </p>
                </div>
              );
            }
            return (
              <div key={ i }>
                <Link to={ `/${item.type}s/${item.id}` }>
                  <img
                    style={ { width: '80px' } }
                    src={ item.image }
                    alt=""
                    data-testid={ `${i}-horizontal-image` }
                  />
                  <h5 data-testid={ `${i}-horizontal-name` }>{ item.name }</h5>
                  <p data-testid={ `${i}-horizontal-top-text` }>
                    { item.alcoholicOrNot }
                  </p>
                  <p data-testid={ `${i}-horizontal-done-date` }>
                    { item.doneDate }
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
              </div>
            );
          })
        }

        <div>{ copyLink && <p>Link copied!</p>}</div>
      </section>
    </div>
  );
}
