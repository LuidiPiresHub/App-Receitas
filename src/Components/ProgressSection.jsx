import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { Button, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function ProgressSection({ /* recipeObj, */ type, id }) {
  const [BtnText, setBtnText] = useState('Start Recipe');
  const [showBtn, setShowBtn] = useState(true);
  useEffect(() => {
    const handleType = () => {
      const inProgressRecipes = JSON.parse(
        localStorage.getItem('inProgressRecipes'),
      );

      if (type && showBtn && inProgressRecipes) {
        const isInProgress = Object.keys(inProgressRecipes[type]).some(
          (key) => key === id,
        );
        if (isInProgress) {
          setBtnText('Continue Recipe');
        }
      }
    };
    handleType();
  }, [type]);

  useEffect(() => {
    const handleType = () => {
      if (type) {
        const handleDoneRecipe = () => {
          const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
          if (doneRecipes) {
            setShowBtn(!doneRecipes.some((recipe) => recipe.id === id));
          }
        };
        handleDoneRecipe();
      }
    };
    handleType();
  }, [type]);

  return (
    <div>
      {showBtn && (
        <Link to={ `/${type}/${id}/in-progress` }>
          <Button
            data-testid="start-recipe-btn"
            style={ { position: 'fixed', bottom: 0, width: '100%', borderRadius: 0 } }
          >
            {BtnText}
          </Button>
        </Link>
      )}
    </div>
  );
}

ProgressSection.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  // recipeObj: PropTypes.shape([]).isRequired,
};
