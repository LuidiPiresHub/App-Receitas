import React from 'react';
import { useHistory } from 'react-router-dom';
import '../styles/Footer.css';
import { faGlassMartiniAlt } from '@fortawesome/sharp-solid-svg-icons';
import { faUtensils } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';

export default function Footer() {
  const history = useHistory();

  const onClickDrinks = () => {
    history.push('/drinks');
  };

  const onClickMeals = () => {
    history.push('/meals');
  };

  return (
    <section data-testid="footer" className="footer">
      <button
        type="button"
        data-testid="drinks-bottom-btn"
        onClick={ onClickDrinks }
        src={ drinkIcon }
      >
        <FontAwesomeIcon icon={ faGlassMartiniAlt } />
      </button>
      <button
        type="button"
        data-testid="meals-bottom-btn"
        onClick={ onClickMeals }
        src={ mealIcon }
      >
        <FontAwesomeIcon icon={ faUtensils } />
      </button>
    </section>
  );
}
