import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, Container } from 'react-bootstrap';
import { faShareAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Header from '../Components/Header';
import shareIcon from '../images/shareIcon.svg';
import { getItemByKey } from '../Services/storageLocal';

const containerStyles = {
  display: 'flex',
  flexWrap: 'wrap',
  margin: '5px',
  gap: '2px',
  justifyContent: 'center',
  marginBottom: '20px',
};

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
        const filteredDones = initialDones.filter(
          (item) => item.type === filter,
        );
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
      <Container style={ containerStyles }>
        <Button
          style={ { backgroundColor: '#d01919' } }
          variant="danger"
          data-testid="filter-by-all-btn"
          onClick={ () => setFilter('All') }
        >
          All
        </Button>
        <Button
          style={ { backgroundColor: '#d01919' } }
          variant="danger"
          data-testid="filter-by-meal-btn"
          onClick={ () => setFilter('meal') }
        >
          Meals
        </Button>
        <Button
          style={ { backgroundColor: '#d01919' } }
          variant="danger"
          data-testid="filter-by-drink-btn"
          onClick={ () => setFilter('drink') }
        >
          Drinks
        </Button>
      </Container>
      <Container style={ containerStyles }>
        {dones.length > 0
          && dones.map((item, i) => {
            if (item.type === 'meal') {
              return (
                <Card
                  style={ { width: '45vw' } }
                  key={ i }
                >
                  <Link
                    to={ `/${item.type}s/${item.id}` }
                    style={ {
                      textDecoration: 'none',
                      color: '#161616',
                    } }
                  >
                    <Card.Img
                      src={ item.image }
                      alt=""
                      data-testid={ `${i}-horizontal-image` }
                    />
                    <Card.Body>
                      <Card.Title data-testid={ `${i}-horizontal-name` }>
                        {item.name}
                      </Card.Title>
                      <Card.Text data-testid={ `${i}-horizontal-top-text` }>
                        {`'${item.nationality} - ${item.category}'`}
                      </Card.Text>
                      <Card.Text data-testid={ `${i}-horizontal-done-date` }>
                        {item.doneDate}
                      </Card.Text>
                      <Card.Text data-testid={ `${i}-Pasta-horizontal-tag` }>
                        {item.tags[0]}
                      </Card.Text>
                      <Card.Text data-testid={ `${i}-Curry-horizontal-tag` }>
                        {item.tags[1]}
                      </Card.Text>
                    </Card.Body>
                  </Link>
                  <Button
                    variant="dark"
                    data-testid={ `${i}-horizontal-share-btn` }
                    src={ shareIcon }
                    onClick={ () => onClickShare(item.type, item.id) }
                  >
                    <FontAwesomeIcon icon={ faShareAlt } src={ shareIcon } alt="" />
                  </Button>
                </Card>
              );
            }
            return (
              <Card
                style={ { width: '45vw' } }
                key={ i }
              >
                <Link
                  to={ `/${item.type}s/${item.id}` }
                  style={ {
                    textDecoration: 'none',
                    color: '#161616',
                  } }
                >
                  <Card.Img
                    src={ item.image }
                    alt=""
                    data-testid={ `${i}-horizontal-image` }
                  />
                  <Card.Body>
                    <Card.Title data-testid={ `${i}-horizontal-name` }>
                      {item.name}
                    </Card.Title>
                    <Card.Text data-testid={ `${i}-horizontal-top-text` }>
                      {item.alcoholicOrNot}
                    </Card.Text>
                    <Card.Text data-testid={ `${i}-horizontal-done-date` }>
                      {item.doneDate}
                    </Card.Text>
                    <Card.Text data-testid={ `${i}-Pasta-horizontal-tag` }>
                      {item.tags[0]}
                    </Card.Text>
                    <Card.Text data-testid={ `${i}-Curry-horizontal-tag` }>
                      {item.tags[1]}
                    </Card.Text>
                  </Card.Body>
                </Link>
                <Button
                  variant="dark"
                  data-testid={ `${i}-horizontal-share-btn` }
                  src={ shareIcon }
                  onClick={ () => onClickShare(item.type, item.id) }
                >
                  <FontAwesomeIcon icon={ faShareAlt } src={ shareIcon } alt="" />
                </Button>
              </Card>
            );
          })}

        <div>{copyLink && <p>Link copied!</p>}</div>
      </Container>
    </div>
  );
}
