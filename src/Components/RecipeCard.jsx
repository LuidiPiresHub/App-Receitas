import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function RecipeCard({ type, index, recipe, id }) {
  return (
    <Card style={ { width: '40%' } } data-testid={ `${index}-recipe-card` }>
      <Link
        to={ type === 'meals' ? `/meals/${id}` : `/drinks/${id}` }
        style={ { textDecoration: 'none', color: 'inherit' } }
      >
        <Card.Img
          variant="top"
          src={ type === 'meals' ? recipe.strMealThumb : recipe.strDrinkThumb }
          data-testid={ `${index}-card-img` }
        />
        <Card.Body>
          <Card.Title data-testid={ `${index}-card-name` }>
            {type === 'meals' ? recipe.strMeal : recipe.strDrink}
          </Card.Title>
        </Card.Body>
      </Link>
    </Card>
  );
}

RecipeCard.defaultProps = {
  id: '1111',
};

RecipeCard.propTypes = {
  type: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  id: PropTypes.string,
  recipe: PropTypes.shape({
    strMealThumb: PropTypes.string,
    strDrinkThumb: PropTypes.string,
    strMeal: PropTypes.string,
    strDrink: PropTypes.string,
  }).isRequired,
};
